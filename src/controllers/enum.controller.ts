import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import { getEnumsByTypeService } from "../services/enum.service";
import { ENUM_MESSAGES } from "../constants/messages";

export const getEnumsByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const typeString = Array.isArray(type) ? type[0] : type;

    const enums = await getEnumsByTypeService(typeString);

    return successResponse(res, ENUM_MESSAGES.FETCHED, enums, 200);
  } catch (error: any) {
    return errorResponse(res, ENUM_MESSAGES.FAILED, 500, error.message);
  }
};
