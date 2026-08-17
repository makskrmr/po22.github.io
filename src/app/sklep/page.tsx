import ShopClient from "@/components/ShopClient";
import { getAllProducts } from "@/lib/get-products";

// ProductDTO ma już pole `category: string`, więc strukturalnie pasuje do ShopProduct.

export default async function SklepPage({
  searchParams
}: {
  searchParams: { kategoria?: string };
}) {
  const products = await getAllProducts();
  const initialCategory = searchParams.kategoria ?? "WSZYSTKIE";

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-ink">Sklep</h1>

      <ShopClient products={products} initialCategory={initialCategory} />
    </div>
  );
}
