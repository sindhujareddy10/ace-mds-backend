const prisma = require("../prisma");

/**
 * GET PROFILE
 * GET /api/profile
 */
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

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch profile"
    });
  }
};

/**
 * UPDATE PROFILE
 * PUT /api/profile
 */
const updateProfile = async (req, res) => {
  try {
    const { name, targetYear, academicLevel, dailyGoal } = req.body;

    await prisma.user.update({
      where: { id: req.user.userId },
      data: {
        name,
        targetYear,
        academicLevel,
        dailyGoal
      }
    });

    return res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    return res.status(500).json({
      message: "Failed to update profile"
    });
  }
};

module.exports = {
  getProfile,
  updateProfile
};