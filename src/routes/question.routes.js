const express = require("express");
const router = express.Router();

const {
  createQuestion,
  getQuestionsByTopic
} = require("../controllers/question.controller");

const authMiddleware = require("../middleware/auth.middleware");

/**
 * CREATE QUESTION
 * POST /api/questions
 * (Admin / internal use only)
 */
router.post("/", authMiddleware, createQuestion);

/**
 * GET QUESTIONS BY TOPIC
 * GET /api/questions/topic/:topicId
 */
router.get("/topic/:topicId", authMiddleware, getQuestionsByTopic);

module.exports = router;