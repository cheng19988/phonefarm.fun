"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
    });
    if (res.ok) {
      const redirect = searchParams.get("redirect") || "/account/orders";
      router.push(redirect);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <div>
        <label className="block text-sm text-slate-400 mb-1">Email</label>
        <input name="email" type="email" required className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
      </div>
      <div>
        <label className="block text-sm text-slate-400 mb-1">Password</label>
        <input name="password" type="password" required className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Logging in..." : "Login"}</button>
      <p className="text-center text-sm text-slate-400">
        No account? <Link href="/register" className="text-cyan-400">Register</Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="section">
      <div className="container-wide max-w-md">
        <h1 className="section-title text-center">Login</h1>
        <Suspense fallback={<div className="card p-6 text-slate-400">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
