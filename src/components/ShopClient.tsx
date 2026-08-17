"use client";

import { useMemo, useState } from "react";
import CategoryTabs from "@/components/CategoryTabs";
import ProductCard, { ProductCardData } from "@/components/ProductCard";

export type ShopProduct = ProductCardData & { category: string };

export default function ShopClient({
  products,
  initialCategory
}: {
  products: ShopProduct[];
  initialCategory: string;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = category === "WSZYSTKIE" ? products : products.filter((p) => p.category === category);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, category, query]);

  return (
    <div>
      <div className="mb-7 flex items-center gap-2.5">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Szukaj marek…"
          className="w-full rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm text-ink placeholder:text-muted/60 outline-none focus:border-gold"
        />
        <span
          aria-hidden
          className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-2xl bg-gold text-void shadow-glow"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.2" />
            <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </span>
      </div>

      <CategoryTabs active={category} onChange={setCategory} />

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted">
          Brak produktów spełniających kryteria. Spróbuj innej kategorii lub frazy.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
