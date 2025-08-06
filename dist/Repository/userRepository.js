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
exports.UserRepository = exports.searchUsersQuery = void 0;
const models_1 = require("../models");
const searchUsersQuery = (keyword, sort) => {
    const filter = {
        $or: [
            { name: { $regex: keyword, $options: "i" } },
            { email: { $regex: keyword, $options: "i" } },
        ],
    };
    const sortObj = {};
    if (sort.startsWith("-")) {
        sortObj[sort.slice(1)] = -1;
    }
    else {
        sortObj[sort] = 1;
    }
    return { filter, sortObj };
};
exports.searchUsersQuery = searchUsersQuery;
exports.UserRepository = {
    findByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        return yield models_1.User.findOne({ email });
    }),
    createUser: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        return yield models_1.User.create(userData);
    }),
};
