const prisma = require("../prisma");

const getMyAnalytics = async (req, res) => {
  try {
    const userId = req.user.userId;

    const attempts = await prisma.questionAttempt.findMany({
      where: { userId },
      include: {
        question: {
          include: {
            topic: true
          }
        }
      }
    });

    const totalAttempts = attempts.length;
    const correctAnswers = attempts.filter(a => a.isCorrect).length;
    const wrongAnswers = totalAttempts - correctAnswers;

    const accuracy =
      totalAttempts === 0
        ? 0
        : Math.round((correctAnswers / totalAttempts) * 100);

    // Topic-wise stats
    const topicStats = {};

    attempts.forEach(attempt => {
      const topicName = attempt.question.topic.name;

      if (!topicStats[topicName]) {
        topicStats[topicName] = {
          topic: topicName,
          total: 0,
          correct: 0
        };
      }

      topicStats[topicName].total += 1;
      if (attempt.isCorrect) {
        topicStats[topicName].correct += 1;
      }
    });

    const topicPerformance = Object.values(topicStats).map(t => ({
      topic: t.topic,
      total: t.total,
      correct: t.correct,
      accuracy: Math.round((t.correct / t.total) * 100)
    }));

    res.json({
      totalAttempts,
      correctAnswers,
      wrongAnswers,
      accuracy,
      topicPerformance
    });
  } catch (error) {
    console.error("ANALYTICS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};

module.exports = { getMyAnalytics };
