"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell, FormInput, FormLabel } from "@/components/store";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    if (res.ok) {
      router.push("/account/orders");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Registration failed");
    }
    setLoading(false);
  }

  return (
    <AuthShell title="Create Account" subtitle="Register to place orders and track shipments">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-700 text-sm bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}
        <div>
          <FormLabel>Name</FormLabel>
          <FormInput name="name" autoComplete="name" />
        </div>
        <div>
          <FormLabel required>Email</FormLabel>
          <FormInput name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <FormLabel required>Password</FormLabel>
          <FormInput name="password" type="password" required minLength={8} autoComplete="new-password" />
          <p className="text-xs text-slate-500 mt-1">Minimum 8 characters</p>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full py-3">{loading ? "Creating..." : "Register"}</button>
        <p className="text-center text-sm text-slate-600">
          Have an account? <Link href="/login" className="text-orange-600 hover:text-orange-500 font-medium">Login</Link>
        </p>
      </form>
    </AuthShell>
  );
}
