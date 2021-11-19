import mongoose from 'mongoose';

export enum CustomMyloProcessingStatus {
  NOT_PROCESSED = 'NOT_PROCESSED',
  PROCESSING = 'PROCESSING',
  ART_COMPLETE = 'ART_COMPLETE',
  COMPLETE = 'COMPLETE'
}

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
  processing_status: {
    type: String,
    required: true,
    default: CustomMyloProcessingStatus.NOT_PROCESSED
  }
});

export default mongoose.model('custom-mylo', schema);