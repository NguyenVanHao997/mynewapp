"use strict";
// utils/paginate.ts
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
exports.paginate = void 0;
const paginate = (model_1, _a) => __awaiter(void 0, [model_1, _a], void 0, function* (model, { page = 1, limit = 5, filter = {}, sort = {}, query = {} }) {
    const skip = (page - 1) * limit;
    const [data, total] = yield Promise.all([
        model.find(filter).skip(skip).limit(limit),
        model.countDocuments(filter),
    ]);
    return {
        data,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
    };
});
exports.paginate = paginate;
