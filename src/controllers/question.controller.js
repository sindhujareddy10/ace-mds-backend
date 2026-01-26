const prisma = require("../prisma");

// CREATE MCQ
const createQuestion = async (req, res) => {
  try {
    const {
      topicId,
      questionText,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
      explanation,
      difficulty,
      referenceBook
    } = req.body;

    if (
      !topicId ||
      !questionText ||
      !optionA ||
      !optionB ||
      !optionC ||
      !optionD ||
      !correctOption
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const question = await prisma.question.create({
      data: {
        topicId,
        questionText,
        optionA,
        optionB,
        optionC,
        optionD,
        correctOption,
        explanation: explanation || "",
        
        referenceBook
      }
    });

    res.status(201).json(question);
   } catch (error) {
  console.error("❌ CREATE QUESTION ERROR:", error);
  return res.status(500).json({
    message: "Failed to create question",
    error: error.message
  });
}

};
// GET MCQs BY TOPIC
const getQuestionsByTopic = async (req, res) => {
  try {
    const topicId = parseInt(req.params.topicId);

    const questions = await prisma.question.findMany({
      where: { topicId },
      orderBy: { id: "asc" }
    });

    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
};
// CHECK MCQ ANSWER
const checkAnswer = async (req, res) => {
  try {
    const { questionId, selectedOption } = req.body;

    if (!questionId || !selectedOption) {
      return res.status(400).json({ message: "questionId and selectedOption required" });
    }

    const question = await prisma.question.findUnique({
      where: { id: questionId }
    });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const isCorrect = question.correctOption === selectedOption;

    res.json({
      questionId: question.id,
      selectedOption,
      correctOption: question.correctOption,
      isCorrect,
      explanation: question.explanation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to check answer" });
  }
};



module.exports = {
  createQuestion,
  getQuestionsByTopic,
  checkAnswer
};


