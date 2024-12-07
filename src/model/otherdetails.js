import mongoose from 'mongoose';

const OtherDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  liveLocation: { type: String, required: true },
  posts: [
    {
      title: { type: String, required: true },
      time: { type: Date, default: Date.now },
      description: { type: String, required: true },
    }
  ],
}, { timestamps: true });

export default mongoose.model('OtherDetails', OtherDetailsSchema);
