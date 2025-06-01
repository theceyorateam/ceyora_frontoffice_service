import { RequestHandler } from 'express';
import * as packageModel from '../models/package_model';
import ErrorResponse from '../utils/responses/ErrorResponse';
import SuccessResponse from '../utils/responses/SuccessResponse';
import StatusCodes from '../utils/statusCodes/StatusCodes';
import ErrorMessages from '../utils/ResponseMessages/ErrorMessages';
import ResponseMessages from '../utils/ResponseMessages/ResponseMessages';

export const createPackage: RequestHandler = async (req, res) => {
    try {
        const result = await packageModel.create(req.body);

        if (result.error) {
            res.status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(StatusCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST));
            return;
        }

        res.status(StatusCodes.CREATED)
            .json(new SuccessResponse(ResponseMessages.PACKAGE_CREATION_SUCCESS, result.data));
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_ERROR)
            .json(new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR));
    }
};

export const getPackage: RequestHandler = async (req, res) => {
    try {
        const packageIdNum = Number(req.query.packageId);

        if (isNaN(packageIdNum)) {
            res.status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(StatusCodes.BAD_REQUEST, 'Invalid package ID'));
            return;
        }

        const result = await packageModel.get({ packageId: packageIdNum });

        if (result.error) {
            res.status(StatusCodes.NOT_FOUND)
                .json({
                    success: false,
                    errorCode: StatusCodes.NOT_FOUND,
                    message: result.error,
                    data: null,
                });
            return;
        }

        res.status(StatusCodes.OK)
            .json(new SuccessResponse(ResponseMessages.PACKAGE_RETRIEVAL_SUCCESS, result.data));
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_ERROR)
            .json(new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR));
    }
};
