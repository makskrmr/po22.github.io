import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CategoryIconGrid from "@/components/CategoryIconGrid";
import { getAllProducts, getFeaturedProducts, groupByBrand } from "@/lib/get-products";
import { brand, activeZone } from "@/lib/config";
import { formatPrice } from "@/lib/format";

export default async function HomePage() {
  const [featured, all] = await Promise.all([getFeaturedProducts(), getAllProducts()]);
  const brandGroups = groupByBrand(all).slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line/60 bg-grid-fade">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 h-72 w-72 animate-floatSlow rounded-full bg-ember/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 bottom-0 h-80 w-80 rounded-full bg-gold/25 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-2 w-2 rounded-full bg-gold" />
                <span className="absolute h-2 w-2 animate-pulseRing rounded-full bg-gold" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-bright">
                Otwarte teraz
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
              {activeZone.customerZoneLabel}
            </div>
          </div>

          <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Nocna dostawa w {brand.deliveryPromiseMinutes} minut.
            <br />
            <span className="text-gold-bright">Ty zamawiasz, my jedziemy.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Piwo, wódka, wino i przekąski — zamów bez zakładania konta i miej to pod drzwiami,
            zanim impreza się skończy. Płatność online z góry, odbiór za okazaniem dowodu osobistego.
            Obecnie dostarczamy wyłącznie na terenie {activeZone.customerZoneLabel}.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/sklep" className="btn-primary">
              Zamów teraz
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/jak-to-dziala" className="btn-secondary">
              Jak to działa?
            </Link>
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-line/60 pt-8">
            <div>
              <dt className="eyebrow">Dostawa</dt>
              <dd className="mt-1 text-2xl font-extrabold text-ink">~{brand.deliveryPromiseMinutes} min</dd>
            </div>
            <div>
              <dt className="eyebrow">Płatność</dt>
              <dd className="mt-1 text-2xl font-extrabold text-ink">100% online</dd>
            </div>
            <div>
              <dt className="eyebrow">Zasięg</dt>
              <dd className="mt-1 text-2xl font-extrabold text-ink">{activeZone.customerZoneLabel}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* KATEGORIE */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="eyebrow mb-5">Przeglądaj</p>
        <CategoryIconGrid />
      </section>

      {/* POPULARNE MARKI */}
      {brandGroups.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
          <p className="eyebrow mb-2">Sprawdzone</p>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Popularne marki</h2>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {brandGroups.map(({ brand: brandName, products }) => (
              <Link
                key={brandName}
                href={`/sklep/${products[0].slug}`}
                className="group flex flex-col items-center gap-3 rounded-3xl bg-surface p-5 text-center transition hover:bg-surface2"
              >
                <div className="relative h-20 w-20">
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(240,180,41,0.25),transparent_65%)]"
                  />
                  <Image
                    src={products[0].imageUrl}
                    alt={brandName}
                    fill
                    className="object-contain p-2 transition group-hover:scale-105"
                  />
                </div>
                <span className="text-sm font-bold text-ink">{brandName}</span>
                <span className="text-xs text-muted">od {formatPrice(Math.min(...products.map((p) => p.priceCents)))}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* BESTSELLERY */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow mb-2">Najczęściej zamawiane</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Bestsellery na dziś
            </h2>
          </div>
          <Link href="/sklep" className="hidden text-sm font-semibold text-gold-bright hover:underline sm:block">
            Zobacz cały sklep →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
