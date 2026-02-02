const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const subjects = [
    { name: "Oral Anatomy & Histology" },
    { name: "Physiology" },
    { name: "Biochemistry" },
    { name: "Dental Materials" },
    { name: "Microbiology" },
    { name: "Pathology" },
    { name: "Pharmacology" },
    { name: "General Medicine" },
    { name: "General Surgery" },
    { name: "Oral Pathology" },
    { name: "Oral Medicine & Radiology" },
    { name: "Orthodontics" },
    { name: "Pedodontics" },
    { name: "Periodontology" },
    { name: "Prosthodontics" },
    { name: "Conservative Dentistry & Endodontics" },
    { name: "Oral & Maxillofacial Surgery" },
    { name: "Public Health Dentistry" },
    { name: "Forensic Odontology" }
  ];

  await prisma.subject.createMany({
    data: subjects,
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