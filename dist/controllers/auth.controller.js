"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
// controllers/auth.controller.ts
const yup = __importStar(require("yup"));
const auth_1 = require("../services/auth");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const result = yield (0, auth_1.registerUser)({ name, email, password });
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }
        res
            .status(201)
            .json({ message: "Đăng ký thành công", token: result.token });
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({
                errors: error.inner.map((e) => ({
                    field: e.path,
                    message: e.message,
                })),
            });
        }
        console.error("Lỗi đăng ký:", error);
        res.status(500).json({ error: "Lỗi server" });
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield (0, auth_1.loginUser)(email, password);
        if (!result.success) {
            return res.status(401).json({ message: result.message });
        }
        return res.json({ token: result.token });
    }
    catch (error) {
        console.error("Lỗi đăng nhập:", error);
        next(error);
        // return res.status(500).json({ message: "Lỗi server" });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return res.sendStatus(400);
        const token = authHeader.split(" ")[1];
        yield (0, auth_1.logoutUser)(token);
        return res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        console.error("Lỗi logout:", error);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.logout = logout;
