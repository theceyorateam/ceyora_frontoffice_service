import { Request, Response } from 'express';
import * as userModel from '../models/customer_model';
import ErrorResponse from '../utils/responses/ErrorResponse';
import SuccessResponse from '../utils/responses/SuccessResponse';
import StatusCodes from '../utils/statusCodes/StatusCodes';
import ErrorCodes from '../utils/statusCodes/ErrorCodes';
import ResponseMessages from '../utils/ResponseMessages/ResponseMessages';
import ErrorMessages from '../utils/ResponseMessages/ErrorMessages';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await userModel.create(req.body);

        if (result.error) {
            res.status(StatusCodes.BAD_REQUEST).json(
                new ErrorResponse(StatusCodes.BAD_REQUEST, result.error)
            );
            return;
        }

        res.status(StatusCodes.CREATED).json(
            new SuccessResponse(ResponseMessages.CUSTOMER_CREATION_SUCCESS, result.data)
        );
    } catch (err: any) {
        console.error('Unhandled error in createUser:', err);

        res.status(ErrorCodes.SERVER_ERROR).json(
            new ErrorResponse(ErrorCodes.SERVER_ERROR, ErrorMessages.SERVER_ERROR)
        );
    }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const customerId = parseInt(req.query.customerId as string, 10);

        if (isNaN(customerId)) {
            res.status(StatusCodes.BAD_REQUEST).json(
                new ErrorResponse(StatusCodes.BAD_REQUEST, 'Invalid customerId')
            );
            return;
        }

        const result = await userModel.get({ customerId });

        if (result.error) {
            res.status(StatusCodes.NOT_FOUND).json(
                new ErrorResponse(StatusCodes.NOT_FOUND, result.error)
            );
            return;
        }

        res.status(StatusCodes.OK).json(
            new SuccessResponse(ResponseMessages.CUSTOMER_RETRIEVAL_SUCCESS, result.data)
        );
    } catch (err: any) {
        console.error('Unhandled error in getUser:', err);
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR)
        );
    }
};
