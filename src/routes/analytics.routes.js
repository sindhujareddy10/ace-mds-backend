const express = require("express");
const router = express.Router();

const { getMyAnalytics } = require("../controllers/analytics.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/me", authMiddleware, getMyAnalytics);

module.exports = router;
