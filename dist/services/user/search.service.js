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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsersService = void 0;
const userCache_1 = require("../../cache/userCache");
const models_1 = require("../../models");
const userRepository_1 = require("../../Repository/userRepository");
const paginate_1 = require("../../utils/paginate");
const searchUsersService = (keyword, page, limit, sort) => __awaiter(void 0, void 0, void 0, function* () {
    // ⚡️ Redis cache
    const cached = yield (0, userCache_1.getCachedSearchUser)(keyword, page, limit, sort);
    if (cached)
        return cached;
    const { filter, sortObj } = (0, userRepository_1.searchUsersQuery)(keyword, sort);
    const result = yield (0, paginate_1.paginate)(models_1.User, {
        page: parseInt(page),
        limit: parseInt(limit),
        filter,
        query: filter,
        sort: sortObj,
    });
    yield (0, userCache_1.setCachedSearchUser)(keyword, page, limit, sort, result);
    return result;
});
exports.searchUsersService = searchUsersService;
