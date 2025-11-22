import { RequestHandler } from 'express';
import * as journeyModel from '../models/journey_model';
import ErrorResponse from '../utils/responses/ErrorResponse';
import SuccessResponse from '../utils/responses/SuccessResponse';
import StatusCodes from '../utils/statusCodes/StatusCodes';
import ErrorMessages from '../utils/ResponseMessages/ErrorMessages';
import ResponseMessages from '../utils/ResponseMessages/ResponseMessages';
import { Journey } from '../types/Journey';

/**
 * Create a new journey
 */
export const createJourney: RequestHandler = async (req, res) => {
    console.log('createJourney called with body:', req.body);

    try {
        const journeyData: Journey = req.body;
        const result = await journeyModel.create(journeyData);

        if (result.error) {
            console.warn('Error creating journey:', result.error);
            res.status(StatusCodes.BAD_REQUEST).json(
                new ErrorResponse(StatusCodes.BAD_REQUEST, result.error || ErrorMessages.BAD_REQUEST)
            );
            return;
        }

        console.log('Journey created successfully:', result.data);
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

/**
 * Get a journey by ID
 */
export const getJourney: RequestHandler = async (req, res) => {
    console.log('getJourney called with query:', req.query);

    try {
        const journeyId = Number(req.query.journeyId);

        if (isNaN(journeyId)) {
            console.warn('Invalid journeyId:', req.query.journeyId);
            res.status(StatusCodes.BAD_REQUEST).json(
                new ErrorResponse(StatusCodes.BAD_REQUEST, ErrorMessages.INVALID_INPUT)
            );
            return;
        }

        const result = await journeyModel.get({ journeyId });
        console.log('Result from journeyModel.get:', result);

        if (result.error) {
            console.warn('Journey not found:', result.error);
            res.status(StatusCodes.NOT_FOUND).json(
                new ErrorResponse(StatusCodes.NOT_FOUND, result.error)
            );
            return;
        }

        console.log('Journey retrieved successfully:', result.data);
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

/**
 * Get all journeys
 */
export const getAllJourneys: RequestHandler = async (req, res) => {
    console.log('getAllJourneys called');

    try {
        const result = await journeyModel.getAll(); // Ensure your model has this method
        console.log('Result from journeyModel.getAll:', result);

        if (result.error) {
            console.warn('Error fetching journeys:', result.error);
            res.status(StatusCodes.NOT_FOUND).json(
                new ErrorResponse(StatusCodes.NOT_FOUND, result.error)
            );
            return;
        }

        console.log('Successfully retrieved journeys. Count:', result.data?.length || 0);
        res.status(StatusCodes.OK).json(
            new SuccessResponse(ResponseMessages.JOURNEY_RETRIEVAL_SUCCESS, result.data)
        );
    } catch (err: any) {
        console.error('Unhandled error in getAllJourneys:', err);
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR)
        );
    }
};
