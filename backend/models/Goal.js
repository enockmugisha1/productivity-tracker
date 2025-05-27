const mongoose = require('mongoose');
const GoalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  dueDate: Date,
  progress: { type: Number, default: 0 }
});
module.exports = mongoose.model('Goal', GoalSchema);
