import { Response } from "express";
import { ErrorRes, SuccessRes } from "../interfaces/response";

// Success Response
export const successResponse = <T>(res: Response, message: string, data: T, statusCode: number): Response<SuccessRes<T>> => {
    return res.status(statusCode).json({
        status: "Success",
        statusCode,
        message,
        data
    });
};

// Error Response
export const errorResponse = (res: Response, message: string, statusCode: number, error: unknown = null): Response<ErrorRes> => {
    return res.status(statusCode).json({
        status: "Error",
        statusCode,
        message,
        error
    });
};