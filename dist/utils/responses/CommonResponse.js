"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// utils/CommonResponse.ts
class CommonResponse {
    constructor(success, errorCode, message, data = null) {
        this.success = success;
        this.errorCode = errorCode;
        this.message = message;
        this.data = data;
    }
}
exports.default = CommonResponse;
