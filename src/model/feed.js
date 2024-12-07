import mongoose from 'mongoose';

const FeedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Feed', FeedSchema);
