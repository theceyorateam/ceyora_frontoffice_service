const vendorModel = require('../models/vendor_model');
const ErrorResponse = require("../utils/responses/ErrorResponse");
const SuccessResponse = require("../utils/responses/SuccessResponse");
const StatusCodes = require('../utils/statusCodes/statusCodes')
const ErrorCodes = require('../utils/statusCodes/statusCodes')
const ResponseMessages = require('../utils/ResponseMessages/ResponseMessages')
const ErrorMessages = require('../utils/ResponseMessages/ErrorMessages')

exports.createVendor = async (req, res) => {
    try {
        const result = await vendorModel.create(req.body);

        if (result.error) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST));
        }

        return res
            .status(StatusCodes.CREATED)
            .json(new SuccessResponse(ResponseMessages.VENDOR_CREATION_SUCCESS, result.data));
    } catch (err) {
        console.error(err);
        return res
            .status(StatusCodes.INTERNAL_ERROR)
            .json(new ErrorResponse(ErrorCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR));
    }
}

exports.getVendor = async (req, res) => {
    try {
        const vendorId = req.query.vendorId;
        const result = await vendorModel.get({vendorId});

        if (result.error) {
            return res.status(ErrorCodes.NOT_FOUND).json({
                success: false,
                errorCode: 1002,
                message: result.error,
                data: null
            });
        }

        return res.status(200).json(new SuccessResponse(ResponseMessages.VENDOR_RETRIEVAL_SUCCESS, result.data));

    } catch (err) {
        console.error(err);
        return res.status(500).json(new SuccessResponse(ErrorMessages.SERVER_ERROR, null));
    }
};
