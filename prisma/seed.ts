import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PRODUCT_SEEDS } from "../src/data/products.js";
import { PAYMENT } from "../src/lib/config.js";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to run seed");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  for (const seed of PRODUCT_SEEDS) {
    await prisma.product.upsert({
      where: { slug: seed.slug },
      update: {
        name: seed.name,
        category: seed.category,
        shortDesc: seed.shortDesc,
        description: seed.description,
        features: JSON.stringify(seed.features),
        specs: JSON.stringify(seed.specs),
        scenarios: JSON.stringify(seed.scenarios),
        accessories: JSON.stringify(seed.accessories),
        delivery: JSON.stringify(seed.delivery),
        maintenance: JSON.stringify(seed.maintenance),
        faq: JSON.stringify(seed.faq),
        priceUsd: seed.priceUsd,
        stock: seed.stock,
        imageCard: seed.imageCard,
        imageHero: seed.imageHero,
        imageDetail: seed.imageDetail,
      },
      create: {
        slug: seed.slug,
        name: seed.name,
        category: seed.category,
        shortDesc: seed.shortDesc,
        description: seed.description,
        features: JSON.stringify(seed.features),
        specs: JSON.stringify(seed.specs),
        scenarios: JSON.stringify(seed.scenarios),
        accessories: JSON.stringify(seed.accessories),
        delivery: JSON.stringify(seed.delivery),
        maintenance: JSON.stringify(seed.maintenance),
        faq: JSON.stringify(seed.faq),
        priceUsd: seed.priceUsd,
        stock: seed.stock,
        imageCard: seed.imageCard,
        imageHero: seed.imageHero,
        imageDetail: seed.imageDetail,
      },
    });
  }

  await prisma.paymentSettings.upsert({
    where: { id: "default" },
    update: {
      trc20Address: PAYMENT.address,
      usdtContract: PAYMENT.contract,
      minAmount: PAYMENT.minAmount,
      expiryMinutes: PAYMENT.expiryMinutes,
    },
    create: {
      id: "default",
      trc20Address: PAYMENT.address,
      usdtContract: PAYMENT.contract,
      minAmount: PAYMENT.minAmount,
      expiryMinutes: PAYMENT.expiryMinutes,
    },
  });

  await prisma.product.updateMany({
    where: { slug: "remote-control-setup" },
    data: { published: false },
  });

  const adminEmail = process.env.ADMIN_EMAIL || "admin@phonefarm.fun";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123456";

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Admin",
      role: "admin",
      passwordHash: await bcrypt.hash(adminPassword, 12),
    },
  });

  console.log("Seeded products and admin user");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
