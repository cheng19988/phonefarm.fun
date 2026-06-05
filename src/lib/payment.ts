import { PAYMENT } from "./config";
import { prisma } from "./prisma";
import { getPaymentSettings } from "./payment-settings";

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

function matchTransfer(
  tx: Trc20Transfer,
  address: string,
  expectedAmount: number,
  since: Date,
  contract: string
): TronTransaction | null {
  const amount = parseUsdtAmount(tx.value);
  const toMatch = tx.to?.toLowerCase() === address.toLowerCase();
  const timeOk = tx.block_timestamp >= since.getTime() - 60_000;
  if (!toMatch || !timeOk || amount + 0.000001 < expectedAmount - 0.01) return null;
  return {
    txHash: tx.transaction_id,
    amount,
    to: tx.to,
    from: tx.from,
    confirmed: true,
  };
}

export async function verifyTronPayment(
  address: string,
  expectedAmount: number,
  since: Date,
  contract?: string
): Promise<TronTransaction | null> {
  const settings = await getPaymentSettings();
  const usdtContract = contract ?? settings.usdtContract;
  const transfers = await fetchTrc20Transfers(address, since.getTime(), usdtContract);
  for (const tx of transfers) {
    const matched = matchTransfer(tx, address, expectedAmount, since, usdtContract);
    if (matched) return matched;
  }
  return null;
}

export async function verifyTronPaymentByTxHash(
  txHash: string,
  address: string,
  expectedAmount: number,
  since: Date,
  contract?: string
): Promise<{ tx: TronTransaction | null; error?: string }> {
  const settings = await getPaymentSettings();
  const usdtContract = contract ?? settings.usdtContract;

  const used = await prisma.payment.findFirst({
    where: { txHash: txHash, paymentStatus: "paid" },
  });
  if (used) return { tx: null, error: "duplicate_tx" };

  const raw = await fetchTxByHash(txHash);
  if (!raw) return { tx: null, error: "invalid_tx" };

  const matched = matchTransfer(raw, address, expectedAmount, since, usdtContract);
  if (!matched) {
    const amount = parseUsdtAmount(raw.value);
    if (raw.to?.toLowerCase() !== address.toLowerCase()) return { tx: null, error: "wrong_address" };
    if (amount + 0.000001 < expectedAmount - 0.01) return { tx: null, error: "amount_mismatch" };
    return { tx: null, error: "invalid_tx" };
  }
  return { tx: matched };
}

export async function checkAndUpdatePayment(paymentId: string) {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { order: true },
  });
  if (!payment) return null;

  const settings = await getPaymentSettings();
  const now = new Date();

  await prisma.payment.update({
    where: { id: paymentId },
    data: { lastCheckedAt: now },
  });

  if (now > payment.expiresAt && payment.paymentStatus === "pending") {
    await prisma.payment.update({
      where: { id: paymentId },
      data: { paymentStatus: "expired", verificationStatus: "expired", failureReason: "Payment window expired" },
    });
    await prisma.order.update({
      where: { id: payment.orderId },
      data: { status: "Expired" },
    });
    return { status: "expired" as const };
  }

  if (payment.paymentStatus === "paid") {
    return { status: "paid" as const, payment };
  }

  let tx: TronTransaction | null = null;

  if (payment.submittedTxHash) {
    const result = await verifyTronPaymentByTxHash(
      payment.submittedTxHash,
      payment.paymentAddress,
      payment.expectedAmount,
      payment.createdAt,
      settings.usdtContract
    );
    if (result.error && !result.tx) {
      await prisma.payment.update({
        where: { id: paymentId },
        data: { verificationStatus: result.error, failureReason: result.error },
      });
      return { status: "failed" as const, reason: result.error, payment };
    }
    tx = result.tx;
  }

  if (!tx) {
    tx = await verifyTronPayment(
      payment.paymentAddress,
      payment.expectedAmount,
      payment.createdAt,
      settings.usdtContract
    );
  }

  if (tx) {
    const duplicate = await prisma.payment.findFirst({
      where: { txHash: tx.txHash, id: { not: paymentId }, paymentStatus: "paid" },
    });
    if (duplicate) {
      await prisma.payment.update({
        where: { id: paymentId },
        data: { verificationStatus: "duplicate_tx", failureReason: "duplicate_tx" },
      });
      return { status: "failed" as const, reason: "duplicate_tx", payment };
    }

    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        paymentStatus: "paid",
        verificationStatus: "verified",
        receivedAmount: tx.amount,
        txHash: tx.txHash,
        paidAt: now,
        failureReason: null,
      },
    });
    await prisma.order.update({
      where: { id: payment.orderId },
      data: { status: "Paid" },
    });
    return { status: "paid" as const, payment };
  }

  return { status: "pending" as const, payment };
}

export function createPaymentExpiry(minutes?: number) {
  const mins = minutes ?? PAYMENT.expiryMinutes;
  return new Date(Date.now() + mins * 60 * 1000);
}

export function usdToUsdt(usd: number, minAmount?: number) {
  const min = minAmount ?? PAYMENT.minAmount;
  return Math.max(min, Math.round(usd * 100) / 100);
}
