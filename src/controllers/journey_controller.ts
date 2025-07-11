import { RequestHandler } from 'express';
import * as journeyModel from '../models/journey_model';
import ErrorResponse from '../utils/responses/ErrorResponse';
import SuccessResponse from '../utils/responses/SuccessResponse';
import StatusCodes from '../utils/statusCodes/StatusCodes';
import ErrorMessages from '../utils/ResponseMessages/ErrorMessages';
import ResponseMessages from '../utils/ResponseMessages/ResponseMessages';
import { Journey } from '../types/Journey';

export const createJourney: RequestHandler = async (req, res) => {
    try {
        const journeyData: Journey = req.body;

        const result = await journeyModel.create(journeyData);

        if (result.error) {
            res.status(StatusCodes.BAD_REQUEST).json(
                new ErrorResponse(StatusCodes.BAD_REQUEST, result.error || ErrorMessages.BAD_REQUEST)
            );
            return;
        }

        res.status(StatusCodes.CREATED).json(
            new SuccessResponse(ResponseMessages.JOURNEY_CREATION_SUCCESS, result.data)
        );
    } catch (err: any) {
        console.error('Unhandled error in createJourney:', err);
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR)
        );
    }
};

export const getJourney: RequestHandler = async (req, res) => {
    try {
        const journeyId = Number(req.query.journeyId);

        if (isNaN(journeyId)) {
            res.status(StatusCodes.BAD_REQUEST).json(
                new ErrorResponse(StatusCodes.BAD_REQUEST, ErrorMessages.INVALID_INPUT)
            );
            return;
        }

        const result = await journeyModel.get({ journeyId });

        if (result.error) {
            res.status(StatusCodes.NOT_FOUND).json(
                new ErrorResponse(StatusCodes.NOT_FOUND, result.error)
            );
            return;
        }

        res.status(StatusCodes.OK).json(
            new SuccessResponse(ResponseMessages.JOURNEY_RETRIEVAL_SUCCESS, result.data)
        );
    } catch (err: any) {
        console.error('Unhandled error in getJourney:', err);
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR)
        );
    }
};
