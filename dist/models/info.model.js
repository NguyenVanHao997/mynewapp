"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const infoSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    gender: { type: String },
    address: { type: String },
    birthday: { type: Date },
}, { timestamps: true });
const Info = mongoose_1.default.model("Info", infoSchema);
exports.default = Info;
