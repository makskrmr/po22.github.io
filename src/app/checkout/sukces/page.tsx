import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";

export default async function SukcesPage({
  searchParams
}: {
  searchParams: { order?: string };
}) {
  const order = searchParams.order
    ? await prisma.order
        .findUnique({ where: { id: searchParams.order } })
        .catch(() => null)
    : null;

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime/15 shadow-glow-lime">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 13l4 4L19 7" stroke="#B6FF3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink">Zamówienie przyjęte</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {order
          ? `Zamówienie nr ${order.number} na kwotę ${formatPrice(order.totalCents)} zostało przekazane do realizacji.`
          : "Twoje zamówienie zostało przekazane do realizacji."}{" "}
        Kurier skontaktuje się telefonicznie i poprosi o okazanie dowodu osobistego przy odbiorze.
      </p>

      <Link href="/sklep" className="btn-primary mt-8 inline-flex">
        Wróć do sklepu
      </Link>
    </div>
  );
}
