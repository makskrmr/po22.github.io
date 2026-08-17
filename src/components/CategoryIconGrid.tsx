import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/config";

const categoryIcons: Record<string, string> = {
  PIWO: "/products/piwo.svg",
  WODKA: "/products/wodka.svg",
  WINO: "/products/wino.svg",
  PRZEKASKI: "/products/chipsy.svg",
  NAPOJE_BEZALKOHOLOWE: "/products/cola.svg"
};

export default function CategoryIconGrid() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-1 sm:grid sm:grid-cols-5 sm:overflow-visible">
      {categories.map((c) => (
        <Link
          key={c.key}
          href={`/sklep?kategoria=${c.key}`}
          className="group flex w-16 flex-shrink-0 flex-col items-center gap-2 text-center sm:w-auto"
        >
          <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-surface transition group-hover:bg-surface2">
            <Image src={categoryIcons[c.key]} alt="" width={34} height={34} className="object-contain" />
          </span>
          <span className="text-xs font-semibold text-muted group-hover:text-ink">{c.label}</span>
        </Link>
      ))}
    </div>
  );
}
