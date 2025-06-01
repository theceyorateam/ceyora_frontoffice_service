// utils/ErrorResponse.ts
import CommonResponse from './CommonResponse';

interface ErrorResponseParams {
    code: number;
    message: string;
    data?: any | null;
}

class ErrorResponse extends CommonResponse {
    constructor(code: number, message: string, data: any | null = null) {
        super(false, code, message, data);
    }
}

export default ErrorResponse;
