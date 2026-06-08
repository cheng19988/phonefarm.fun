"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { AuthShell, FormInput, FormLabel } from "@/components/store";

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
      router.push(searchParams.get("redirect") || "/account/orders");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-700 text-sm bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}
      <div>
        <FormLabel required>Email</FormLabel>
        <FormInput name="email" type="email" required autoComplete="email" />
      </div>
      <div>
        <FormLabel required>Password</FormLabel>
        <FormInput name="password" type="password" required autoComplete="current-password" />
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full py-3">{loading ? "Logging in..." : "Login"}</button>
      <p className="text-center text-sm text-slate-600">
        No account? <Link href="/register" className="text-orange-600 hover:text-orange-500 font-medium">Register</Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <AuthShell title="Login" subtitle="Access your orders and checkout">
      <Suspense fallback={<p className="text-slate-500 text-sm">Loading...</p>}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
