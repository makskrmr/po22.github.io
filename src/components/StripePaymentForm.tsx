"use client";

import { useState } from "react";
import type React from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

export default function StripePaymentForm({ orderId }: { orderId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/sukces?order=${orderId}`
      }
    });

    if (confirmError) {
      setError(confirmError.message ?? "Płatność nie powiodła się. Spróbuj ponownie.");
      setSubmitting(false);
    }
    // Przy sukcesie Stripe wykona przekierowanie na return_url samodzielnie.
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement />
      {error && <p className="text-sm text-danger">{error}</p>}
      <button type="submit" disabled={!stripe || submitting} className="btn-primary w-full">
        {submitting ? "Przetwarzanie…" : "Zapłać teraz"}
      </button>
    </form>
  );
}
