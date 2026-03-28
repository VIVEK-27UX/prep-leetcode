const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // This forces the app to use Google DNS
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// THIS IS THE CRITICAL PART:
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected successfully! 🎉"))
  .catch((err) => console.log("Database connection error: ", err));

app.get('/', (req, res) => {
  res.send('Prep Leetcode API is running and DB is connected!');
});
const Question = require('./models/Question');

// API to add a new solved question
app.post('/api/questions', async (req, res) => {
  try {
    const { title, url, difficulty } = req.body;

    // Logic: Set first revision to 24 hours from now
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1); 

    const newQuestion = new Question({
      title,
      url,
      difficulty,
      nextRevision: nextDate
    });

    await newQuestion.save();
    res.status(201).json({ message: "Question saved! See you in 24 hours. ⏳" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to get today's tasks
app.get('/api/today', async (req, res) => {
  try {
    const today = new Date();
    // Find questions where nextRevision is less than or equal to right now
    const tasks = await Question.find({ nextRevision: { $lte: today } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
// Route: Get Today's Specific Plan (Revision + 2 New)
app.get('/api/daily-plan', async (req, res) => {
  try {
    const today = new Date();
    
    // 1. Get all questions due for revision
    const revisionTasks = await Question.find({ 
      nextRevision: { $lte: today },
      isNew: false 
    });

    // 2. Get 2 "New" questions that haven't been started yet
    // (We'll mark them as 'isNew: true' in the database initially)
    const newChallenges = await Question.find({ isNew: true }).limit(2);

    res.json({
      revisionTasks,
      newChallenges
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});