const journeyModel = require('../models/journey_model');
const ErrorResponse = require("../utils/responses/ErrorResponse");
const SuccessResponse = require("../utils/responses/SuccessResponse");
const StatusCodes = require('../utils/statusCodes/statusCodes')
const ErrorCodes = require('../utils/statusCodes/statusCodes')
const ResponseMessages = require('../utils/ResponseMessages/ResponseMessages')
const ErrorMessages = require('../utils/ResponseMessages/ErrorMessages')

exports.createJourney = async (req, res) => {
    try {
        const result = await journeyModel.create(req.body);

        if (result.error) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST));
        }

        return res
            .status(StatusCodes.CREATED)
            .json(new SuccessResponse(ResponseMessages.JOURNEY_CREATION_SUCCESS, result.data));
    } catch (err) {
        console.error(err);
        return res
            .status(StatusCodes.INTERNAL_ERROR)
            .json(new ErrorResponse(ErrorCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR));
    }
}

exports.getJourney = async (req, res) => {
    try {
        const journeyId = req.query.vendorId;
        const result = await vendorModel.get({journeyId});

        if (result.error) {
            return res.status(ErrorCodes.NOT_FOUND).json({
                success: false,
                errorCode: 1002,
                message: result.error,
                data: null
            });
        }

        return res.status(200).json(new SuccessResponse(ResponseMessages.JOURNEY_RETRIEVAL_SUCCESS, result.data));

    } catch (err) {
        console.error(err);
        return res.status(500).json(new SuccessResponse(ErrorMessages.SERVER_ERROR, null));
    }
};
