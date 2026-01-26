const prisma = require("../prisma");
const updateDailyStreak = async (userId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if today's streak already exists
  const todayStreak = await prisma.dailyStreak.findUnique({
    where: {
      userId_date: {
        userId,
        date: today
      }
    }
  });

  if (todayStreak) return;

  // Check yesterday
  const yesterdayStreak = await prisma.dailyStreak.findUnique({
    where: {
      userId_date: {
        userId,
        date: yesterday
      }
    }
  });

  const count = yesterdayStreak ? yesterdayStreak.count + 1 : 1;

  await prisma.dailyStreak.create({
    data: {
      userId,
      date: today,
      count
    }
  });
};

// SAVE QUESTION ATTEMPT
const saveAttempt = async (req, res) => {
  try {
    const { questionId, selectedOption } = req.body;
    const userId=req.user.userId;
    if (!questionId || !selectedOption) {
      return res.status(400).json({
        message: "questionId and selectedOption are required"
      });
    }

    const question = await prisma.question.findUnique({
      where: { id: questionId }
    });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const isCorrect = question.correctOption === selectedOption;

    const attempt = await prisma.questionAttempt.create({
      data: {
        questionId,
        selectedOption,
        isCorrect,
        userId: req.user.userId
      }
    });
    await updateDailyStreak(userId);

    return res.status(201).json({
      attemptId: attempt.id,
      questionId,
      selectedOption,
      isCorrect,
      correctOption: question.correctOption,
      explanation: question.explanation
    });
  } catch (error) {
    console.error("SAVE ATTEMPT ERROR:", error);
    return res.status(500).json({ message: "Failed to save attempt" });
  }
};

module.exports = { saveAttempt };
