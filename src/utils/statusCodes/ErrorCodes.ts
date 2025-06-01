// utils/statusCodes/ErrorCodes.ts
const ErrorCodes = {
    FAILED: -1001,
    EMAIL_ALREADY_EXIST: -1002,
    USER_NOT_FOUND: -1003,
    INVALID_PAYLOAD: -1004,
    SERVER_ERROR: 5000,
} as const;

export default ErrorCodes;
