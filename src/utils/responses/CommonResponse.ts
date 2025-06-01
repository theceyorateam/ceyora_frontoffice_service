// utils/CommonResponse.ts
class CommonResponse<T = any> {
    success: boolean;
    errorCode: number;
    message: string;
    data: T | null;

    constructor(success: boolean, errorCode: number, message: string, data: T | null = null) {
        this.success = success;
        this.errorCode = errorCode;
        this.message = message;
        this.data = data;
    }
}

export default CommonResponse;
