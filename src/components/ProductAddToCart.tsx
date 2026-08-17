"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";

export default function ProductAddToCart({
  productId,
  name,
  priceCents,
  imageUrl,
  volumeLabel,
  inStock
}: {
  productId: string;
  name: string;
  priceCents: number;
  imageUrl: string;
  volumeLabel: string;
  inStock: boolean;
}) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({ productId, name, priceCents, imageUrl, volumeLabel }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex flex-shrink-0 items-center justify-center gap-3 rounded-full border border-line bg-deep px-2.5 py-2">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Zmniejsz ilość"
            className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold text-muted hover:text-ink"
          >
            −
          </button>
          <span className="w-4 text-center text-base font-bold text-ink">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Zwiększ ilość"
            className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold text-muted hover:text-ink"
          >
            +
          </button>
        </div>

        <button onClick={handleAdd} disabled={!inStock} className="btn-primary flex-1">
          {!inStock ? "Niedostępny" : added ? "Dodano ✓" : "Dodaj do koszyka"}
        </button>
      </div>

      {added && (
        <button
          onClick={() => router.push("/koszyk")}
          className="text-sm font-semibold text-gold-bright underline underline-offset-4"
        >
          Przejdź do koszyka
        </button>
      )}
    </div>
  );
}
