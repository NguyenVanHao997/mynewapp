"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const interfaces_1 = require("../interfaces");
// Kết nối database trước
mongoose_1.default.connect("mongodb://localhost:27017/test_db");
const seedInfos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.find();
        for (const user of users) {
            const existingInfo = yield interfaces_1.Info.findOne({ email: user.email });
            if (!existingInfo) {
                yield interfaces_1.Info.create({
                    email: user.email,
                    gender: "Male",
                    address: "Not provided",
                    birthday: new Date("2000-01-01"), // hoặc null tùy bạn
                });
                console.log(`Info created for ${user.email}`);
            }
            else {
                console.log(`Info already exists for ${user.email}`);
            }
        }
        console.log("✅ Seed completed!");
    }
    catch (error) {
        console.error("❌ Seed error:", error);
    }
    finally {
        mongoose_1.default.disconnect();
    }
});
seedInfos();
