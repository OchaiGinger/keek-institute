import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  console.log("🌱 Seeding Training Modes...");

  for (const name of ["ONLINE", "PHYSICAL", "HYBRID"]) {
    await prisma.trainingMode.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("🌱 Seeding Student Categories...");

  for (const name of [
    "INTERNAL",
    "POLYTECHNIC",
    "SCHOLARSHIPS",
    "INTERNSHIP",
  ]) {
    await prisma.studentCategory.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("✅ Seeding completed!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
