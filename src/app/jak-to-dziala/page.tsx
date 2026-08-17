import Link from "next/link";
import { activeZone, brand } from "@/lib/config";

const steps = [
  {
    n: "01",
    title: "Wybierasz produkty",
    desc: "Przeglądasz katalog, dodajesz piwo, wódkę, wino lub przekąski do koszyka — bez zakładania konta."
  },
  {
    n: "02",
    title: "Płacisz z góry i udzielasz pełnomocnictwa",
    desc: `Opłacasz całe zamówienie online (BLIK lub karta) i zaznaczasz zgodę na zakup w Twoim imieniu w punkcie koncesjonowanym w miejscowości ${activeZone.purchaseZoneLabel}.`
  },
  {
    n: "03",
    title: "Kurier kupuje towar i dowozi go do Ciebie",
    desc: `Kurier, działając jako Twój pełnomocnik, kupuje wybrane produkty poza strefą objętą lokalną prohibicją i dowozi je pod Twoje drzwi w ${activeZone.customerZoneLabel}. Przy odbiorze okazujesz dowód osobisty.`
  }
];

export default function JakToDzialaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="eyebrow mb-2">Proces</p>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Jak to działa?
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
        {brand.name} to firma kurierska — nie sprzedajemy alkoholu bezpośrednio. Model usługi
        opiera się na pełnomocnictwie udzielanym kurierowi przez klienta. Pełne zasady znajdziesz
        w <Link href="/regulamin" className="text-gold-bright underline">regulaminie</Link>.
      </p>

      <ol className="mt-12 space-y-6">
        {steps.map((s, i) => (
          <li key={s.n} className="card relative flex gap-5 p-6">
            <span className="font-mono text-3xl font-bold text-gold-bright/70">{s.n}</span>
            <div>
              <h2 className="text-lg font-bold text-ink">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <span aria-hidden className="absolute -bottom-3 left-11 h-6 w-px bg-line" />
            )}
          </li>
        ))}
      </ol>

      <div className="card mt-10 space-y-2 p-6">
        <h2 className="text-sm font-bold text-ink">Ważne dla przejrzystości modelu</h2>
        <p className="text-sm leading-relaxed text-muted">
          Towar staje się Twoją własnością w momencie zakupu przez kuriera przy kasie sklepu
          koncesjonowanego — nie dopiero pod Twoimi drzwiami. Bez okazania dowodu osobistego
          kurier odmówi wydania towaru, bez zwrotu kosztu transportu.
        </p>
      </div>

      <Link href="/sklep" className="btn-primary mt-10 inline-flex">
        Zobacz sklep
      </Link>
    </div>
  );
}
