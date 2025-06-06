const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const auth = require('../middleware/auth'); // Corrected path and variable name

// Check for OpenAI API Key during initialization
if (!process.env.OPENAI_API_KEY) {
  console.error('🔴 FATAL ERROR: OPENAI_API_KEY is not set in the environment variables.');
  console.error('Please add OPENAI_API_KEY to your backend/.env file.');
  // Forcing a crash if the key is essential for the module to load, 
  // or you could allow the app to start but AI features would fail.
  // Given it crashes now, making it explicit is better.
  throw new Error('OPENAI_API_KEY is missing. AI features cannot be initialized.'); 
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @route   POST /api/ai/ask
// @desc    Send a prompt to OpenAI and get a response
// @access  Private
router.post('/ask', auth, async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Or your preferred model
      messages: [{ role: 'user', content: prompt }],
    });

    if (completion.choices && completion.choices.length > 0 && completion.choices[0].message) {
      res.json({ response: completion.choices[0].message.content });
    } else {
      res.status(500).json({ message: 'Failed to get a valid response from AI' });
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    if (error instanceof OpenAI.APIError) {
      res.status(error.status || 500).json({ message: error.message || 'Error communicating with AI service' });
    } else {
      res.status(500).json({ message: 'Internal server error while processing AI request' });
    }
  }
});

module.exports = router; 