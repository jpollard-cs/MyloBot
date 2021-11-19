"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomMyloProcessingStatus = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var CustomMyloProcessingStatus;
(function (CustomMyloProcessingStatus) {
    CustomMyloProcessingStatus["NOT_PROCESSED"] = "NOT_PROCESSED";
    CustomMyloProcessingStatus["PROCESSING"] = "PROCESSING";
    CustomMyloProcessingStatus["ART_COMPLETE"] = "ART_COMPLETE";
    CustomMyloProcessingStatus["COMPLETE"] = "COMPLETE";
})(CustomMyloProcessingStatus = exports.CustomMyloProcessingStatus || (exports.CustomMyloProcessingStatus = {}));
const schema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model('custom-mylo', schema);
//# sourceMappingURL=custom-mylo.model.js.map