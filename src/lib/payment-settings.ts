import { prisma } from "./prisma";
import { PAYMENT } from "./config";

export type PaymentConfig = {
  trc20Address: string;
  usdtContract: string;
  minAmount: number;
  expiryMinutes: number;
};

export async function getPaymentSettings(): Promise<PaymentConfig> {
  try {
    const row = await prisma.paymentSettings.findUnique({ where: { id: "default" } });
    if (row) {
      return {
        trc20Address: row.trc20Address,
        usdtContract: row.usdtContract,
        minAmount: row.minAmount,
        expiryMinutes: row.expiryMinutes,
      };
    }
  } catch {
    // DB unavailable during build
  }
  return {
    trc20Address: PAYMENT.address,
    usdtContract: PAYMENT.contract,
    minAmount: PAYMENT.minAmount,
    expiryMinutes: PAYMENT.expiryMinutes,
  };
}

export async function ensurePaymentSettings() {
  const existing = await prisma.paymentSettings.findUnique({ where: { id: "default" } });
  if (existing) return existing;
  return prisma.paymentSettings.create({
    data: {
      id: "default",
      trc20Address: PAYMENT.address,
      usdtContract: PAYMENT.contract,
      minAmount: PAYMENT.minAmount,
      expiryMinutes: PAYMENT.expiryMinutes,
    },
  });
}
