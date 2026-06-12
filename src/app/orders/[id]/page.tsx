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
  paymentAddress: string;
  paymentNetwork: string;
  paymentCurrency: string;
  paymentStatus: string;
  verificationStatus: string;
  failureReason: string | null;
  expiresAt: string;
  txHash: string | null;
};

type OrderData = {
  id: string;
  orderNumber: string;
  status: string;
  totalUsd: number;
  items: { product: { name: string; slug: string }; quantity: number; unitPrice: number }[];
  payment: PaymentInfo | null;
  error?: string;
};

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Waiting for Payment": "bg-amber-50 text-amber-800 border-amber-200",
    Paid: "bg-green-50 text-green-800 border-green-200",
    Expired: "bg-red-50 text-red-800 border-red-200",
  };
  return (
    <span className={`inline-block text-sm font-medium px-3 py-1 rounded-full border ${styles[status] ?? "bg-zinc-100 text-zinc-700 border-zinc-200"}`}>
      {status}
    </span>
  );
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
    if (!order?.payment || order.status !== "Waiting for Payment") return;
    const interval = setInterval(() => {
      fetch(`/api/payment/verify?paymentId=${order.payment!.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "paid" || data.status === "expired" || data.status === "failed") loadOrder();
        });
      const expires = new Date(order.payment!.expiresAt).getTime() - Date.now();
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
    setTxStatus("Verifying...");
    const res = await fetch("/api/payment/submit-txid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId: order.payment.id, txHash: txInput.trim() }),
    });
    const data = await res.json();
    setTxStatus(data.status ?? data.reason ?? "Submitted — our team will confirm shortly.");
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
            <span className="font-bold text-zinc-900">Total (USD)</span>
            <PriceDisplay amount={order.totalUsd} size="md" />
          </div>
        </div>

        {payment && order.status === "Waiting for Payment" && (
          <div className="card p-6 md:p-8 mb-8 border-orange-200 bg-orange-50/50">
            <h2 className="text-lg font-bold text-zinc-900 mb-2">Step 4 — Pay with USDT (TRC20)</h2>
            <p className="text-base text-zinc-600 mb-5 leading-relaxed">
              Send the exact amount below on <strong className="text-zinc-900">Tron TRC20</strong> within the timer.
              Wrong network or amount delays confirmation. No card/PayPal on this page — email {CONTACT.email} for bank invoice.
            </p>
            <div className="space-y-4 text-base bg-white rounded-xl p-5 md:p-6 border border-zinc-200">
              <div className="flex justify-between gap-4"><span className="text-zinc-500">Amount due</span><span className="text-zinc-900 font-mono font-bold">{payment.expectedAmount} {payment.paymentCurrency}</span></div>
              <div className="flex justify-between gap-4"><span className="text-zinc-500">Network</span><span className="text-zinc-900">{payment.paymentNetwork}</span></div>
              <div>
                <span className="text-zinc-500 block mb-1">Wallet address (copy exactly)</span>
                <code className="block bg-zinc-50 border border-zinc-200 p-4 rounded-lg text-orange-700 text-sm break-all font-mono">{payment.paymentAddress}</code>
              </div>
              <div className="flex justify-between gap-4"><span className="text-zinc-500">Pay within</span><span className="text-amber-700 font-medium">{timeLeft}</span></div>
              <div className="flex justify-between gap-4"><span className="text-zinc-500">Status</span><span className="text-zinc-700">{payment.verificationStatus}</span></div>
              {payment.failureReason && (
                <p className="text-red-800 text-sm bg-red-50 border border-red-200 rounded-lg p-4 leading-relaxed">
                  Payment issue: {payment.failureReason.replace(/_/g, " ")}. Double-check amount, network, and address, then submit your TXID below or contact {CONTACT.email}.
                </p>
              )}
            </div>
            <form onSubmit={submitTxid} className="mt-5 space-y-3">
              <FormLabel>Submit TXID (speeds up confirmation)</FormLabel>
              <div className="flex flex-col sm:flex-row gap-3">
                <FormInput
                  value={txInput}
                  onChange={(e) => setTxInput(e.target.value)}
                  placeholder="Transaction hash (TXID)"
                  className="flex-1 font-mono"
                />
                <button type="submit" className="btn-primary sm:shrink-0 px-8 py-3">Verify TXID</button>
              </div>
              {txStatus && <p className="text-sm text-zinc-600">{txStatus}</p>}
            </form>
          </div>
        )}

        {order.status === "Paid" && (
          <div className="card p-6 mb-6 border-green-200 bg-green-50 text-green-800">
            Payment received. Our team will confirm shipment shortly. Questions: {CONTACT.email}
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
