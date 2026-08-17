import Image from "next/image";
import Link from "next/link";
import { formatAbv, formatVolume, formatPrice } from "@/lib/format";

export type ProductCardData = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  priceCents: number;
  imageUrl: string;
  volumeMl?: number | null;
  weightG?: number | null;
  abv?: number | null;
  inStock: boolean;
};

export default function ProductCard({ product }: { product: ProductCardData }) {
  const volumeLabel = formatVolume(product.volumeMl, product.weightG);
  const abvLabel = formatAbv(product.abv);

  return (
    <Link href={`/sklep/${product.slug}`} className="group block">
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-surface transition group-hover:bg-surface2">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(240,180,41,0.2),transparent_60%)]"
        />
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-8 transition duration-300 group-hover:scale-105"
        />
        {!product.inStock && (
          <span className="absolute left-3 top-3 rounded-full bg-void/80 px-2.5 py-1 text-xs font-semibold text-muted">
            Niedostępny
          </span>
        )}
      </div>
      <div className="px-1 pt-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{product.brand}</p>
        <h3 className="mt-0.5 truncate text-sm font-bold text-ink sm:text-base">{product.name}</h3>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-sm font-extrabold text-gold-bright sm:text-base">
            {formatPrice(product.priceCents)}
          </span>
          <span className="text-xs text-muted">{[volumeLabel, abvLabel].filter(Boolean).join(" · ")}</span>
        </div>
      </div>
    </Link>
  );
}
