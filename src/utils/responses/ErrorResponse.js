// utils/ErrorResponse.js
const CommonResponse = require('./CommonResponse');

class ErrorResponse extends CommonResponse {
    constructor(code, message, data = null) {
        super(false, code, message, data);
    }
}

module.exports = ErrorResponse;
