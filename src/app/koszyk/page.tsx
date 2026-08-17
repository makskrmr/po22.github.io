"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { brand } from "@/lib/config";
import ScreenHeader from "@/components/ScreenHeader";

export default function KoszykPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const totalCents = useCartStore((s) => s.totalCents());

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <ScreenHeader backHref="/sklep" title="Koszyk" />
        <div className="py-16 text-center">
          <h2 className="text-xl font-extrabold text-ink">Twój koszyk jest pusty</h2>
          <p className="mt-3 text-sm text-muted">Zajrzyj do sklepu i dodaj coś na dziś wieczór.</p>
          <Link href="/sklep" className="btn-primary mt-8 inline-flex">
            Przejdź do sklepu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-10">
      <ScreenHeader backHref="/sklep" title="Koszyk" />

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 rounded-2xl bg-surface p-3.5">
            <div className="relative h-16 w-16 flex-shrink-0 rounded-xl bg-deep">
              <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-2" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
              <div className="mt-2 flex items-center gap-3 rounded-full border border-line bg-deep px-1.5 py-1 w-fit">
                <button
                  aria-label="Zmniejsz ilość"
                  onClick={() => setQuantity(item.productId, item.quantity - 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-muted hover:text-ink"
                >
                  −
                </button>
                <span className="w-4 text-center text-xs font-bold text-ink">{item.quantity}</span>
                <button
                  aria-label="Zwiększ ilość"
                  onClick={() => setQuantity(item.productId, item.quantity + 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-muted hover:text-ink"
                >
                  +
                </button>
              </div>
            </div>

            <span className="flex-shrink-0 text-sm font-extrabold text-gold-bright">
              {formatPrice(item.priceCents * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="card mt-8 space-y-2.5 p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Suma częściowa</span>
          <span className="font-semibold text-ink">{formatPrice(totalCents)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Dostawa</span>
          <span className="font-semibold text-ink">{formatPrice(brand.deliveryFeeCents)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-line pt-2.5">
          <span className="font-medium text-muted">Razem</span>
          <span className="text-2xl font-extrabold text-ink">
            {formatPrice(totalCents + brand.deliveryFeeCents)}
          </span>
        </div>
      </div>

      <Link href="/checkout" className="btn-primary mt-6 flex w-full">
        Przejdź do checkoutu
      </Link>
    </div>
  );
}
