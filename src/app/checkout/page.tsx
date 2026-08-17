"use client";

import { useMemo, useState } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { activeZone, brand } from "@/lib/config";
import StripePaymentForm from "@/components/StripePaymentForm";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

type CheckoutResponse = {
  orderId: string;
  amountCents: number;
  clientSecret: string | null;
  devMode: boolean;
  error?: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totalCents = useCartStore((s) => s.totalCents());
  const grandTotal = totalCents + brand.deliveryFeeCents;
  const clear = useCartStore((s) => s.clear);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    deliveryAddress: "",
    deliveryCity: "",
    notes: ""
  });
  const [paymentMethod, setPaymentMethod] = useState<"card" | "blik">("blik");
  const [wiekPotwierdzony, setWiekPotwierdzony] = useState(false);
  const [pelnomocnictwo, setPelnomocnictwo] = useState(false);
  const [regulamin, setRegulamin] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckoutResponse | null>(null);

  const canSubmit =
    form.customerName && form.phone && form.deliveryAddress && form.deliveryCity &&
    wiekPotwierdzony && pelnomocnictwo && regulamin && items.length > 0 && !submitting;

  const stripeOptions = useMemo(
    () => (result?.clientSecret ? { clientSecret: result.clientSecret, appearance: stripeAppearance } : undefined),
    [result?.clientSecret]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          paymentMethod,
          wiekPotwierdzony,
          pelnomocnictwoZaakceptowane: pelnomocnictwo,
          regulaminZaakceptowany: regulamin,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity }))
        })
      });
      const data: CheckoutResponse = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Coś poszło nie tak. Spróbuj ponownie.");
        setSubmitting(false);
        return;
      }
      setResult(data);
    } catch {
      setError("Brak połączenia z serwerem. Spróbuj ponownie.");
    } finally {
      setSubmitting(false);
    }
  }

  async function confirmDevPayment() {
    if (!result) return;
    setSubmitting(true);
    await fetch(`/api/orders/${result.orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentStatus: "OPLACONE" })
    });
    clear();
    router.push(`/checkout/sukces?order=${result.orderId}`);
  }

  if (items.length === 0 && !result) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-extrabold text-ink">Koszyk jest pusty</h1>
        <Link href="/sklep" className="btn-primary mt-8 inline-flex">
          Wróć do sklepu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-ink">Podsumowanie zamówienia</h1>

      {!result ? (
        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <fieldset className="card space-y-4 p-5">
            <legend className="eyebrow px-1">Dane dostawy</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Imię i nazwisko" value={form.customerName}
                onChange={(v) => setForm((f) => ({ ...f, customerName: v }))} required />
              <Field label="Telefon" value={form.phone} type="tel"
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))} required />
            </div>
            <Field label="Adres dostawy (ulica, numer, mieszkanie)" value={form.deliveryAddress}
              onChange={(v) => setForm((f) => ({ ...f, deliveryAddress: v }))} required />
            <Field label={`Miasto / dzielnica (strefa objęta prohibicją, np. ${activeZone.customerZoneLabel})`}
              value={form.deliveryCity} onChange={(v) => setForm((f) => ({ ...f, deliveryCity: v }))} required />
            <Field label="Uwagi dla kuriera (opcjonalnie)" value={form.notes}
              onChange={(v) => setForm((f) => ({ ...f, notes: v }))} textarea />
          </fieldset>

          <fieldset className="card space-y-3 p-5">
            <legend className="eyebrow px-1">Metoda płatności — 100% z góry, online</legend>
            <div className="grid grid-cols-2 gap-3">
              <PaymentOption
                label="BLIK" active={paymentMethod === "blik"} onClick={() => setPaymentMethod("blik")}
              />
              <PaymentOption
                label="Karta płatnicza" active={paymentMethod === "card"} onClick={() => setPaymentMethod("card")}
              />
            </div>
            <p className="text-xs text-muted">
              Nie oferujemy płatności gotówką przy odbiorze — to element modelu prawnego usługi.
            </p>
          </fieldset>

          <fieldset className="card space-y-4 p-5">
            <legend className="eyebrow px-1">Wymagane zgody</legend>

            <Checkbox checked={wiekPotwierdzony} onChange={setWiekPotwierdzony}>
              Potwierdzam, że mam ukończone 18 lat i przy odbiorze okażę kurierowi dowód osobisty.
            </Checkbox>

            <Checkbox checked={pelnomocnictwo} onChange={setPelnomocnictwo}>
              Udzielam pełnomocnictwa kurierowi na zakup wybranych produktów w moim imieniu
              w punkcie koncesjonowanym w miejscowości {activeZone.purchaseZoneLabel} oraz opłacam
              usługę transportu.
            </Checkbox>

            <Checkbox checked={regulamin} onChange={setRegulamin}>
              Zapoznałem/-am się i akceptuję{" "}
              <Link href="/regulamin" target="_blank" className="text-gold-bright underline">
                regulamin usługi
              </Link>
              , w tym zasady dotyczące pełnomocnictwa i momentu przejścia własności towaru.
            </Checkbox>
          </fieldset>

          <div className="card space-y-2.5 p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Suma częściowa</span>
              <span className="font-semibold text-ink">{formatPrice(totalCents)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Dostawa</span>
              <span className="font-semibold text-ink">{formatPrice(brand.deliveryFeeCents)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-line pt-2.5">
              <span className="font-medium text-muted">Do zapłaty</span>
              <span className="text-2xl font-extrabold text-ink">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          {error && <p className="text-sm text-danger">{error}</p>}

          <button type="submit" disabled={!canSubmit} className="btn-primary w-full">
            {submitting ? "Przetwarzanie…" : `Zamawiam i płacę ${formatPrice(grandTotal)}`}
          </button>
        </form>
      ) : (
        <div className="card mt-8 space-y-5 p-6">
          <p className="text-sm text-muted">
            Zamówienie utworzone. Dokończ płatność, aby przekazać je do realizacji.
          </p>

          {result.devMode ? (
            <div className="space-y-4 rounded-xl border border-ember/40 bg-ember/10 p-4">
              <p className="text-sm text-ember-bright">
                Tryb deweloperski: brak skonfigurowanego Stripe. Ten przycisk symuluje udaną płatność
                {" "}({formatPrice(result.amountCents)}) — do testów lokalnych, nie do produkcji.
              </p>
              <button onClick={confirmDevPayment} disabled={submitting} className="btn-primary w-full">
                Symuluj udaną płatność
              </button>
            </div>
          ) : result.clientSecret && stripePromise ? (
            <Elements stripe={stripePromise} options={stripeOptions}>
              <StripePaymentForm orderId={result.orderId} />
            </Elements>
          ) : (
            <p className="text-sm text-danger">Nie udało się zainicjować płatności.</p>
          )}
        </div>
      )}

      <p className="mt-6 text-xs leading-relaxed text-muted/70">
        {brand.name} świadczy usługi kurierskie. Nie jest sprzedawcą napojów alkoholowych —
        szczegóły modelu prawnego znajdziesz w{" "}
        <Link href="/regulamin" className="underline">regulaminie</Link>.
      </p>
    </div>
  );
}

const stripeAppearance = {
  theme: "night" as const,
  variables: {
    colorPrimary: "#9B5DE5",
    colorBackground: "#161228",
    colorText: "#EDE9FE",
    borderRadius: "12px"
  }
};

function Field({
  label, value, onChange, type = "text", required = false, textarea = false
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean; textarea?: boolean;
}) {
  const inputClass =
    "w-full rounded-xl border border-line bg-deep px-4 py-3 text-sm text-ink placeholder:text-muted/50 focus:border-gold outline-none";
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-muted">{label}</span>
      {textarea ? (
        <textarea rows={2} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
      ) : (
        <input
          type={type} value={value} required={required}
          onChange={(e) => onChange(e.target.value)} className={inputClass}
        />
      )}
    </label>
  );
}

function PaymentOption({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button" onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
        active ? "border-gold bg-gold/15 text-ink" : "border-line bg-deep text-muted hover:border-gold/50"
      }`}
    >
      {label}
    </button>
  );
}

function Checkbox({
  checked, onChange, children
}: {
  checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
      <input
        type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-line bg-deep accent-gold"
        required
      />
      <span>{children}</span>
    </label>
  );
}
