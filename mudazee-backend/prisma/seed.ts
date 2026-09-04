import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("Admin@12345", 12);
  await prisma.user.upsert({
    where: { email: "admin@mudazee.com" },
    update: {},
    create: {
      email: "admin@mudazee.com",
      passwordHash: adminPassword,
      name: "MUDAZEE Admin",
      role: "ADMIN",
    },
  });

  await prisma.shippingRule.createMany({
    data: [
      { city: "Karachi", fee: 150, freeThreshold: 5000, sameDayEligible: true },
      { city: "Lahore", fee: 250, freeThreshold: 6000, sameDayEligible: false },
      { city: "Islamabad", fee: 250, freeThreshold: 6000, sameDayEligible: false },
    ],
    skipDuplicates: true,
  });

  await prisma.store.createMany({
    data: [
      {
        branchName: "Gulistan-e-Johar",
        address: "Rasheedabad Chowrangi No. 2, Block 8",
        city: "Karachi",
        latitude: 24.9265,
        longitude: 67.1319,
        googleMapsUrl: "https://maps.google.com/?q=Gulistan-e-Johar+Karachi",
        contactNumber: "+92 300 1234567",
      },
      {
        branchName: "D.H.A Karachi",
        address: "23-C, Khayaban-e-Sehar, Phase 6",
        city: "Karachi",
        latitude: 24.8138,
        longitude: 67.0653,
        googleMapsUrl: "https://maps.google.com/?q=DHA+Phase+6+Karachi",
        contactNumber: "+92 300 7654321",
      },
    ],
    skipDuplicates: true,
  });

  const executive = await prisma.product.upsert({
    where: { slug: "executive" },
    update: {},
    create: {
      title: "Executive",
      slug: "executive",
      sku: "MDZ-EXE-001",
      description: "A bold woody-amber composition inspired by iconic French houses.",
      originalPrice: 3600,
      salePrice: 3200,
      stockQuantity: 120,
      images: ["https://images.unsplash.com/photo-1541643600914-78b084683601"],
      isNewArrival: true,
      isBestSeller: true,
      impressionOf: "Aventus — Creed",
      genderCategory: "MEN",
      season: "ALL_SEASON",
      fragranceType: "FULL_BOTTLE",
      ratingAvg: 4.8,
      reviewCount: 214,
    },
  });

  const testerTemplate = await prisma.customBoxTemplate.upsert({
    where: { slug: "custom-tester-box-6" },
    update: {},
    create: {
      name: "Custom Tester Box (Pick 6)",
      slug: "custom-tester-box-6",
      slotsCount: 6,
      price: 2400,
      description: "Choose any 6 x 5ml testers from our curated tester list.",
    },
  });

  await prisma.customBoxOption.upsert({
    where: { templateId_productId: { templateId: testerTemplate.id, productId: executive.id } },
    update: {},
    create: { templateId: testerTemplate.id, productId: executive.id },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
