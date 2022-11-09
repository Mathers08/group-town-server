import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true, },
  content: { type: String, required: true, },
  isCompleted: { type: Boolean, required: true, },
  createdAt: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true
});

export default mongoose.model('Todo', TodoSchema);
