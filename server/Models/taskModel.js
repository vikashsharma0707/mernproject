const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'completed'] },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Relationship with User
  //  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Relationship with User
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
