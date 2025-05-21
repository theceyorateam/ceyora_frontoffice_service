const packageModel = require('../models/package_model');
const ErrorResponse = require("../utils/responses/ErrorResponse");
const SuccessResponse = require("../utils/responses/SuccessResponse");
const StatusCodes = require('../utils/statusCodes/statusCodes')
const ErrorCodes = require('../utils/statusCodes/statusCodes')
const ResponseMessages = require('../utils/ResponseMessages/ResponseMessages')
const ErrorMessages = require('../utils/ResponseMessages/ErrorMessages')

exports.createPackage = async (req, res) => {
    try {
        const result = await packageModel.create(req.body);

        if (result.error) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST));
        }

        return res
            .status(StatusCodes.CREATED)
            .json(new SuccessResponse(ResponseMessages.PACKAGE_CREATION_SUCCESS, result.data));
    } catch (err) {
        console.error(err);
        return res
            .status(StatusCodes.INTERNAL_ERROR)
            .json(new ErrorResponse(ErrorCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR));
    }
}

exports.getPackage = async (req, res) => {
    try {
        const packageId = req.query.packageId;
        const result = await packageModel.get({packageId});

        if (result.error) {
            return res.status(ErrorCodes.NOT_FOUND).json({
                success: false,
                errorCode: ErrorCodes.NOT_FOUND,
                message: result.error,
                data: null
            });
        }

        return res.status(200).json(new SuccessResponse(ResponseMessages.PACKAGE_RETRIEVAL_SUCCESS, result.data));

    } catch (err) {
        console.error(err);
        return res.status(500).json(new SuccessResponse(ErrorMessages.SERVER_ERROR, null));
    }
};
