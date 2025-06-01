"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.createUser = void 0;
const userModel = __importStar(require("../models/customer_model"));
const ErrorResponse_1 = __importDefault(require("../utils/responses/ErrorResponse"));
const SuccessResponse_1 = __importDefault(require("../utils/responses/SuccessResponse"));
const StatusCodes_1 = __importDefault(require("../utils/statusCodes/StatusCodes"));
const ErrorCodes_1 = __importDefault(require("../utils/statusCodes/ErrorCodes"));
const ResponseMessages_1 = __importDefault(require("../utils/ResponseMessages/ResponseMessages"));
const ErrorMessages_1 = __importDefault(require("../utils/ResponseMessages/ErrorMessages"));
const createUser = async (req, res) => {
    try {
        const result = await userModel.create(req.body);
        if (result.error) {
            res.status(StatusCodes_1.default.BAD_REQUEST).json(new ErrorResponse_1.default(StatusCodes_1.default.BAD_REQUEST, ErrorMessages_1.default.BAD_REQUEST));
            return;
        }
        res.status(StatusCodes_1.default.CREATED).json(new SuccessResponse_1.default(ResponseMessages_1.default.CUSTOMER_CREATION_SUCCESS, result.data));
    }
    catch (err) {
        // PostgreSQL unique violation code
        if (err.code === '23505') {
            // Check which field caused the issue
            const detail = err.detail || '';
            let message = 'Duplicate entry';
            if (detail.includes('username')) {
                message = 'Username already exists. Please choose a different one.';
            }
            else if (detail.includes('email')) {
                message = 'Email already registered. Try logging in or use another.';
            }
            else if (detail.includes('phone')) {
                message = 'Phone number already exists in our system.';
            }
            res.status(StatusCodes_1.default.BAD_REQUEST).json(new ErrorResponse_1.default(StatusCodes_1.default.BAD_REQUEST, message));
            return;
        }
        console.error('Unhandled error in createUser:', err);
        res.status(ErrorCodes_1.default.SERVER_ERROR).json(new ErrorResponse_1.default(ErrorCodes_1.default.SERVER_ERROR, ErrorMessages_1.default.SERVER_ERROR));
    }
};
exports.createUser = createUser;
const getUser = async (req, res) => {
    try {
        const customerId = parseInt(req.query.customerId, 10);
        const result = await userModel.get({ customerId });
        if (result.error) {
            res.status(StatusCodes_1.default.NOT_FOUND).json({
                success: false,
                errorCode: StatusCodes_1.default.NOT_FOUND,
                message: result.error,
                data: null
            });
            return;
        }
        res.status(StatusCodes_1.default.OK).json(new SuccessResponse_1.default(ResponseMessages_1.default.CUSTOMER_RETRIEVAL_SUCCESS, result.data));
    }
    catch (err) {
        console.error(err);
        res.status(StatusCodes_1.default.INTERNAL_ERROR).json(new ErrorResponse_1.default(StatusCodes_1.default.INTERNAL_ERROR, ErrorMessages_1.default.SERVER_ERROR));
    }
};
exports.getUser = getUser;
