const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');
require('dotenv').config();

dns.setServers(['8.8.8.8', '8.8.4.4']); // Bypass restricted network DNS

const app = express();
const PORT = process.env.PORT || 5000;
const Question = require('./models/Question');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected! 🚀"))
  .catch((err) => console.log(err));

// --- UPDATED DAILY PLAN ROUTE ---
app.get('/api/daily-plan', async (req, res) => {
  try {
    const { topic } = req.query; 
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    // 1. Revisions: Show all due tasks regardless of topic
    const revisionTasks = await Question.find({ 
      nextRevision: { $lte: today },
      level: { $gt: 0 } 
    });

    // 2. New Challenges: Filter by topic if selected
    let newQuery = { level: 0 };
    if (topic && topic !== 'All') {
      newQuery.topic = topic;
    }
    const newChallenges = await Question.find(newQuery).limit(2);

    res.json({ revisionTasks, newChallenges });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Progress (PUT)
app.put('/api/questions/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    const intervals = [1, 7, 30, 180]; 
    const currentLevel = question.level || 0;
    const newLevel = Math.min(currentLevel + 1, 4);
    const daysToAdd = intervals[newLevel - 1];

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + daysToAdd);

    question.level = newLevel;
    question.nextRevision = nextDate;
    await question.save();
    
    res.json({ message: "Level Up!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));