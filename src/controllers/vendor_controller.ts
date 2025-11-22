// File: src/controllers/vendor_controller.ts

import { RequestHandler } from 'express';
import * as vendorModel from '../models/vendor_model';
import ErrorResponse from '../utils/responses/ErrorResponse';
import SuccessResponse from '../utils/responses/SuccessResponse';
import StatusCodes from '../utils/statusCodes/StatusCodes';
import ResponseMessages from '../utils/ResponseMessages/ResponseMessages';
import ErrorMessages from '../utils/ResponseMessages/ErrorMessages';

// Helper function for date validation (basic YYYY-MM-DD check)
const isValidDateFormat = (dateString: string): boolean => {
    // Basic check for YYYY-MM-DD format and check if it produces a valid Date object
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString) && !isNaN(new Date(dateString).getTime());
};

export const getAllVendors: RequestHandler = async (req, res) => {
    console.log('getAllVendors called');

    try {
        const result = await vendorModel.getAll();

        if (result.error) {
            console.warn('Error retrieving vendors:', result.error);
            res.status(StatusCodes.NOT_FOUND).json(
                new ErrorResponse(StatusCodes.NOT_FOUND, result.error)
            );
            return;
        }

        res.status(StatusCodes.OK).json(
            new SuccessResponse(ResponseMessages.VENDOR_RETRIEVAL_SUCCESS, result.data)
        );
    } catch (err: any) {
        console.error('Unhandled error in getAllVendors:', err);
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR)
        );
    }
};

export const getVendor: RequestHandler = async (req, res) => {
    const vendorId = parseInt(req.params.vendorId, 10);

    try {
        const result = await vendorModel.getById(vendorId);

        if (result.error || !result.data) {
            res.status(StatusCodes.NOT_FOUND).json(
                new ErrorResponse(StatusCodes.NOT_FOUND, ErrorMessages.NOT_FOUND)
            );
            return;
        }

        res.status(StatusCodes.OK).json(
            new SuccessResponse(ResponseMessages.VENDOR_RETRIEVAL_SUCCESS, result.data)
        );
    } catch (err: any) {
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR)
        );
    }
};

export const getVendorsByTheme: RequestHandler = async (req, res) => {
    const themeName = req.query.theme as string;

    try {
        const result = await vendorModel.getByTheme(themeName);

        if (result.error) {
            res.status(StatusCodes.NOT_FOUND).json(
                new ErrorResponse(StatusCodes.NOT_FOUND, result.error)
            );
            return;
        }

        res.status(StatusCodes.OK).json(
            new SuccessResponse(ResponseMessages.VENDOR_RETRIEVAL_SUCCESS, result.data)
        );
    } catch (err: any) {
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR)
        );
    }
};

export const createVendor: RequestHandler = async (req, res) => {
    try {
        const result = await vendorModel.createVendor(req.body);

        if (result.error) {
            res.status(StatusCodes.BAD_REQUEST).json(
                new ErrorResponse(StatusCodes.BAD_REQUEST, result.error)
            );
            return;
        }

        res.status(StatusCodes.CREATED).json(
            new SuccessResponse(ResponseMessages.VENDOR_CREATION_SUCCESS, result.data)
        );
    } catch (err: any) {
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR)
        );
    }
};

/**
 * Endpoint handler to get available time slots for a vendor on a specific date.
 */
export const getAvailableSlots: RequestHandler = async (req, res) => {
    // 1. Get parameters
    const vendorId = parseInt(req.params.vendorId, 10);
    // Date is expected as a query parameter: ?date=YYYY-MM-DD
    const targetDate = req.query.date as string;

    // 2. Validation
    if (isNaN(vendorId)) {
        res.status(StatusCodes.BAD_REQUEST).json(
            new ErrorResponse(StatusCodes.BAD_REQUEST, 'Invalid Vendor ID format.')
        );
        return;
    }
    if (!targetDate || !isValidDateFormat(targetDate)) {
        res.status(StatusCodes.BAD_REQUEST).json(
            new ErrorResponse(StatusCodes.BAD_REQUEST, 'Missing or invalid date parameter. Must be YYYY-MM-DD.')
        );
        return;
    }

    try {
        // 3. Call the model function with both ID and Date
        const result = await vendorModel.getAvailableSlotsByVendor(vendorId, targetDate);

        if (result.error) {
            const statusCode = result.error.includes("Vendor not found")
                ? StatusCodes.NOT_FOUND
                : StatusCodes.INTERNAL_ERROR;

            res.status(statusCode).json(
                new ErrorResponse(statusCode, result.error)
            );
            return;
        }

        // 4. Send success response
        res.status(StatusCodes.OK).json(
            new SuccessResponse(ResponseMessages.VENDOR_RETRIEVAL_SUCCESS, result.data)
        );
    } catch (err: any) {
        console.error('Unhandled error in getAvailableSlots:', err);
        res.status(StatusCodes.INTERNAL_ERROR).json(
            new ErrorResponse(StatusCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR)
        );
    }
};