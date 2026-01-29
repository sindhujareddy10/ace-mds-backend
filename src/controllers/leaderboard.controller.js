const prisma = require("../prisma");

const getLeaderboard = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        streaks: {
          orderBy: { date: "desc" },
          take: 1
        },
        attempts: {
          select: { isCorrect: true }
        }
      }
    });

    const leaderboard = users.map(user => {
      const currentStreak =
        user.streaks.length > 0 ? user.streaks[0].count : 0;

      const totalAttempts = user.attempts.length;
      const correctAnswers = user.attempts.filter(a => a.isCorrect).length;

      return {
        userId: user.id,
        name: user.name,
        currentStreak,
        totalAttempts,
        correctAnswers
      };
    });

    leaderboard.sort((a, b) => {
      if (b.currentStreak !== a.currentStreak) {
        return b.currentStreak - a.currentStreak;
      }
      return b.correctAnswers - a.correctAnswers;
    });

    res.json(leaderboard);
  } catch (error) {
    console.error("LEADERBOARD ERROR:", error);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};

module.exports = { getLeaderboard };
