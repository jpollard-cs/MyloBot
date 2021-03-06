/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';

// eslint-disable-next-line no-shadow
export enum CustomMyloProcessingStatus {
  NOT_PROCESSED = 'NOT_PROCESSED',
  PROCESSING = 'PROCESSING',
  ART_COMPLETE = 'ART_COMPLETE',
  COMPLETE = 'COMPLETE'
}

const configSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

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
    required: true,
  },
  roleNames: {
    type: String,
    required: true,
  },
  customizations: {
    type: String,
    required: true,
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
    default: CustomMyloProcessingStatus.NOT_PROCESSED,
  },
  configuration: {
    type: [configSchema],
    required: true,
  },
  schema_version: {
    type: String,
    required: true,
    default: '2',
  },
});

export default mongoose.model('custom-mylo', schema);
