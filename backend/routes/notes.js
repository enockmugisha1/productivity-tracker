const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

// ✅ Create Note
router.post('/', auth, async (req, res) => {
  const { content, goal, habit } = req.body;
  const note = await Note.create({ user: req.user, content, goal, habit });
  res.status(201).json(note);
});

// ✅ Get All Notes
router.get('/', auth, async (req, res) => {
  const notes = await Note.find({ user: req.user });
  res.json(notes);
});

// ✅ Update Note
router.put('/:id', auth, async (req, res) => {
  const note = await Note.findOneAndUpdate({ _id: req.params.id, user: req.user }, req.body, { new: true });
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json(note);
});

// ✅ Delete Note
router.delete('/:id', auth, async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user });
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json({ message: 'Note deleted' });
});

module.exports = router;
