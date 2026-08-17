import { PrismaClient } from "@prisma/client";
import { sampleProducts } from "../src/lib/sample-products";

const prisma = new PrismaClient();

async function main() {
  console.log("Seedowanie produktów...");
  for (const p of sampleProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { ...p },
      create: { ...p }
    });
  }

  const courierCount = await prisma.courier.count();
  if (courierCount === 0) {
    await prisma.courier.create({
      data: { name: "Kurier Demo", phone: "+48 600 000 000" }
    });
  }

  console.log("Gotowe.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
