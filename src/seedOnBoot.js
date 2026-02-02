const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedSubjectsOnce() {
  const count = await prisma.subject.count();
  if (count > 0) {
    console.log("✅ Subjects already exist, skipping seed");
    return;
  }

  await prisma.subject.createMany({
    data: [
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
    ],
    skipDuplicates: true
  });

  console.log("🎉 Subjects seeded successfully");
}

module.exports = seedSubjectsOnce;