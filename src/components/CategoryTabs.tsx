"use client";

import { categories } from "@/lib/config";
import clsx from "clsx";

export default function CategoryTabs({
  active,
  onChange
}: {
  active: string;
  onChange: (key: string) => void;
}) {
  const all = [{ key: "WSZYSTKIE", label: "Wszystkie" }, ...categories];

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Kategorie produktów">
      {all.map((c) => (
        <button
          key={c.key}
          role="tab"
          aria-selected={active === c.key}
          onClick={() => onChange(c.key)}
          className={clsx(
            "rounded-full border px-4 py-2 text-sm font-medium transition",
            active === c.key
              ? "border-gold bg-gold text-void shadow-glow"
              : "border-line bg-surface text-muted hover:border-gold/50 hover:text-ink"
          )}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
