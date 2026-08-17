"use client";

import { Suspense, useState } from "react";
import type React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessKey })
    });
    if (res.ok) {
      router.push(searchParams.get("next") ?? "/admin/kurier");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Błąd logowania.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm items-center px-4 sm:px-6">
      <form onSubmit={handleSubmit} className="card w-full space-y-5 p-7">
        <div>
          <p className="eyebrow mb-2">Panel kuriera</p>
          <h1 className="text-xl font-extrabold text-ink">Zaloguj się</h1>
        </div>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-muted">Klucz dostępu</span>
          <input
            type="password"
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}
            className="w-full rounded-xl border border-line bg-deep px-4 py-3 text-sm text-ink outline-none focus:border-gold"
            required
          />
        </label>
        {error && <p className="text-sm text-danger">{error}</p>}
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? "Logowanie…" : "Zaloguj"}
        </button>
      </form>
    </div>
  );
}
