import { Request, Response } from "express";
import { setPasswordService } from "../services/setPassword.service";
import { errorResponse, successResponse } from "../utils/response";
import { SERVER_MESSAGES, SET_PASSWORD_MESSAGES } from "../constants/messages";

// Set password
export const setPasswordController = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return errorResponse(res, SET_PASSWORD_MESSAGES.REQUIRED_FIELDS, 400);
    }

    const data = await setPasswordService(token, password);

    return successResponse(res, SET_PASSWORD_MESSAGES.PASSWORD, data, 200);
  } catch (error: any) {
    console.error("Set password error:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error);
  }
};
