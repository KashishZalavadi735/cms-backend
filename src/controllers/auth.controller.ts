import { Request, Response } from "express";
import { loginService, signupService } from "../services/auth.service";
import { errorResponse, successResponse } from "../utils/response";
import { AUTH_MESSAGES } from "../constants/messages";

// login
export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const data = await loginService(email, password);

    return successResponse(res, AUTH_MESSAGES.LOGIN_SUCCESS, data, 200);
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse(res, AUTH_MESSAGES.SERVER_ERROR, 500, error);
  }
};

// signup only for student
export const signupController = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      contactNumber,
      password,
      branchId,
      semesterId,
      yearId,
    } = req.body;

    if (
      !name ||
      !email ||
      !contactNumber ||
      !password ||
      !branchId ||
      !semesterId ||
      !yearId
    ) {
      return errorResponse(res, AUTH_MESSAGES.REQUIRED_FIELDS, 400);
    }

    const student = await signupService(req.body);

    // return res.status(201).json(student);
    return successResponse(res, AUTH_MESSAGES.SIGNUP_SUCCESS, student, 201);

  } catch (error: any) {
    console.error("Student signup error:", error);
    return errorResponse(res, error.message, 400);
  }
};
