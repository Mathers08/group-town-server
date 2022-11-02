import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true, },
  content: { type: String, required: true, },
  importance: { type: String, required: true, },
  createdAt: String,
  viewsCount: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true
});

export default mongoose.model('News', NewsSchema);
