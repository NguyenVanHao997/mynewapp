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
exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepository_1 = require("../../Repository/userRepository");
const registerUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, email, password, }) {
    const existing = yield userRepository_1.UserRepository.findByEmail(email);
    if (existing) {
        return { success: false, message: "Email đã tồn tại" };
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = yield userRepository_1.UserRepository.createUser({
        name,
        email,
        password: hashedPassword,
        role: "CUSTOMER",
    });
    const token = jsonwebtoken_1.default.sign({
        userId: newUser._id,
        email: newUser.email,
        role: newUser.role,
    }, process.env.JWT_SECRET || "your_secret_key", { expiresIn: "1d" });
    return { success: true, token };
});
exports.registerUser = registerUser;
