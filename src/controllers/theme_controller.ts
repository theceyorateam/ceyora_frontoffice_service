// src/controllers/theme_controller.ts
import { RequestHandler } from 'express';
import * as themeModel from '../models/theme_model';
import ErrorResponse from '../utils/responses/ErrorResponse';
import SuccessResponse from '../utils/responses/SuccessResponse';
import StatusCodes from '../utils/statusCodes/StatusCodes';
import ResponseMessages from '../utils/ResponseMessages/ResponseMessages';

export const createTheme: RequestHandler = async (req, res) => {
    try {
        console.log('[createTheme] Incoming request body:', req.body);

        const themeData = req.body;
        const result = await themeModel.create(themeData);

        if (result.error) {
            console.error('[createTheme] Error creating theme:', result.error);
            return res
                .status(StatusCodes.INTERNAL_ERROR)
                .json(new ErrorResponse(StatusCodes.INTERNAL_ERROR, result.error));
        }

        res.status(StatusCodes.CREATED).json(
            new SuccessResponse(ResponseMessages.THEME_CREATION_SUCCESS, result.data)
        );
    } catch (err: any) {
        console.error('[createTheme] Unhandled error:', err);
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, 'Server error')
        );
    }
};

export const getTheme: RequestHandler = async (req, res) => {
    try {
        const themeId = Number(req.params.id);
        if (isNaN(themeId)) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(StatusCodes.BAD_REQUEST, 'Invalid theme ID'));
        }

        const result = await themeModel.get({ themeId });

        if (result.error) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json(new ErrorResponse(StatusCodes.NOT_FOUND, result.error));
        }

        res.status(StatusCodes.OK).json(
            new SuccessResponse(ResponseMessages.THEME_RETRIEVAL_SUCCESS, result.data)
        );
    } catch (err: any) {
        console.error('[getTheme] Unhandled error:', err);
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, 'Server error')
        );
    }
};

export const getAllThemes: RequestHandler = async (req, res) => {
    try {
        const result = await themeModel.getAllThemes();

        if (result.error) {
            return res
                .status(StatusCodes.INTERNAL_ERROR)
                .json(new ErrorResponse(StatusCodes.INTERNAL_ERROR, result.error));
        }

        res.status(StatusCodes.OK).json(
            new SuccessResponse(ResponseMessages.THEME_RETRIEVAL_SUCCESS, result.data)
        );
    } catch (err: any) {
        console.error('[getAllThemes] Unhandled error:', err);
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, 'Server error')
        );
    }
};
