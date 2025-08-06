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
exports.getAllUsersService = void 0;
const models_1 = require("../../models");
const redisClient_1 = __importDefault(require("../../redisClient"));
const paginate_1 = require("../../utils/paginate");
const getAllUsersService = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `users:page:${page}:limit:${limit}`;
    const cachedData = yield redisClient_1.default.get(cacheKey);
    if (cachedData) {
        console.log("⚡ From Redis");
        return JSON.parse(cachedData);
    }
    const result = yield (0, paginate_1.paginate)(models_1.User, {
        page,
        limit,
    });
    yield redisClient_1.default.set(cacheKey, JSON.stringify(result), { EX: 300 });
    return result;
});
exports.getAllUsersService = getAllUsersService;
