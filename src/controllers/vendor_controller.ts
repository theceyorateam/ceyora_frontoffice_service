import { RequestHandler } from 'express';
import * as vendorModel from '../models/vendor_model';
import ErrorResponse from "../utils/responses/ErrorResponse";
import SuccessResponse from "../utils/responses/SuccessResponse";
import StatusCodes from '../utils/statusCodes/StatusCodes';
import ErrorCodes from '../utils/statusCodes/ErrorCodes';
import ResponseMessages from '../utils/ResponseMessages/ResponseMessages';
import ErrorMessages from '../utils/ResponseMessages/ErrorMessages';
import { Vendor } from '../types/Vendor';

export const createVendor: RequestHandler = async (req, res) => {
    try {
        const vendorData: Vendor = req.body;

        const result = await vendorModel.create(vendorData);

        if (result.error) {
            res.status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(StatusCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST));
            return;
        }

        res.status(StatusCodes.CREATED)
            .json(new SuccessResponse(ResponseMessages.VENDOR_CREATION_SUCCESS, result.data));
    } catch (err: any) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_ERROR)
            .json(new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR));
    }
};

export const getVendor: RequestHandler = async (req, res) => {
    try {
        const vendorId = Number(req.query.vendorId);

        if (isNaN(vendorId)) {
            res.status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(StatusCodes.BAD_REQUEST, 'Invalid vendorId'));
            return;
        }

        const result = await vendorModel.get({ vendorId });

        if (result.error) {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                errorCode: 1002,
                message: result.error,
                data: null
            });
            return;
        }

        res.status(StatusCodes.OK)
            .json(new SuccessResponse(ResponseMessages.VENDOR_RETRIEVAL_SUCCESS, result.data));
    } catch (err: any) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_ERROR)
            .json(new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR));
    }
};
