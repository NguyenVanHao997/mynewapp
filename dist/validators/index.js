"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.searchSchema = void 0;
const register_schema_1 = __importDefault(require("./register.schema"));
exports.registerSchema = register_schema_1.default;
const search_validator_1 = __importDefault(require("./search.validator"));
exports.searchSchema = search_validator_1.default;
