import Link from "next/link";
import { brand, activeZone } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line/70 bg-deep/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <span className="text-lg font-extrabold tracking-tight text-ink">{brand.name}</span>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Firma kurierska działająca w godzinach nocnych na terenie {activeZone.customerZoneLabel}.
              Nie sprzedajemy alkoholu — świadczymy usługę transportu i pośrednictwa w zakupie na
              podstawie pełnomocnictwa.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">Informacje</p>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/jak-to-dziala" className="hover:text-ink">Jak to działa?</Link>
              </li>
              <li>
                <Link href="/o-nas" className="hover:text-ink">O nas</Link>
              </li>
              <li>
                <Link href="/regulamin" className="hover:text-ink">Regulamin</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">Kontakt</p>
            <p className="text-sm text-muted">{brand.supportPhone}</p>
            <p className="mt-4 text-xs leading-relaxed text-muted/70">
              Serwis przeznaczony wyłącznie dla osób pełnoletnich. Sprzedaż i podawanie
              napojów alkoholowych osobom do lat 18 jest zabronione.
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 text-xs text-muted/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.name}. Wszelkie prawa zastrzeżone.</p>
          <p>Wykonanie: {brand.developerCredit}</p>
        </div>
      </div>
    </footer>
  );
}
