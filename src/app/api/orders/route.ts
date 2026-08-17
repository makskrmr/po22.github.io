import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const orders = await prisma.order.findMany({
    where: { status: { not: "DOSTARCZONE" } },
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } }, courier: true }
  });
  return NextResponse.json(orders);
}
