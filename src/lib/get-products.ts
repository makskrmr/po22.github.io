import { prisma } from "@/lib/prisma";
import { sampleProducts } from "@/lib/sample-products";

export type ProductDTO = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  priceCents: number;
  imageUrl: string;
  volumeMl: number | null;
  weightG: number | null;
  abv: number | null;
  country: string | null;
  inStock: boolean;
  featured: boolean;
  description: string | null;
};

// W środowisku demo (bez skonfigurowanej bazy DATABASE_URL) korzystamy z
// danych przykładowych, żeby katalog produktów działał od razu po `npm run dev`.
function fallbackProducts(): ProductDTO[] {
  return sampleProducts.map((p) => ({
    id: p.slug,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    priceCents: p.priceCents,
    imageUrl: p.imageUrl,
    volumeMl: p.volumeMl ?? null,
    weightG: p.weightG ?? null,
    abv: p.abv ?? null,
    country: p.country ?? null,
    inStock: true,
    featured: Boolean(p.featured),
    description: p.description ?? null
  }));
}

export async function getAllProducts(): Promise<ProductDTO[]> {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });
    if (products.length === 0) return fallbackProducts();
    return products;
  } catch {
    return fallbackProducts();
  }
}

export async function getFeaturedProducts(): Promise<ProductDTO[]> {
  const all = await getAllProducts();
  const featured = all.filter((p) => p.featured);
  return featured.length > 0 ? featured : all.slice(0, 4);
}

export async function getProductById(id: string): Promise<ProductDTO | null> {
  const all = await getAllProducts();
  return all.find((p) => p.id === id) ?? null;
}

export async function getProductBySlug(slug: string): Promise<ProductDTO | null> {
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

/** Grupuje produkty według marki — do sekcji "Popularne marki". */
export function groupByBrand(products: ProductDTO[]): { brand: string; products: ProductDTO[] }[] {
  const map = new Map<string, ProductDTO[]>();
  for (const p of products) {
    const list = map.get(p.brand) ?? [];
    list.push(p);
    map.set(p.brand, list);
  }
  return Array.from(map.entries()).map(([brand, products]) => ({ brand, products }));
}
