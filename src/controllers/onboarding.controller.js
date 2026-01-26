const prisma = require("../prisma");

const completeOnboarding = async (req, res) => {
  try {
    const { userId, academicLevel, targetExam, targetYear } = req.body;

    if (!userId || !academicLevel || !targetExam || !targetYear) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        academicLevel,
        targetExam,
        targetYear
      }
    });

    res.json({ message: "Onboarding completed" });
  } catch (err) {
    console.error("ONBOARDING ERROR:", err);
    res.status(500).json({ message: "Onboarding failed" });
  }
};

module.exports = { completeOnboarding };
