import { RequestHandler } from 'express';
import * as themeModel from '../models/theme_model';
import ErrorResponse from '../utils/responses/ErrorResponse';
import SuccessResponse from '../utils/responses/SuccessResponse';
import StatusCodes from '../utils/statusCodes/StatusCodes';
import ErrorMessages from '../utils/ResponseMessages/ErrorMessages';
import ResponseMessages from '../utils/ResponseMessages/ResponseMessages';
import { Theme } from '../types/Theme';

export const createTheme: RequestHandler = async (req, res) => {
    try {
        const themeData: Theme = req.body;
        const result = await themeModel.create(themeData);

        if (result.error) {
            res.status(StatusCodes.BAD_REQUEST).json(
                new ErrorResponse(StatusCodes.BAD_REQUEST, result.error || ErrorMessages.BAD_REQUEST)
            );
            return;
        }

        res.status(StatusCodes.CREATED).json(
            new SuccessResponse(ResponseMessages.THEME_CREATION_SUCCESS, result.data)
        );
    } catch (err: any) {
        console.error('Unhandled error in createTheme:', err);
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR)
        );
    }
};

export const getTheme: RequestHandler = async (req, res) => {
    try {
        const themeId = Number(req.query.themeId);

        if (isNaN(themeId)) {
            res.status(StatusCodes.BAD_REQUEST).json(
                new ErrorResponse(StatusCodes.BAD_REQUEST, 'Invalid theme ID')
            );
            return;
        }

        const result = await themeModel.get({ themeId });

        if (result.error) {
            res.status(StatusCodes.NOT_FOUND).json(
                new ErrorResponse(StatusCodes.NOT_FOUND, result.error)
            );
            return;
        }

        res.status(StatusCodes.OK).json(
            new SuccessResponse(ResponseMessages.THEME_RETRIEVAL_SUCCESS, result.data)
        );
    } catch (err: any) {
        console.error('Unhandled error in getTheme:', err);
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR)
        );
    }
};

export const getAllThemes: RequestHandler = async (req, res) => {
    try {
        const result = await themeModel.getAllThemes();

        if (result.error) {
            res.status(StatusCodes.NOT_FOUND).json(
                new ErrorResponse(StatusCodes.NOT_FOUND, result.error)
            );
            return;
        }

        res.status(StatusCodes.OK).json(
            new SuccessResponse(ResponseMessages.THEME_RETRIEVAL_SUCCESS, result.data)
        );
    } catch (err: any) {
        console.error('Unhandled error in getAllThemes:', err);
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR)
        );
    }
};
