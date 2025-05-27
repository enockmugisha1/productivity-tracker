const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  goal: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
  habit: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit' },
});
module.exports = mongoose.model('Note', NoteSchema);
