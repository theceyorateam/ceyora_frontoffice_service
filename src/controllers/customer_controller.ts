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
                new ErrorResponse(StatusCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST)
            );
            return;
        }

        res.status(StatusCodes.CREATED).json(
            new SuccessResponse(ResponseMessages.CUSTOMER_CREATION_SUCCESS, result.data)
        );
    } catch (err: any) {
        // PostgreSQL unique violation code
        if (err.code === '23505') {
            // Check which field caused the issue
            const detail: string = err.detail || '';

            let message = 'Duplicate entry';

            if (detail.includes('username')) {
                message = 'Username already exists. Please choose a different one.';
            } else if (detail.includes('email')) {
                message = 'Email already registered. Try logging in or use another.';
            } else if (detail.includes('phone')) {
                message = 'Phone number already exists in our system.';
            }

            res.status(StatusCodes.BAD_REQUEST).json(
                new ErrorResponse(StatusCodes.BAD_REQUEST, message)
            );
            return;
        }

        console.error('Unhandled error in createUser:', err);
        res.status(ErrorCodes.SERVER_ERROR).json(
            new ErrorResponse(ErrorCodes.SERVER_ERROR, ErrorMessages.SERVER_ERROR)
        );
    }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const customerId = parseInt(req.query.customerId as string, 10);
        const result = await userModel.get({ customerId });

        if (result.error) {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                errorCode: StatusCodes.NOT_FOUND,
                message: result.error,
                data: null
            });
            return;
        }

        res.status(StatusCodes.OK).json(
            new SuccessResponse(ResponseMessages.CUSTOMER_RETRIEVAL_SUCCESS, result.data)
        );
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR)
        );
    }
};
