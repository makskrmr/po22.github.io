import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: { include: { product: true } }, courier: true }
  });
  if (!order) return NextResponse.json({ error: "Nie znaleziono zamówienia." }, { status: 404 });
  return NextResponse.json(order);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();

  const allowedStatus = ["NOWE", "PRZYJETE", "W_ZAKUPACH", "W_DRODZE", "DOSTARCZONE", "ANULOWANE"];
  const allowedPaymentStatus = ["OCZEKUJE", "OPLACONE", "NIEUDANE", "ZWROCONE"];

  const data: Record<string, unknown> = {};
  if (body.status && allowedStatus.includes(body.status)) data.status = body.status;
  if (body.paymentStatus && allowedPaymentStatus.includes(body.paymentStatus)) {
    data.paymentStatus = body.paymentStatus;
  }
  if (body.courierId !== undefined) data.courierId = body.courierId;

  const order = await prisma.order.update({ where: { id: params.id }, data });
  return NextResponse.json(order);
}
