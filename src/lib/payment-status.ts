/** Canonical USDT payment statuses stored in Payment.paymentStatus */
export const PAYMENT_STATUS = {
  pending: "pending",
  paid: "paid",
  underpaid: "underpaid",
  overpaid: "overpaid",
  expired: "expired",
  manual_review: "manual_review",
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  underpaid: "Underpaid",
  overpaid: "Overpaid",
  expired: "Expired",
  manual_review: "Manual review",
};

export const AMOUNT_TOLERANCE_USDT = 0.01;

export function classifyUsdtAmount(received: number, expected: number): "paid" | "underpaid" | "overpaid" {
  if (received + 0.000001 < expected - AMOUNT_TOLERANCE_USDT) return "underpaid";
  if (received > expected + AMOUNT_TOLERANCE_USDT) return "overpaid";
  return "paid";
}

export function isAutoPaymentVerificationEnabled() {
  return Boolean(process.env.TRON_API_KEY?.trim());
}

export function formatUsdtAmount(amount: number) {
  return (Math.round(amount * 100) / 100).toFixed(2);
}
