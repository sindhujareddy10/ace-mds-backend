const prisma = require("../prisma");

// GET PROFILE
const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        name: true,
        email: true,
        targetYear: true,
        academicLevel: true,
        dailyGoal: true
      }
    });

    res.json(user);
  } catch (error) {
  console.error("GET PROFILE ERROR:", error);
  res.status(500).json({
    message: "Failed to fetch profile",
    error: error.message
  });
}

};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const { name, targetYear, academicLevel, dailyGoal } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: {
        name,
        targetYear,
        academicLevel,
        dailyGoal
      }
    });

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

module.exports = { getProfile, updateProfile };
