const express = require("express");
const router = express.Router();
const { completeOnboarding } = require("../controllers/onboarding.controller");

router.post("/", completeOnboarding);

module.exports = router;
