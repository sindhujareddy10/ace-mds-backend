const express = require("express");
const router = express.Router();
const prisma = require("../prisma");
const authMiddleware = require("../middleware/auth.middleware");

/**
 * CREATE TOPIC
 * POST /api/topics
 * (Admin / internal use)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, subjectId } = req.body;

    // Validation
    if (!name || !subjectId) {
      return res.status(400).json({
        message: "Topic name and subjectId are required"
      });
    }

    // Optional: check if subject exists
    const subjectExists = await prisma.subject.findUnique({
      where: { id: subjectId }
    });

    if (!subjectExists) {
      return res.status(404).json({
        message: "Subject not found"
      });
    }

    const topic = await prisma.topic.create({
      data: {
        name,
        subjectId
      }
    });

    return res.status(201).json({
      message: "Topic created successfully",
      topic
    });

  } catch (error) {
    console.error("CREATE TOPIC ERROR:", error);
    return res.status(500).json({
      message: "Failed to create topic"
    });
  }
});

module.exports = router;