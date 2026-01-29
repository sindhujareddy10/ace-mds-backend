const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.subject.createMany({
    data: [
      { name: "Dental Anatomy" },
      { name: "Dental Histology" },
      { name: "Oral Pathology" },
      { name: "Oral Medicine" },
      { name: "Periodontology" },
      { name: "Orthodontics" },
      { name: "Prosthodontics" },
      { name: "Conservative Dentistry" },
      { name: "Endodontics" },
      { name: "Oral Surgery" },
      { name: "Pedodontics" },
      { name: "Public Health Dentistry" },
      { name: "Oral Radiology" }
    ],
    skipDuplicates: true
  });

  console.log("✅ Subjects seeded successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });