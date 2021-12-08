import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  guild_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  reported_by_user_id: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image_url: {
    type: String,
    required: false
  },
  submitted_date_time_utc: {
    type: String,
    required: true,
  },
});

export default mongoose.model('report', schema);