# AceMDS Backend API Contract (v1)

Base URL (local):
http://localhost:8080

All protected APIs require:
Authorization: Bearer <JWT_TOKEN>

---

## 🔐 AUTH

### Register
POST /api/auth/register

Request:
{
  "name": "string",
  "email": "string",
  "password": "string"
}

Response:
{
  "message": "User registered successfully",
  "userId": "uuid"
}

---

### Login
POST /api/auth/login

Request:
{
  "email": "string",
  "password": "string"
}

Response:
{
  "token": "jwt",
  "isOnboarded": boolean
}

---

## 👤 PROFILE

### Get Profile
GET /api/profile

Response:
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "targetYear": number,
  "academicLevel": "string",
  "dailyGoal": number
}

---

### Update Profile
PUT /api/profile

Request:
{
  "name": "string",
  "targetYear": number,
  "academicLevel": "string",
  "dailyGoal": number
}

Response:
{
  "message": "Profile updated successfully"
}

---

## 📘 SUBJECTS

### Get Subjects
GET /api/subjects

Response:
[
  { "id": number, "name": "string" }
]

---

## 📗 TOPICS

### Create Topic (internal)
POST /api/topics

Request:
{
  "name": "string",
  "subjectId": number
}

Response:
{
  "message": "Topic created successfully",
  "topic": {
    "id": number,
    "name": "string",
    "subjectId": number
  }
}

---

### Get Topics by Subject
GET /api/topics?subjectId=1

Response:
[
  { "id": number, "name": "string" }
]

---

## ❓ QUESTIONS

### Create Question (internal)
POST /api/questions

Request:
{
  "topicId": number,
  "questionText": "string",
  "optionA": "string",
  "optionB": "string",
  "optionC": "string",
  "optionD": "string",
  "correctOption": "A | B | C | D",
  "explanation": "string",
  "referenceBook": "string"
}

Response:
{
  "message": "Question created successfully",
  "questionId": number
}

---

### Get Questions by Topic
GET /api/questions/topic/:topicId

Response:
[
  {
    "id": number,
    "questionText": "string",
    "optionA": "string",
    "optionB": "string",
    "optionC": "string",
    "optionD": "string"
  }
]

---

## 📝 ATTEMPTS

### Attempt Question
POST /api/attempts

Request:
{
  "questionId": number,
  "selectedOption": "A | B | C | D"
}

Response:
{
  "attemptId": number,
  "isCorrect": boolean,
  "correctOption": "string",
  "explanation": "string"
}

---

## 🔥 LEADERBOARD

### Get Leaderboard
GET /api/leaderboard

Response:
[
  {
    "userId": "uuid",
    "name": "string",
    "currentStreak": number,
    "totalAttempts": number,
    "correctAnswers": number
  }
]

---

## 📊 ANALYTICS

### My Analytics
GET /api/analytics/me

Response:
{
  "totalAttempts": number,
  "correctAnswers": number,
  "wrongAnswers": number,
  "accuracy": number,
  "topicPerformance": [
    {
      "topic": "string",
      "total": number,
      "correct": number,
      "accuracy": number
    }
  ]
}

---

## 📌 NOTES

- All correctness logic is handled server-side
- Frontend never sends correct answers
- API v1 is frozen
- New changes must go to v2