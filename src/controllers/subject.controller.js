const prisma = require("../prisma");

/**
 * GET all subjects
 */
const getSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany({
      orderBy: { name: "asc" }
    });

    res.json(subjects);
  } catch (err) {
    console.error("GET SUBJECTS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch subjects" });
  }
};

/**
 * CREATE subject (manual seeding)
 */
const createSubject = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Subject name required" });
    }

    const subject = await prisma.subject.create({
      data: { name }
    });

    res.status(201).json(subject);
  } catch (err) {
    console.error("CREATE SUBJECT ERROR:", err);
    res.status(500).json({ message: "Failed to create subject" });
  }
};

module.exports = {
  getSubjects,
  createSubject
};
