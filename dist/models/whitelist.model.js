"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    guild_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
});
exports.default = mongoose_1.default.model('whitelist', schema);
//# sourceMappingURL=whitelist.model.js.map