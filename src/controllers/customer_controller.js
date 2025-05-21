const userModel = require('../models/customer_model');
const ErrorResponse = require("../utils/responses/ErrorResponse");
const SuccessResponse = require("../utils/responses/SuccessResponse");
const StatusCodes = require('../utils/statusCodes/statusCodes')
const ErrorCodes = require('../utils/statusCodes/ErrorCodes')
const ResponseMessages = require('../utils/ResponseMessages/ResponseMessages')
const ErrorMessages = require('../utils/ResponseMessages/ErrorMessages')

exports.createUser = async (req, res) => {
    try {
        const result = await userModel.create(req.body);

        if (result.error) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(ErrorCodes.BAD_REQUEST, ErrorMessages.EMAIL_ALREADY_EXIST));
        }

        return res
            .status(StatusCodes.CREATED)
            .json(new SuccessResponse(ResponseMessages.CUSTOMER_CREATION_SUCCESS, result.data));
    } catch (err) {
        console.error(err);
        return res
            .status(StatusCodes.INTERNAL_ERROR)
            .json(new ErrorResponse(ErrorCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR));
    }
}

//get user endpoints
exports.getUser = async (req, res) => {
    try {
        const customerId = req.query.customerId;
        const result = await userModel.get({customerId});

        if (result.error) {
            return res.status(ErrorCodes.NOT_FOUND).json({
                success: false,
                errorCode: 1002,
                message: result.error,
                data: null
            });
        }

        return res.status(200).json(new SuccessResponse(ResponseMessages.CUSTOMER_RETRIEVAL_SUCCESS, result.data));

    } catch (err) {
        console.error(err);
        return res.status(500).json(new SuccessResponse(ErrorMessages.SERVER_ERROR, null));
    }
};
