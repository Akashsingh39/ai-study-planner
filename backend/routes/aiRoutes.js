const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/ai/suggest
// Rule-based dummy AI route. Later you can connect Gemini/OpenAI using API keys.
router.post('/suggest', protect, async (req, res) => {
  try {
    const { examDate, subjects, weakTopics } = req.body;

    if (!examDate || !subjects || !weakTopics) {
      return res.status(400).json({ message: 'Exam date, subjects and weak topics are required' });
    }

    const today = new Date();
    const exam = new Date(examDate);
    const daysLeft = Math.max(1, Math.ceil((exam - today) / (1000 * 60 * 60 * 24)));

    const subjectList = subjects.split(',').map((s) => s.trim()).filter(Boolean);
    const weakTopicList = weakTopics.split(',').map((t) => t.trim()).filter(Boolean);

    const plan = `You have around ${daysLeft} day(s) left. Focus 60% time on weak topics: ${weakTopicList.join(', ')}. Study these subjects daily: ${subjectList.join(', ')}. Use this routine: 2 focused study sessions, 1 revision session, and 30 minutes of practice questions every day. In the last 2 days, revise notes and solve previous questions instead of starting new topics.`;

    // Future Gemini/OpenAI integration idea:
    // const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
    // Call AI provider here and return generated response.

    res.json({ suggestion: plan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
