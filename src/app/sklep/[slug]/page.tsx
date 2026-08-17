import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/get-products";
import { formatAbv, formatPrice, formatVolume } from "@/lib/format";
import { categoryLabel } from "@/lib/config";
import ProductAddToCart from "@/components/ProductAddToCart";
import ScreenHeader from "@/components/ScreenHeader";
import FavoriteButton from "@/components/FavoriteButton";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();

  const volumeLabel = formatVolume(product.volumeMl, product.weightG);
  const abvLabel = formatAbv(product.abv);

  const specs = [
    { label: "Kategoria", value: categoryLabel(product.category) },
    abvLabel ? { label: "Alkohol", value: abvLabel } : null,
    volumeLabel ? { label: product.weightG ? "Waga" : "Pojemność", value: volumeLabel } : null,
    product.country ? { label: "Kraj pochodzenia", value: product.country } : null
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      <ScreenHeader backHref="/sklep" right={<FavoriteButton />} />

      <div className="grid gap-10 sm:grid-cols-2 sm:items-start">
        <div className="relative aspect-square w-full">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(240,180,41,0.22),transparent_62%)]"
          />
          <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-6" />
        </div>

        <dl className="space-y-5 sm:pt-2">
          {specs.map((s) => (
            <div key={s.label}>
              <dt className="text-xs font-medium text-muted">{s.label}</dt>
              <dd className="mt-0.5 text-base font-bold text-gold-bright">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-8 flex items-start justify-between gap-4 border-t border-line pt-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{product.brand}</p>
          <h1 className="mt-0.5 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
            {product.name}
          </h1>
        </div>
        <p className="flex-shrink-0 text-xl font-extrabold text-gold-bright sm:text-2xl">
          {formatPrice(product.priceCents)}
        </p>
      </div>

      {product.description && (
        <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>
      )}

      <div className="mt-8">
        <ProductAddToCart
          productId={product.id}
          name={product.name}
          priceCents={product.priceCents}
          imageUrl={product.imageUrl}
          volumeLabel={volumeLabel}
          inStock={product.inStock}
        />
      </div>
    </div>
  );
}
