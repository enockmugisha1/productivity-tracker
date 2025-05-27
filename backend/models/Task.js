const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  goal: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
  title: String,
  dueDate: Date,
  completed: { type: Boolean, default: false },
});
module.exports = mongoose.model('Task', TaskSchema);
