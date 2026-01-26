const prisma = require("../prisma");

// SAVE QUESTION ATTEMPT
const saveAttempt = async (req, res) => {
  try {
    const { questionId, selectedOption } = req.body;

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
