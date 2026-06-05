"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CONTACT } from "@/lib/config";

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

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  const orderId = params.id;
  const [order, setOrder] = useState<OrderData | null>(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [txInput, setTxInput] = useState("");
  const [txStatus, setTxStatus] = useState<string | null>(null);

  async function loadOrder() {
    const res = await fetch(`/api/orders/${orderId}`);
    const data = await res.json();
    if (!res.ok) {
      setOrder({ error: data.error } as OrderData);
      return;
    }
    setOrder(data);
  }

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  useEffect(() => {
    if (!order?.payment || order.status !== "Waiting for Payment") return;
    const interval = setInterval(async () => {
      const res = await fetch(`/api/payment/verify?paymentId=${order.payment!.id}`);
      const data = await res.json();
      if (data.status === "paid" || data.status === "expired" || data.status === "failed") {
        loadOrder();
      }
      const expires = new Date(order.payment!.expiresAt).getTime() - Date.now();
      if (expires <= 0) setTimeLeft("Expired");
      else {
        const mins = Math.floor(expires / 60000);
        const secs = Math.floor((expires % 60000) / 1000);
        setTimeLeft(`${mins}:${secs.toString().padStart(2, "0")}`);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [order, orderId]);

  async function submitTxid(e: React.FormEvent) {
    e.preventDefault();
    if (!order?.payment || !txInput.trim()) return;
    setTxStatus("Checking...");
    const res = await fetch("/api/payment/submit-txid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId: order.payment.id, txHash: txInput.trim() }),
    });
    const data = await res.json();
    setTxStatus(data.status ?? data.reason ?? "Submitted");
    loadOrder();
  }

  if (!order) return <div className="section container-wide text-slate-400">Loading order...</div>;
  if (order.error) {
    return (
      <div className="section container-wide max-w-2xl">
        <p className="text-red-400">{order.error === "Unauthorized" ? "Please log in to view this order." : order.error}</p>
        <Link href="/login" className="btn-primary mt-4 inline-block">Login</Link>
      </div>
    );
  }

  const payment = order.payment;

  return (
    <div className="section">
      <div className="container-wide max-w-2xl">
        <h1 className="section-title">Order {order.orderNumber}</h1>
        <p className="text-slate-400 mb-6">Status: <span className="text-white font-medium">{order.status}</span></p>

        <div className="card p-6 mb-6">
          <h2 className="font-bold text-white mb-4">Order Items</h2>
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm py-2 border-b border-slate-800">
              <span className="text-cyan-400">{item.product.name}</span>
              <span className="text-white">${item.unitPrice} × {item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-white mt-4">
            <span>Total</span>
            <span>${order.totalUsd.toLocaleString()}</span>
          </div>
        </div>

        {payment && order.status === "Waiting for Payment" && (
          <div className="card p-6 mb-6 border-cyan-800/50">
            <h2 className="font-bold text-white mb-4">USDT Payment (Tron TRC20)</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Amount</span><span className="text-white font-mono">{payment.expectedAmount} USDT</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Network</span><span className="text-white">{payment.paymentNetwork}</span></div>
              <div>
                <span className="text-slate-400 block mb-1">Address</span>
                <code className="block bg-slate-800 p-3 rounded text-cyan-400 text-xs break-all">{payment.paymentAddress}</code>
              </div>
              <div className="flex justify-between"><span className="text-slate-400">Expires In</span><span className="text-yellow-400">{timeLeft}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Verification</span><span className="text-slate-300">{payment.verificationStatus}</span></div>
              {payment.failureReason && (
                <p className="text-red-400 text-xs">Issue: {payment.failureReason.replace(/_/g, " ")}</p>
              )}
            </div>
            <form onSubmit={submitTxid} className="mt-4 space-y-2">
              <label className="text-xs text-slate-400">Submit TXID (optional, speeds up verification)</label>
              <div className="flex gap-2">
                <input
                  value={txInput}
                  onChange={(e) => setTxInput(e.target.value)}
                  placeholder="Transaction hash"
                  className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                />
                <button type="submit" className="btn-secondary text-sm">Verify</button>
              </div>
              {txStatus && <p className="text-xs text-slate-400">{txStatus}</p>}
            </form>
            <p className="text-xs text-slate-500 mt-4">
              Send the exact USDT amount via Tron TRC20. We poll the blockchain automatically. Need help? {CONTACT.email}
            </p>
          </div>
        )}

        {order.status === "Paid" && (
          <div className="card p-6 mb-6 border-green-800/50 text-green-400">
            Payment received. Our team will confirm shipment shortly.
          </div>
        )}

        {order.status === "Expired" && (
          <div className="card p-6 mb-6 border-red-800/50 text-red-400">
            Payment window expired. Contact sales to reopen this order.
          </div>
        )}

        <Link href="/account/orders" className="btn-secondary">← My Orders</Link>
      </div>
    </div>
  );
}
