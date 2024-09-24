const messageHelper = require("../utils/messageHelper");
const { errorResponse, successResponse } = require("../utils/responseHelper");
const asyncHandler = require("../utils/asyncHandler");
const userHelper = require("../helpers/userHelper");

module.exports = {
  registerController: asyncHandler(async (req, res) => {
    const { phoneNumber  } = req.body;

    // Validate required fields
    if (!phoneNumber ) {
      errorResponse(res, 400, messageHelper.MISSING_REQUIRED_FIELDS);
    }

    const result = await userHelper.register(req.body);
    if (!result) {
      errorResponse(res, 500, messageHelper.INTERNAL_SERVER_ERROR);
    }
    successResponse(res, 200, messageHelper.OTP_SENT_SUCCESSFULLY,result);
  }),
  loginController: asyncHandler(async (req, res) => {
    const { phoneNumber } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token", token);

    if (!phoneNumber ) {
      errorResponse(res, 400, messageHelper.MISSING_REQUIRED_FIELDS);
    }

    const result = await userHelper.login({ phoneNumber });
    if (!result) {
      errorResponse(res, 500, messageHelper.INTERNAL_SERVER_ERROR);
    }
    console.log("Login result", result);
    successResponse(res, 200, messageHelper.OTP_SENT_SUCCESSFULLY,result);
  }),

  verifyUserRegistrationController: asyncHandler(async (req, res) => {
    const { otp, phoneNumber } = req.body;
    console.log(otp,'popooppo')
    if (!otp) {
      errorResponse(res, 400, messageHelper.MISSING_REQUIRED_FIELDS);
    }
    const result = await userHelper.verifyUserRegistration(otp, phoneNumber);
    if (!result) {
      errorResponse(res, 500, messageHelper.INTERNAL_SERVER_ERROR);
    }
    console.log("otp varification result", result);
    successResponse(
      res,
      200,
      messageHelper.SUCCESSFULLY_REGISTERED_USER,
      result
    );
  }),

  verifyUserLoginController: asyncHandler(async (req, res) => {
    const { otp, phoneNumber } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!otp) {
      errorResponse(res, 400, messageHelper.MISSING_REQUIRED_FIELDS);
    }
    const result = await userHelper.verifyUserLogin(phoneNumber, otp, token);
    if (!result) {
      errorResponse(res, 500, messageHelper.INTERNAL_SERVER_ERROR);
    }
    console.log("otp varification result", result);
    successResponse(res, 200, messageHelper.SUCCESSFULLY_LOGGED_USER, result);
  }),

  logoutController: asyncHandler(async (req, res) => {
    const {phoneNumber} = req.body
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token)
    if (!token) {
      errorResponse(res, 400, messageHelper.MISSING_REQUIRED_FIELDS);
    }

    const result = await userHelper.logout(token,phoneNumber);
    console.log(result)
    if (!result) {
      errorResponse(res, 500, messageHelper.INTERNAL_SERVER_ERROR);
    }
    console.log("logoutResult", result);
    successResponse(res, 200, messageHelper.SUCCESSFULLY_LOGOUT_USER, result);
  }),
};
