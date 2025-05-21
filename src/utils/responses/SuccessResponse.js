// utils/SuccessResponse.js
const CommonResponse = require('./CommonResponse');
const StatusCodes = require('../statusCodes/statusCodes')
class SuccessResponse extends CommonResponse {
    constructor(message = 'Request successful', data = null) {
        super(true, StatusCodes.SUCCESS, message, data);
    }
}

module.exports = SuccessResponse;
