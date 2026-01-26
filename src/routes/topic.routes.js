const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

// CREATE TOPIC
router.post("/", async (req, res) => {
  try {
    const { name, subjectId } = req.body;

    const topic = await prisma.topic.create({
      data: { name, subjectId }
    });

    res.status(201).json(topic);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
