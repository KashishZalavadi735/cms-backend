import { Request, Response } from "express";
import {
  getMyProfileService,
  updateMyProfileService,
  getDashboardStatsService
} from "../services/professor.service";
import { errorResponse, successResponse } from "../utils/response";
import { DASHBOARD_MESSAGES, PROFILE_MESSAGES, SERVER_MESSAGES } from "../constants/messages";

interface AuthRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    roleId: string;
    branchId: string;
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

// Update My Profile
export const updateMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const updatedProfile = await updateMyProfileService(req.user!.id, req.body);

    return successResponse(res, PROFILE_MESSAGES.UPDATE, updatedProfile, 200);
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Dashboard Stats
export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const branchId = req.user!.branchId;

    const stats = await getDashboardStatsService(branchId);

    return successResponse(res, DASHBOARD_MESSAGES.CARDS, stats, 200);
  } catch (error: any) {
    console.log("Dashboard error:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};