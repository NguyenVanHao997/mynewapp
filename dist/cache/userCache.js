"use strict";
// src/cache/userCache.ts
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
exports.clearSearchUserCache = exports.setCachedSearchUser = exports.getCachedSearchUser = void 0;
const redisClient_1 = __importDefault(require("../redisClient"));
const buildSearchUserKey = (keyword, page, limit, sort) => {
    return `users:search:${keyword}:page:${page}:limit:${limit}:sort:${sort}`;
};
const getCachedSearchUser = (keyword, page, limit, sort) => __awaiter(void 0, void 0, void 0, function* () {
    const key = buildSearchUserKey(keyword, page, limit, sort);
    const cached = yield redisClient_1.default.get(key);
    return cached ? JSON.parse(cached) : null;
});
exports.getCachedSearchUser = getCachedSearchUser;
const setCachedSearchUser = (keyword, page, limit, sort, data) => __awaiter(void 0, void 0, void 0, function* () {
    const key = buildSearchUserKey(keyword, page, limit, sort);
    yield redisClient_1.default.set(key, JSON.stringify(data), { EX: 300 }); // TTL: 60s
});
exports.setCachedSearchUser = setCachedSearchUser;
const clearSearchUserCache = () => __awaiter(void 0, void 0, void 0, function* () {
    const keys = yield redisClient_1.default.keys("users:search:*");
    if (keys.length > 0) {
        yield redisClient_1.default.del(keys);
        console.log("🧹 Search user cache cleared");
    }
});
exports.clearSearchUserCache = clearSearchUserCache;
