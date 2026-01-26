const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const {
  getSubjects,
  createSubject
} = require("../controllers/subject.controller");

router.get("/", authMiddleware, getSubjects);
router.post("/", authMiddleware, createSubject);

module.exports = router;
