"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// utils/SuccessResponse.ts
const CommonResponse_1 = __importDefault(require("./CommonResponse"));
const StatusCodes_1 = __importDefault(require("../statusCodes/StatusCodes"));
class SuccessResponse extends CommonResponse_1.default {
    constructor(message = 'Request successful', data = null) {
        super(true, StatusCodes_1.default.SUCCESS, message, data);
    }
}
exports.default = SuccessResponse;
