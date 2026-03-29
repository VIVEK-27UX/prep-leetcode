const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  topic: { type: String, default: 'General' }, // New field for filtering
  level: { type: Number, default: 0 },
  nextRevision: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);