import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import StatusBadge from "@/components/StatusBadge";

export const dynamic = "force-dynamic";

export default async function KurierPanelPage() {
  const orders = await prisma.order
    .findMany({
      where: { status: { not: "DOSTARCZONE" } },
      orderBy: { createdAt: "desc" },
      include: { items: true }
    })
    .catch(() => []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow mb-2">Panel kuriera</p>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Aktywne zamówienia
          </h1>
        </div>
        <span className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-muted">
          {orders.length} do realizacji
        </span>
      </div>

      {orders.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted">Brak aktywnych zamówień. Czas na przerwę ☕</p>
      ) : (
        <div className="mt-8 space-y-3">
          {orders.map((o) => (
            <Link
              key={o.id}
              href={`/admin/kurier/${o.id}`}
              className="card flex items-center justify-between gap-4 p-4 transition hover:border-gold/50"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-ink">#{o.number}</span>
                  <StatusBadge status={o.status} />
                  <StatusBadge status={o.paymentStatus} />
                </div>
                <p className="mt-1 truncate text-sm text-muted">
                  {o.deliveryCity} · {o.deliveryAddress} · {o.items.length} poz.
                </p>
              </div>
              <span className="flex-shrink-0 text-sm font-bold text-ink">{formatPrice(o.totalCents)}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
