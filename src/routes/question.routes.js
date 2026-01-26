const express = require("express");
const router = express.Router();

const {
  createQuestion,
  getQuestionsByTopic,
  checkAnswer
} = require("../controllers/question.controller");

// PUBLIC MCQ APIs
router.post("/", createQuestion);
router.get("/topic/:topicId", getQuestionsByTopic);
router.post("/check", checkAnswer);

module.exports = router;
