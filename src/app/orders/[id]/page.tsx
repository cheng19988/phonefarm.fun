"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CONTACT } from "@/lib/config";
import { CheckoutSteps } from "@/components/checkout-flow";
import { FormInput, FormLabel, LoadingBlock, PriceDisplay } from "@/components/store";

type PaymentInfo = {
  id: string;
  expectedAmount: number;
  receivedAmount: number | null;
  paymentAddress: string;
  paymentNetwork: string;
  paymentCurrency: string;
  paymentStatus: string;
  verificationStatus: string;
  failureReason: string | null;
  expiresAt: string;
  txHash: string | null;
  submittedTxHash: string | null;
};

type PaymentMeta = {
  autoVerifyEnabled: boolean;
  expectedUsdt: string;
  totalUsd: string;
  amountsAligned: boolean;
  minUsdt: number;
};

type OrderData = {
  id: string;
  orderNumber: string;
  status: string;
  totalUsd: number;
  items: { product: { name: string; slug: string }; quantity: number; unitPrice: number }[];
  payment: PaymentInfo | null;
  paymentMeta?: PaymentMeta;
  error?: string;
};

const TERMINAL_PAYMENT_STATUSES = new Set([
  "paid",
  "underpaid",
  "overpaid",
  "expired",
  "manual_review",
]);

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Waiting for Payment": "bg-amber-50 text-amber-800 border-amber-200",
    Paid: "bg-green-50 text-green-800 border-green-200",
    Expired: "bg-red-50 text-red-800 border-red-200",
    "Manual Review": "bg-violet-50 text-violet-800 border-violet-200",
  };
  return (
    <span className={`inline-block text-sm font-medium px-3 py-1 rounded-full border ${styles[status] ?? "bg-zinc-100 text-zinc-700 border-zinc-200"}`}>
      {status}
    </span>
  );
}

function PaymentStatusLine({ payment }: { payment: PaymentInfo }) {
  const labels: Record<string, string> = {
    pending: "Pending — awaiting USDT transfer",
    paid: "Paid — verified on-chain",
    underpaid: "Underpaid — received less than order amount",
    overpaid: "Overpaid — received more than order amount",
    expired: "Expired — payment window closed",
    manual_review: "Manual review — team confirming payment",
  };
  return <span className="text-zinc-700">{labels[payment.paymentStatus] ?? payment.paymentStatus}</span>;
}

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  const orderId = params.id;
  const [order, setOrder] = useState<OrderData | null>(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [txInput, setTxInput] = useState("");
  const [txStatus, setTxStatus] = useState<string | null>(null);

  const loadOrder = useCallback(() => {
    fetch(`/api/orders/${orderId}`)
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) setOrder({ error: data.error } as OrderData);
        else setOrder(data);
      });
  }, [orderId]);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/orders/${orderId}`)
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (cancelled) return;
        if (!ok) setOrder({ error: data.error } as OrderData);
        else setOrder(data);
      });
    return () => { cancelled = true; };
  }, [orderId]);

  useEffect(() => {
    if (!order?.payment) return;
    const payment = order.payment;
    const awaiting = payment.paymentStatus === "pending" && order.status === "Waiting for Payment";
    if (!awaiting && !TERMINAL_PAYMENT_STATUSES.has(payment.paymentStatus)) return;

    const interval = setInterval(() => {
      if (payment.paymentStatus === "pending") {
        fetch(`/api/payment/verify?paymentId=${payment.id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.status !== "pending") loadOrder();
          });
      }
      const expires = new Date(payment.expiresAt).getTime() - Date.now();
      if (expires <= 0) setTimeLeft("Expired");
      else {
        const mins = Math.floor(expires / 60000);
        const secs = Math.floor((expires % 60000) / 1000);
        setTimeLeft(`${mins}:${secs.toString().padStart(2, "0")}`);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [order, loadOrder]);

  async function submitTxid(e: React.FormEvent) {
    e.preventDefault();
    if (!order?.payment || !txInput.trim()) return;
    setTxStatus("Checking transaction...");
    const res = await fetch("/api/payment/submit-txid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId: order.payment.id, txHash: txInput.trim() }),
    });
    const data = await res.json();
    const messages: Record<string, string> = {
      paid: "Payment verified on-chain.",
      underpaid: "Transfer received but amount is lower than order total — manual review.",
      overpaid: "Transfer received but amount is higher than order total — manual review.",
      manual_review: "TXID submitted — manual confirmation by our team.",
      expired: "Payment window expired.",
      failed: data.reason ? `Could not verify: ${String(data.reason).replace(/_/g, " ")}` : "Verification failed.",
      pending: "Still waiting for matching transfer.",
    };
    setTxStatus(messages[data.status] ?? data.reason ?? "Submitted.");
    loadOrder();
  }

  if (!order) return <LoadingBlock label="Loading order..." />;
  if (order.error) {
    return (
      <div className="section container-wide max-w-2xl">
        <div className="card p-8 text-center">
          <p className="text-red-700 mb-4">{order.error === "Unauthorized" ? "Please log in to view this order." : order.error}</p>
          <Link href="/login" className="btn-primary inline-flex">Login</Link>
        </div>
      </div>
    );
  }

  const payment = order.payment;
  const meta = order.paymentMeta;
  const autoVerify = meta?.autoVerifyEnabled ?? true;
  const usdtDue = meta?.expectedUsdt ?? payment?.expectedAmount.toFixed(2);
  const usdTotal = meta?.totalUsd ?? order.totalUsd.toFixed(2);

  return (
    <div className="section">
      <div className="container-wide max-w-3xl">
        <CheckoutSteps active={4} />
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900">Order {order.orderNumber}</h1>
          <StatusBadge status={order.status} />
        </div>

        <div className="card p-6 md:p-8 mb-8">
          <h2 className="text-lg font-bold text-zinc-900 mb-5">Order items</h2>
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm py-3 border-b border-zinc-100 last:border-0 gap-4">
              <span className="text-zinc-700">{item.product.name}</span>
              <span className="text-zinc-900 font-medium shrink-0">${item.unitPrice} × {item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-200">
            <span className="font-bold text-zinc-900">Order total (USD)</span>
            <PriceDisplay amount={order.totalUsd} size="md" />
          </div>
        </div>

        {payment && payment.paymentStatus === "pending" && order.status === "Waiting for Payment" && (
          <div className="card p-6 md:p-8 mb-8 border-orange-200 bg-orange-50/50">
            <h2 className="text-lg font-bold text-zinc-900 mb-2">Step 4 — Pay with USDT (TRC20)</h2>

            {!autoVerify ? (
              <p className="text-sm font-medium text-violet-900 bg-violet-50 border border-violet-200 rounded-lg px-4 py-3 mb-4 leading-relaxed">
                <strong>Manual confirmation:</strong> On-chain auto-check is not enabled on this server. After you send USDT, submit your TXID below — our team will manually confirm payment and update order status.
              </p>
            ) : (
              <p className="text-sm text-zinc-700 bg-white border border-zinc-200 rounded-lg px-4 py-3 mb-4 leading-relaxed">
                <strong>Automatic verification:</strong> This page polls Tron TRC20 transfers to our wallet. Submitting your TXID speeds up matching. Wrong network, address, or amount may require manual review.
              </p>
            )}

            <p className="text-base text-zinc-600 mb-5 leading-relaxed">
              Send the exact USDT amount below on <strong className="text-zinc-900">Tron TRC20</strong> within the timer.
              Order reference: <strong className="text-zinc-900">{order.orderNumber}</strong>.
            </p>

            <div className="space-y-4 text-base bg-white rounded-xl p-5 md:p-6 border border-zinc-200">
              <div className="flex justify-between gap-4">
                <span className="text-zinc-500">Order total (USD)</span>
                <span className="text-zinc-900 font-mono font-semibold">${usdTotal}</span>
              </div>
              <div className="flex justify-between gap-4 border-t border-zinc-100 pt-3">
                <span className="text-zinc-500">USDT amount due (TRC20)</span>
                <span className="text-zinc-900 font-mono font-bold text-lg">{usdtDue} USDT</span>
              </div>
              {meta && !meta.amountsAligned && (
                <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3">
                  USDT due includes the {meta.minUsdt} USDT minimum checkout amount (order USD is below minimum).
                </p>
              )}
              {meta?.amountsAligned && (
                <p className="text-xs text-green-800 bg-green-50 border border-green-200 rounded-lg p-3">
                  USD order total and USDT due match 1:1 (±{0.01} USDT tolerance on verification).
                </p>
              )}
              <div className="flex justify-between gap-4"><span className="text-zinc-500">Network</span><span className="text-zinc-900">{payment.paymentNetwork}</span></div>
              <div>
                <span className="text-zinc-500 block mb-1">Wallet address (copy exactly)</span>
                <code className="block bg-zinc-50 border border-zinc-200 p-4 rounded-lg text-orange-700 text-sm break-all font-mono">{payment.paymentAddress}</code>
              </div>
              <div className="flex justify-between gap-4"><span className="text-zinc-500">Pay within</span><span className="text-amber-700 font-medium">{timeLeft}</span></div>
              <div className="flex justify-between gap-4"><span className="text-zinc-500">Payment status</span><PaymentStatusLine payment={payment} /></div>
              {payment.failureReason && (
                <p className="text-red-800 text-sm bg-red-50 border border-red-200 rounded-lg p-4 leading-relaxed">
                  Issue: {payment.failureReason.replace(/_/g, " ")}. Double-check amount, network, and address, then submit TXID or contact {CONTACT.email}.
                </p>
              )}
            </div>
            <form onSubmit={submitTxid} className="mt-5 space-y-3">
              <FormLabel>Transaction hash (TXID)</FormLabel>
              <div className="flex flex-col sm:flex-row gap-3">
                <FormInput
                  value={txInput}
                  onChange={(e) => setTxInput(e.target.value)}
                  placeholder="Paste TRC20 transaction hash"
                  className="flex-1 font-mono"
                />
                <button type="submit" className="btn-primary sm:shrink-0 px-8 py-3">Submit TXID</button>
              </div>
              {txStatus && <p className="text-sm text-zinc-600">{txStatus}</p>}
            </form>
          </div>
        )}

        {payment && payment.paymentStatus === "manual_review" && (
          <div className="card p-6 mb-6 border-violet-200 bg-violet-50 text-violet-900">
            <p className="font-semibold mb-2">Manual confirmation in progress</p>
            <p className="text-sm leading-relaxed">
              Your payment is queued for manual review{payment.submittedTxHash ? ` (TXID ${payment.submittedTxHash.slice(0, 16)}…)` : ""}.
              Our team will confirm within business hours. Questions: {CONTACT.email}
            </p>
          </div>
        )}

        {payment && (payment.paymentStatus === "underpaid" || payment.paymentStatus === "overpaid") && (
          <div className="card p-6 mb-6 border-amber-200 bg-amber-50 text-amber-900">
            <p className="font-semibold mb-2">
              {payment.paymentStatus === "underpaid" ? "Underpaid transfer detected" : "Overpaid transfer detected"}
            </p>
            <p className="text-sm leading-relaxed">
              Expected {usdtDue} USDT; received {payment.receivedAmount?.toFixed(2) ?? "—"} USDT
              {payment.txHash ? ` (TX ${payment.txHash.slice(0, 16)}…)` : ""}. Order is under manual review — contact {CONTACT.email}.
            </p>
          </div>
        )}

        {order.status === "Paid" && (
          <div className="card p-6 mb-6 border-green-200 bg-green-50 text-green-800">
            Payment received{payment?.txHash ? ` (TX ${payment.txHash.slice(0, 16)}…)` : ""}.
            Our team will confirm shipment shortly. Questions: {CONTACT.email}
          </div>
        )}

        {order.status === "Expired" && (
          <div className="card p-6 mb-6 border-red-200 bg-red-50 text-red-800">
            Payment window expired. Contact {CONTACT.email} to reopen this order.
          </div>
        )}

        <Link href="/account/orders" className="btn-outline">← My Orders</Link>
      </div>
    </div>
  );
}
