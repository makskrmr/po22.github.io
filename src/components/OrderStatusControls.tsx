"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const flow: { status: string; label: string }[] = [
  { status: "PRZYJETE", label: "Przyjmij zamówienie" },
  { status: "W_ZAKUPACH", label: "Rozpocząłem zakupy" },
  { status: "W_DRODZE", label: "Jadę do klienta" },
  { status: "DOSTARCZONE", label: "Dostarczone (ID zweryfikowane)" }
];

export default function OrderStatusControls({
  orderId,
  currentStatus
}: {
  orderId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const currentIndex = flow.findIndex((f) => f.status === currentStatus);

  async function updateStatus(status: string) {
    setLoading(true);
    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    router.refresh();
    setLoading(false);
  }

  async function cancelOrder() {
    if (!confirm("Na pewno anulować to zamówienie?")) return;
    setLoading(true);
    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "ANULOWANE" })
    });
    router.refresh();
    setLoading(false);
  }

  if (currentStatus === "DOSTARCZONE" || currentStatus === "ANULOWANE") {
    return null;
  }

  const next = flow[currentIndex + 1] ?? flow[0];

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button onClick={() => updateStatus(next.status)} disabled={loading} className="btn-primary flex-1">
        {loading ? "Zapisywanie…" : next.label}
      </button>
      <button onClick={cancelOrder} disabled={loading} className="btn-secondary">
        Anuluj
      </button>
    </div>
  );
}
