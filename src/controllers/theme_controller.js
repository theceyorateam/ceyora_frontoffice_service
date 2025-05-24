const themeModel = require('../models/theme_model');
const ErrorResponse = require("../utils/responses/ErrorResponse");
const SuccessResponse = require("../utils/responses/SuccessResponse");
const StatusCodes = require('../utils/statusCodes/statusCodes')
const ErrorCodes = require('../utils/statusCodes/statusCodes')
const ResponseMessages = require('../utils/ResponseMessages/ResponseMessages')
const ErrorMessages = require('../utils/ResponseMessages/ErrorMessages')

exports.createTheme = async (req, res) => {
    try {
        const result = await themeModel.create(req.body);

        if (result.error) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST));
        }

        return res
            .status(StatusCodes.CREATED)
            .json(new SuccessResponse(ResponseMessages.THEME_CREATION_SUCCESS, result.data));
    } catch (err) {
        console.error(err);
        return res
            .status(StatusCodes.INTERNAL_ERROR)
            .json(new ErrorResponse(ErrorCodes.INTERNAL_ERROR, ErrorMessages.SERVER_ERROR));
    }
}

exports.getTheme = async (req, res) => {
    try {
        const themeId = req.query.themeId;
        const result = await themeModel.get({themeId});

        if (result.error) {
            return res.status(ErrorCodes.NOT_FOUND).json({
                success: false,
                errorCode: 1002,
                message: result.error,
                data: null
            });
        }

        return res.status(200).json(new SuccessResponse(ResponseMessages.THEME_RETRIEVAL_SUCCESS, result.data));

    } catch (err) {
        console.error(err);
        return res.status(500).json(new SuccessResponse(ErrorMessages.SERVER_ERROR, null));
    }
};
