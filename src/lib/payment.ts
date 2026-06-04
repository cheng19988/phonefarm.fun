import { PAYMENT } from "./config";
import { prisma } from "./prisma";

export type TronTransaction = {
  txHash: string;
  amount: number;
  to: string;
  confirmed: boolean;
};

/** Placeholder for TronGrid / Tronscan API integration */
export async function verifyTronPayment(
  _address: string,
  _expectedAmount: number,
  _since: Date
): Promise<TronTransaction | null> {
  const apiKey = process.env.TRON_API_KEY;
  if (!apiKey) {
    // No API key configured — do not auto-confirm
    return null;
  }

  // TODO: Integrate TronGrid TRC20 transfer check
  // Example endpoint: https://api.trongrid.io/v1/accounts/{address}/transactions/trc20
  // Match USDT contract TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t
  // Verify amount >= expectedAmount and timestamp >= since
  return null;
}

export async function checkAndUpdatePayment(paymentId: string) {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { order: true },
  });
  if (!payment) return null;

  if (new Date() > payment.expiresAt && payment.paymentStatus === "pending") {
    await prisma.payment.update({
      where: { id: paymentId },
      data: { paymentStatus: "expired", verificationStatus: "expired" },
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

  const tx = await verifyTronPayment(
    payment.paymentAddress,
    payment.expectedAmount,
    payment.createdAt
  );

  if (tx && tx.amount >= payment.expectedAmount) {
    const now = new Date();
    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        paymentStatus: "paid",
        verificationStatus: "verified",
        receivedAmount: tx.amount,
        txHash: tx.txHash,
        paidAt: now,
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

export function createPaymentExpiry() {
  return new Date(Date.now() + PAYMENT.expiryMinutes * 60 * 1000);
}

export function usdToUsdt(usd: number) {
  return Math.max(PAYMENT.minAmount, Math.round(usd * 100) / 100);
}
