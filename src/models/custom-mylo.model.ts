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
  token_id: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  user_tag: {
    type: String,
    required: true
  },
  roleNames: {
    type: String,
    required: true
  },
  customizations: {
    type: String,
    required: true
  },
  imageUrls: {
    type: [String],
    required: true,
  },
  updatedDateTimeUtc: {
    type: String,
    required: true,
  },
});

export default mongoose.model('custom-mylo', schema);