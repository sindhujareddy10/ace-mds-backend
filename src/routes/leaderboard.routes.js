const express = require("express");
const router = express.Router();

const { getLeaderboard } = require("../controllers/leaderboard.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, getLeaderboard);

module.exports = router;
