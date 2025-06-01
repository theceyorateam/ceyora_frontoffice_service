import { RequestHandler } from 'express';
import * as regionModel from '../models/region_model';
import ErrorResponse from '../utils/responses/ErrorResponse';
import SuccessResponse from '../utils/responses/SuccessResponse';
import StatusCodes from '../utils/statusCodes/StatusCodes';
import ErrorCodes from '../utils/statusCodes/ErrorCodes';
import ResponseMessages from '../utils/ResponseMessages/ResponseMessages';
import ErrorMessages from '../utils/ResponseMessages/ErrorMessages';

export const createRegion: RequestHandler = async (req, res) => {
    try {
        const result = await regionModel.create(req.body);

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

export const getRegion: RequestHandler = async (req, res) => {
    try {
        const regionIdStr = req.query.regionId as string | undefined;

        if (!regionIdStr) {
            res.status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(StatusCodes.BAD_REQUEST, 'Region ID is required'));
            return;
        }

        const regionId = Number(regionIdStr);
        if (isNaN(regionId)) {
            res.status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(StatusCodes.BAD_REQUEST, 'Region ID must be a number'));
            return;
        }

        const result = await regionModel.get({ regionId });

        if (result.error) {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                errorCode: 1002,
                message: result.error,
                data: null,
            });
            return;
        }

        res.status(StatusCodes.OK)
            .json(new SuccessResponse(ResponseMessages.REGION_RETRIEVAL_SUCCESS, result.data));
    } catch (err: any) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_ERROR)
            .json(new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR));
    }
};
