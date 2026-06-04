"use client";

import { useState } from "react";

export function DeploymentKitForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    form.set("productInterest", "Deployment Kit Guide");
    form.set("message", "Requesting free phone farm deployment kit guide");
    const res = await fetch("/api/contact", { method: "POST", body: form });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <section className="card p-8 md:p-10">
      <h2 className="text-2xl font-bold text-white mb-2">Ready to Deploy Faster?</h2>
      <p className="text-slate-400 mb-6">
        Get our free deployment guide — sizing your phone farm box, planning power and cooling, and setting up a compliant multi-device workflow.
      </p>
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <input name="name" required placeholder="Name" className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        <input name="email" type="email" required placeholder="Email" className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        <textarea name="message" placeholder="Message (optional)" rows={2} className="sm:col-span-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        <button type="submit" disabled={status === "loading"} className="btn-primary sm:col-span-2">
          {status === "loading" ? "Sending..." : "Get the Guide"}
        </button>
      </form>
      {status === "success" && <p className="text-green-400 text-sm mt-3">Thank you! We will send the guide within 24 hours.</p>}
      {status === "error" && <p className="text-red-400 text-sm mt-3">Failed to submit. Please contact us via WhatsApp.</p>}
    </section>
  );
}
