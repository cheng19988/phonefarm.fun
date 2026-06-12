import { PAYMENT } from "./config";
import { prisma } from "./prisma";
import { getPaymentSettings } from "./payment-settings";
import {
  PAYMENT_STATUS,
  classifyUsdtAmount,
  isAutoPaymentVerificationEnabled,
} from "./payment-status";

const USDT_DECIMALS = 1_000_000;

export type TronTransaction = {
  txHash: string;
  amount: number;
  to: string;
  from: string;
  confirmed: boolean;
};

type Trc20Transfer = {
  transaction_id: string;
  from: string;
  to: string;
  value: string;
  block_timestamp: number;
  token_info?: { symbol?: string; address?: string };
};

type EvaluatedTransfer = {
  tx: TronTransaction;
  classification: "paid" | "underpaid" | "overpaid";
};

function parseUsdtAmount(value: string) {
  return Number(value) / USDT_DECIMALS;
}

async function fetchTrc20Transfers(address: string, sinceMs: number, contract: string): Promise<Trc20Transfer[]> {
  const apiKey = process.env.TRON_API_KEY;
  const url = new URL(`https://api.trongrid.io/v1/accounts/${address}/transactions/trc20`);
  url.searchParams.set("only_to", "true");
  url.searchParams.set("limit", "50");
  url.searchParams.set("contract_address", contract);
  url.searchParams.set("min_timestamp", String(sinceMs));

  const res = await fetch(url.toString(), {
    headers: apiKey ? { "TRON-PRO-API-KEY": apiKey } : {},
    next: { revalidate: 0 },
  });
  if (!res.ok) return [];
  const data = (await res.json()) as { data?: Trc20Transfer[] };
  return data.data ?? [];
}

async function fetchTxByHash(txHash: string): Promise<Trc20Transfer | null> {
  const apiKey = process.env.TRON_API_KEY;
  const url = `https://api.trongrid.io/v1/transactions/${txHash}/events`;
  const res = await fetch(url, {
    headers: apiKey ? { "TRON-PRO-API-KEY": apiKey } : {},
    next: { revalidate: 0 },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    data?: Array<{
      transaction_id: string;
      block_timestamp: number;
      result?: { from?: string; to?: string; value?: string };
      contract_address?: string;
    }>;
  };
  const evt = data.data?.find((e) => e.result?.value);
  if (!evt?.result) return null;
  return {
    transaction_id: evt.transaction_id,
    from: evt.result.from ?? "",
    to: evt.result.to ?? "",
    value: evt.result.value ?? "0",
    block_timestamp: evt.block_timestamp,
  };
}

function evaluateTransfer(
  raw: Trc20Transfer,
  address: string,
  expectedAmount: number,
  since: Date
): EvaluatedTransfer | { error: string } {
  const amount = parseUsdtAmount(raw.value);
  const toMatch = raw.to?.toLowerCase() === address.toLowerCase();
  const timeOk = raw.block_timestamp >= since.getTime() - 60_000;

  if (!toMatch) return { error: "wrong_address" };
  if (!timeOk) return { error: "invalid_tx" };

  const tx: TronTransaction = {
    txHash: raw.transaction_id,
    amount,
    to: raw.to,
    from: raw.from,
    confirmed: true,
  };

  return { tx, classification: classifyUsdtAmount(amount, expectedAmount) };
}

export async function verifyTronPayment(
  address: string,
  expectedAmount: number,
  since: Date,
  contract?: string
): Promise<EvaluatedTransfer | null> {
  const settings = await getPaymentSettings();
  const usdtContract = contract ?? settings.usdtContract;
  const transfers = await fetchTrc20Transfers(address, since.getTime(), usdtContract);
  for (const raw of transfers) {
    const result = evaluateTransfer(raw, address, expectedAmount, since);
    if ("error" in result) continue;
    return result;
  }
  return null;
}

export async function verifyTronPaymentByTxHash(
  txHash: string,
  address: string,
  expectedAmount: number,
  since: Date,
  contract?: string
): Promise<{ result: EvaluatedTransfer | null; error?: string }> {
  const used = await prisma.payment.findFirst({
    where: { txHash: txHash, paymentStatus: PAYMENT_STATUS.paid },
  });
  if (used) return { result: null, error: "duplicate_tx" };

  const raw = await fetchTxByHash(txHash);
  if (!raw) return { result: null, error: "invalid_tx" };

  const evaluated = evaluateTransfer(raw, address, expectedAmount, since);
  if ("error" in evaluated) return { result: null, error: evaluated.error };
  return { result: evaluated };
}

async function applyPaymentOutcome(
  paymentId: string,
  orderId: string,
  tx: TronTransaction,
  classification: "paid" | "underpaid" | "overpaid"
) {
  const now = new Date();

  const duplicate = await prisma.payment.findFirst({
    where: { txHash: tx.txHash, id: { not: paymentId }, paymentStatus: PAYMENT_STATUS.paid },
  });
  if (duplicate) {
    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        paymentStatus: PAYMENT_STATUS.manual_review,
        verificationStatus: "duplicate_tx",
        failureReason: "duplicate_tx",
        submittedTxHash: tx.txHash,
        receivedAmount: tx.amount,
      },
    });
    await prisma.order.update({ where: { id: orderId }, data: { status: "Manual Review" } });
    return { status: PAYMENT_STATUS.manual_review, reason: "duplicate_tx" };
  }

  if (classification === "paid") {
    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        paymentStatus: PAYMENT_STATUS.paid,
        verificationStatus: "verified",
        receivedAmount: tx.amount,
        txHash: tx.txHash,
        paidAt: now,
        failureReason: null,
      },
    });
    await prisma.order.update({ where: { id: orderId }, data: { status: "Paid" } });
    return { status: PAYMENT_STATUS.paid };
  }

  const paymentStatus =
    classification === "underpaid" ? PAYMENT_STATUS.underpaid : PAYMENT_STATUS.overpaid;

  await prisma.payment.update({
    where: { id: paymentId },
    data: {
      paymentStatus,
      verificationStatus: classification,
      receivedAmount: tx.amount,
      txHash: tx.txHash,
      failureReason: classification,
    },
  });
  await prisma.order.update({ where: { id: orderId }, data: { status: "Manual Review" } });
  return { status: paymentStatus, reason: classification };
}

export async function checkAndUpdatePayment(paymentId: string) {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { order: true },
  });
  if (!payment) return null;

  const settings = await getPaymentSettings();
  const now = new Date();
  const autoVerify = isAutoPaymentVerificationEnabled();

  await prisma.payment.update({
    where: { id: paymentId },
    data: { lastCheckedAt: now },
  });

  if (now > payment.expiresAt && payment.paymentStatus === PAYMENT_STATUS.pending) {
    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        paymentStatus: PAYMENT_STATUS.expired,
        verificationStatus: "expired",
        failureReason: "Payment window expired",
      },
    });
    await prisma.order.update({
      where: { id: payment.orderId },
      data: { status: "Expired" },
    });
    return { status: PAYMENT_STATUS.expired };
  }

  if (payment.paymentStatus === PAYMENT_STATUS.paid) {
    return { status: PAYMENT_STATUS.paid, payment };
  }

  if (
    payment.paymentStatus === PAYMENT_STATUS.underpaid ||
    payment.paymentStatus === PAYMENT_STATUS.overpaid ||
    payment.paymentStatus === PAYMENT_STATUS.manual_review ||
    payment.paymentStatus === PAYMENT_STATUS.expired
  ) {
    return { status: payment.paymentStatus, payment };
  }

  if (!autoVerify) {
    if (payment.submittedTxHash && payment.paymentStatus === PAYMENT_STATUS.pending) {
      await prisma.payment.update({
        where: { id: paymentId },
        data: {
          paymentStatus: PAYMENT_STATUS.manual_review,
          verificationStatus: "awaiting_manual",
          failureReason: null,
        },
      });
      await prisma.order.update({
        where: { id: payment.orderId },
        data: { status: "Manual Review" },
      });
      return { status: PAYMENT_STATUS.manual_review, payment };
    }
    return { status: PAYMENT_STATUS.pending, payment, manualConfirmation: true };
  }

  let evaluated: EvaluatedTransfer | null = null;

  if (payment.submittedTxHash) {
    const byHash = await verifyTronPaymentByTxHash(
      payment.submittedTxHash,
      payment.paymentAddress,
      payment.expectedAmount,
      payment.createdAt,
      settings.usdtContract
    );
    if (byHash.error && !byHash.result) {
      if (byHash.error === "duplicate_tx") {
        await prisma.payment.update({
          where: { id: paymentId },
          data: {
            paymentStatus: PAYMENT_STATUS.manual_review,
            verificationStatus: "duplicate_tx",
            failureReason: "duplicate_tx",
          },
        });
        await prisma.order.update({ where: { id: payment.orderId }, data: { status: "Manual Review" } });
        return { status: PAYMENT_STATUS.manual_review, reason: "duplicate_tx", payment };
      }
      await prisma.payment.update({
        where: { id: paymentId },
        data: { verificationStatus: byHash.error, failureReason: byHash.error },
      });
      return { status: "failed" as const, reason: byHash.error, payment };
    }
    evaluated = byHash.result;
  }

  if (!evaluated) {
    evaluated = await verifyTronPayment(
      payment.paymentAddress,
      payment.expectedAmount,
      payment.createdAt,
      settings.usdtContract
    );
  }

  if (evaluated) {
    const outcome = await applyPaymentOutcome(
      paymentId,
      payment.orderId,
      evaluated.tx,
      evaluated.classification
    );
    return { ...outcome, payment };
  }

  return { status: PAYMENT_STATUS.pending, payment };
}

export function createPaymentExpiry(minutes?: number) {
  const mins = minutes ?? PAYMENT.expiryMinutes;
  return new Date(Date.now() + mins * 60 * 1000);
}

/** USD list price → USDT due (1:1 rounded, floored at configured minimum). */
export function usdToUsdt(usd: number, minAmount?: number) {
  const min = minAmount ?? PAYMENT.minAmount;
  return Math.max(min, Math.round(usd * 100) / 100);
}

export function usdtMatchesOrderTotal(totalUsd: number, expectedUsdt: number, minAmount?: number) {
  return usdToUsdt(totalUsd, minAmount) === expectedUsdt;
}

export { isAutoPaymentVerificationEnabled, formatUsdtAmount } from "./payment-status";
