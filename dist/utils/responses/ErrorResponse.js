"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// utils/ErrorResponse.ts
const CommonResponse_1 = __importDefault(require("./CommonResponse"));
class ErrorResponse extends CommonResponse_1.default {
    constructor(code, message, data = null) {
        super(false, code, message, data);
    }
}
exports.default = ErrorResponse;
