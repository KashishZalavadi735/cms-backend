import { Request, Response } from "express";
import { getMyProfileService,  } from "../services/professor.service";
import { errorResponse, successResponse } from "../utils/response";
import { PROFILE_MESSAGES, SERVER_MESSAGES } from "../constants/messages";

interface AuthRequest extends Request {
    user?: {
        id: number;
        name: string;
        email: string;
        roleId: number;
        branchId: number;
    };
} 

// My Profile
export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const superAdmin = await getMyProfileService(req.user!.id);

    return successResponse(res, PROFILE_MESSAGES.PROFESSOR, superAdmin, 200);
  } catch (error: any) {
    console.log("Error fetching profile:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};