import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createPayment } from "@/lib/payments";
import { brand } from "@/lib/config";

type CheckoutPayload = {
  customerName: string;
  phone: string;
  deliveryAddress: string;
  deliveryCity: string;
  notes?: string;
  paymentMethod: "card" | "blik";
  wiekPotwierdzony: boolean;
  pelnomocnictwoZaakceptowane: boolean;
  regulaminZaakceptowany: boolean;
  items: { productId: string; quantity: number }[];
};

export async function POST(req: Request) {
  const body = (await req.json()) as CheckoutPayload;

  // Walidacja podstawowa
  if (!body.customerName || !body.phone || !body.deliveryAddress || !body.deliveryCity) {
    return NextResponse.json({ error: "Uzupełnij wszystkie dane dostawy." }, { status: 400 });
  }
  if (!body.items || body.items.length === 0) {
    return NextResponse.json({ error: "Koszyk jest pusty." }, { status: 400 });
  }
  // Trzy zgody są prawnie wymagane do złożenia zamówienia w tym modelu —
  // bez nich zamówienie nie może zostać przyjęte do realizacji.
  if (!body.wiekPotwierdzony || !body.pelnomocnictwoZaakceptowane || !body.regulaminZaakceptowany) {
    return NextResponse.json(
      { error: "Wymagane zgody nie zostały zaznaczone." },
      { status: 400 }
    );
  }

  // Pobierz aktualne ceny z bazy — nigdy nie ufamy cenom przesłanym z klienta
  const dbProducts = await prisma.product.findMany({
    where: { id: { in: body.items.map((i) => i.productId) } }
  });

  if (dbProducts.length !== body.items.length) {
    return NextResponse.json(
      { error: "Część produktów jest już niedostępna. Odśwież koszyk." },
      { status: 409 }
    );
  }

  const itemsSubtotalCents = body.items.reduce((sum, i) => {
    const p = dbProducts.find((dp) => dp.id === i.productId)!;
    return sum + p.priceCents * i.quantity;
  }, 0);
  const totalCents = itemsSubtotalCents + brand.deliveryFeeCents;

  const order = await prisma.order.create({
    data: {
      customerName: body.customerName,
      phone: body.phone,
      deliveryAddress: body.deliveryAddress,
      deliveryCity: body.deliveryCity,
      notes: body.notes,
      paymentMethod: body.paymentMethod,
      wiekPotwierdzony: body.wiekPotwierdzony,
      pelnomocnictwoZaakceptowane: body.pelnomocnictwoZaakceptowane,
      regulaminZaakceptowany: body.regulaminZaakceptowany,
      deliveryFeeCents: brand.deliveryFeeCents,
      totalCents,
      items: {
        create: body.items.map((i) => {
          const p = dbProducts.find((dp) => dp.id === i.productId)!;
          return { productId: p.id, quantity: i.quantity, priceCentsAtPurchase: p.priceCents };
        })
      }
    }
  });

  const payment = await createPayment(totalCents, body.paymentMethod, order.number);

  await prisma.order.update({
    where: { id: order.id },
    data: { paymentIntentId: payment.paymentIntentId }
  });

  return NextResponse.json({
    orderId: order.id,
    orderNumber: order.number,
    amountCents: totalCents,
    clientSecret: payment.clientSecret,
    devMode: payment.devMode
  });
}
