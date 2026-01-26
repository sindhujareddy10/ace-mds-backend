const prisma = require("../prisma");

/**
 * CREATE topic under a subject
 */
const createTopic = async (req, res) => {
  try {
    const { name, subjectId } = req.body;

    if (!name || !subjectId) {
      return res.status(400).json({
        message: "Topic name and subjectId are required"
      });
    }

    const topic = await prisma.topic.create({
      data: {
        name,
        subjectId
      }
    });

    res.status(201).json(topic);
  } catch (err) {
    console.error("CREATE TOPIC ERROR:", err);
    res.status(500).json({ message: "Failed to create topic" });
  }
};

/**
 * GET topics by subject
 */
const getTopicsBySubject = async (req, res) => {
  try {
    const subjectId = Number(req.params.subjectId);

    const topics = await prisma.topic.findMany({
      where: { subjectId },
      orderBy: { name: "asc" }
    });

    res.json(topics);
  } catch (err) {
    console.error("GET TOPICS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch topics" });
  }
};

module.exports = {
  createTopic,
  getTopicsBySubject
};
