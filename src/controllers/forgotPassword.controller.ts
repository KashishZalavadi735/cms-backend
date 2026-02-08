import { Request, Response } from "express";
import {
  sendOtpService,
  verifyOtpService,
  changePasswordService,
} from "../services/forgotPassword.service";
import { errorResponse, successResponse } from "../utils/response";
import {
  CHANGE_PASSWORD_MESSAGES,
  OTP_MESSAGES,
  SERVER_MESSAGES,
  USER_MESSAGES,
} from "../constants/messages";
import { findUserByEmailRepo } from "../repository/forgotPassword.repository";

// Send OTP
export const sendOtpController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const data = await sendOtpService(email);

    return successResponse(res, OTP_MESSAGES.SEND_OTP, data, 200);
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error);
  }
};

// Verify OTP
export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const data = await verifyOtpService(email, otp);

    return successResponse(res, OTP_MESSAGES.VERIFY_OTP, data, 200);
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error);
  }
};

// Change Password
export const changePasswordController = async (req: Request, res: Response) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    const user = await findUserByEmailRepo(email);
    if (!user) {
      return errorResponse(res, USER_MESSAGES.USER_NOT_FOUND, 404);
    }

    const data = await changePasswordService(
      user.id,
      newPassword,
      confirmPassword,
    );

    return successResponse(
      res,
      CHANGE_PASSWORD_MESSAGES.CHANGE_PASSWORD,
      data,
      200,
    );
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error);
  }
};
