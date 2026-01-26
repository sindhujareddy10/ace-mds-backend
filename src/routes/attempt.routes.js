const express = require("express");
const router = express.Router();

const { saveAttempt } = require("../controllers/attempt.controller");
const authMiddleware= require("../middleware/auth.middleware");

// PUBLIC (no auth yet)
router.post("/", authMiddleware,saveAttempt);

module.exports = router;
