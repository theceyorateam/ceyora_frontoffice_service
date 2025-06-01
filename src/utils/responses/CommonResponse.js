// utils/BaseResponse.js
class CommonResponse {
    constructor(success, errorCode, message, data = null) {
        this.success = success;
        this.errorCode = errorCode;
        this.message = message;
        this.data = data;
    }
}

module.exports = CommonResponse;
