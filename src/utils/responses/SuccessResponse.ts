// utils/SuccessResponse.ts
import CommonResponse from './CommonResponse';
import StatusCodes from '../statusCodes/StatusCodes';

class SuccessResponse<T = any> extends CommonResponse<T> {
    constructor(message = 'Request successful', data: T | null = null) {
        super(true, StatusCodes.SUCCESS, message, data);
    }
}

export default SuccessResponse;
