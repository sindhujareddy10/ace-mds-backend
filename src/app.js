const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const onboardingRoutes = require("./routes/onboarding.routes");
const subjectRoutes = require("./routes/subject.routes");
const topicRoutes = require("./routes/topic.routes");
const attemptRoutes = require("./routes/attempt.routes");
const questionRoutes = require("./routes/question.routes");
const profileRoutes = require("./routes/profile.routes");
const leaderboardRoutes = require("./routes/leaderboard.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/analytics", analyticsRoutes);

module.exports = app;

