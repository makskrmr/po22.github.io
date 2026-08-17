"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { brand } from "@/lib/config";

const links = [
  { href: "/sklep", label: "Sklep" },
  { href: "/jak-to-dziala", label: "Jak to działa?" },
  { href: "/o-nas", label: "O nas" },
  { href: "/regulamin", label: "Regulamin" }
];

export default function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems());
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  // Zustand + persist odczytuje localStorage po stronie klienta — czekamy na
  // montaż, żeby uniknąć niezgodności HTML między serwerem a klientem (hydration).
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-void/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-surface text-ink transition hover:bg-surface2 md:hidden"
            aria-label="Otwórz menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <rect x="3" y="3" width="7.5" height="7.5" rx="1.8" />
              <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.8" />
              <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.8" />
              <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.8" />
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-extrabold tracking-tight text-ink">{brand.name}</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/koszyk"
            aria-label="Przejdź do koszyka"
            className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gold text-void shadow-glow transition hover:bg-gold-bright"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 7H6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9.5" cy="20.5" r="1.4" fill="currentColor" />
              <circle cx="17.5" cy="20.5" r="1.4" fill="currentColor" />
            </svg>
            {mounted && totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-void px-1 text-[11px] font-bold text-gold-bright ring-2 ring-void">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line/70 bg-deep px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-surface hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
