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
exports.getVendor = exports.createVendor = void 0;
const vendorModel = __importStar(require("../models/vendor_model"));
const ErrorResponse_1 = __importDefault(require("../utils/responses/ErrorResponse"));
const SuccessResponse_1 = __importDefault(require("../utils/responses/SuccessResponse"));
const StatusCodes_1 = __importDefault(require("../utils/statusCodes/StatusCodes"));
const ResponseMessages_1 = __importDefault(require("../utils/ResponseMessages/ResponseMessages"));
const ErrorMessages_1 = __importDefault(require("../utils/ResponseMessages/ErrorMessages"));
const createVendor = async (req, res) => {
    try {
        const vendorData = req.body;
        const result = await vendorModel.create(vendorData);
        if (result.error) {
            res.status(StatusCodes_1.default.BAD_REQUEST)
                .json(new ErrorResponse_1.default(StatusCodes_1.default.BAD_REQUEST, ErrorMessages_1.default.BAD_REQUEST));
            return;
        }
        res.status(StatusCodes_1.default.CREATED)
            .json(new SuccessResponse_1.default(ResponseMessages_1.default.VENDOR_CREATION_SUCCESS, result.data));
    }
    catch (err) {
        console.error(err);
        res.status(StatusCodes_1.default.INTERNAL_ERROR)
            .json(new ErrorResponse_1.default(StatusCodes_1.default.INTERNAL_ERROR, ErrorMessages_1.default.SERVER_ERROR));
    }
};
exports.createVendor = createVendor;
const getVendor = async (req, res) => {
    try {
        const vendorId = Number(req.query.vendorId);
        if (isNaN(vendorId)) {
            res.status(StatusCodes_1.default.BAD_REQUEST)
                .json(new ErrorResponse_1.default(StatusCodes_1.default.BAD_REQUEST, 'Invalid vendorId'));
            return;
        }
        const result = await vendorModel.get({ vendorId });
        if (result.error) {
            res.status(StatusCodes_1.default.NOT_FOUND).json({
                success: false,
                errorCode: 1002,
                message: result.error,
                data: null
            });
            return;
        }
        res.status(StatusCodes_1.default.OK)
            .json(new SuccessResponse_1.default(ResponseMessages_1.default.VENDOR_RETRIEVAL_SUCCESS, result.data));
    }
    catch (err) {
        console.error(err);
        res.status(StatusCodes_1.default.INTERNAL_ERROR)
            .json(new ErrorResponse_1.default(StatusCodes_1.default.INTERNAL_ERROR, ErrorMessages_1.default.SERVER_ERROR));
    }
};
exports.getVendor = getVendor;
