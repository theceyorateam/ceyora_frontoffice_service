import { RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import * as regionModel from '../models/region_model';
import ErrorResponse from '../utils/responses/ErrorResponse';
import SuccessResponse from '../utils/responses/SuccessResponse';
import StatusCodes from '../utils/statusCodes/StatusCodes';
import ErrorCodes from '../utils/statusCodes/ErrorCodes';
import ResponseMessages from '../utils/ResponseMessages/ResponseMessages';
import ErrorMessages from '../utils/ResponseMessages/ErrorMessages';

const prisma = new PrismaClient();

export const createRegion: RequestHandler = async (req, res) => {
    try {
        const result = await regionModel.create(req.body);

        if (result.error) {
            res.status(StatusCodes.BAD_REQUEST).json(
                new ErrorResponse(StatusCodes.BAD_REQUEST, result.error || ErrorMessages.BAD_REQUEST)
            );
            return;
        }

        res.status(StatusCodes.CREATED).json(
            new SuccessResponse(ResponseMessages.REGION_CREATION_SUCCESS, result.data)
        );
    } catch (err: any) {
        console.error('Unhandled error in createRegion:', err);
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR)
        );
    }
};

export const getRegion: RequestHandler = async (req, res) => {
    try {
        const regionIdStr = req.query.regionId as string | undefined;

        if (!regionIdStr) {
            res.status(StatusCodes.BAD_REQUEST).json(
                new ErrorResponse(StatusCodes.BAD_REQUEST, 'Region ID is required')
            );
            return;
        }

        const regionId = Number(regionIdStr);
        if (isNaN(regionId)) {
            res.status(StatusCodes.BAD_REQUEST).json(
                new ErrorResponse(StatusCodes.BAD_REQUEST, 'Region ID must be a number')
            );
            return;
        }

        const result = await regionModel.get({ regionId });

        if (result.error) {
            res.status(StatusCodes.NOT_FOUND).json(
                new ErrorResponse(StatusCodes.NOT_FOUND, result.error)
            );
            return;
        }

        res.status(StatusCodes.OK).json(
            new SuccessResponse(ResponseMessages.REGION_RETRIEVAL_SUCCESS, result.data)
        );
    } catch (err: any) {
        console.error('Unhandled error in getRegion:', err);
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR)
        );
    }
};

export const getAllRegions: RequestHandler = async (req, res) => {
    try {
        const regions = await prisma.r1_region.findMany({
            select: {
                r1_region_id: true,
                r1_region_name: true,
                search_times: true,
                r1_district_id: true,
            },
            orderBy: {
                r1_region_name: 'asc',
            },
        });

        res.status(StatusCodes.OK).json(
            new SuccessResponse(ResponseMessages.REGION_RETRIEVAL_SUCCESS, regions)
        );
    } catch (err: any) {
        console.error('Unhandled error in getAllRegions:', err);
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR)
        );
    }
};
