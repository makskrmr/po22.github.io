import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatVolume } from "@/lib/format";
import StatusBadge from "@/components/StatusBadge";
import OrderStatusControls from "@/components/OrderStatusControls";

export const dynamic = "force-dynamic";

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = await prisma.order
    .findUnique({
      where: { id: params.id },
      include: { items: { include: { product: true } } }
    })
    .catch(() => null);

  if (!order) return notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Link href="/admin/kurier" className="text-sm text-muted hover:text-ink">
        ← Wróć do listy
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="font-mono text-2xl font-extrabold text-ink">Zamówienie #{order.number}</h1>
        <div className="flex gap-2">
          <StatusBadge status={order.status} />
          <StatusBadge status={order.paymentStatus} />
        </div>
      </div>

      {order.paymentStatus !== "OPLACONE" && (
        <div className="mt-4 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger">
          Uwaga: to zamówienie nie jest jeszcze opłacone. Nie realizuj zakupu do czasu potwierdzenia płatności.
        </div>
      )}

      <section className="card mt-6 space-y-3 p-5">
        <h2 className="eyebrow">Dostawa</h2>
        <p className="text-sm text-ink">{order.customerName} · {order.phone}</p>
        <p className="text-sm text-muted">{order.deliveryAddress}, {order.deliveryCity}</p>
        {order.notes && <p className="text-sm italic text-muted">Uwagi: {order.notes}</p>}
        <div className="rounded-lg border border-ember/30 bg-ember/10 p-3 text-xs text-ember-bright">
          Przed wydaniem zamówienia zweryfikuj pełnoletność odbiorcy na podstawie dowodu osobistego.
          Brak dokumentu = odmowa wydania towaru, bez zwrotu kosztu transportu.
        </div>
      </section>

      <section className="card mt-6 space-y-3 p-5">
        <h2 className="eyebrow">Lista zakupów w punkcie koncesjonowanym</h2>
        <ul className="divide-y divide-line">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center justify-between py-3 text-sm">
              <div>
                <p className="font-medium text-ink">
                  {item.quantity}× {item.product.brand} {item.product.name}
                </p>
                <p className="text-xs text-muted">
                  {formatVolume(item.product.volumeMl, item.product.weightG)}
                </p>
              </div>
              <span className="font-semibold text-ink">
                {formatPrice(item.priceCentsAtPurchase * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-line pt-3">
          <span className="text-sm font-semibold text-muted">Suma do zapłaty w kasie</span>
          <span className="text-lg font-extrabold text-ink">
            {formatPrice(order.totalCents - order.deliveryFeeCents)}
          </span>
        </div>
        <p className="text-xs text-muted">
          Opłata za dostawę ({formatPrice(order.deliveryFeeCents)}) to marża serwisu — nie płać jej
          w kasie, klient zapłacił ją już online razem z resztą zamówienia.
        </p>
      </section>

      <div className="mt-6">
        <OrderStatusControls orderId={order.id} currentStatus={order.status} />
      </div>
    </div>
  );
}
