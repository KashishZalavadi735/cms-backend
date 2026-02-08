import { Request, Response } from "express";
import {
  createAdminService,
  getAllAdminService,
  getAdminByIdService,
  updateAdminService,
  deleteAdminService,
  getMyProfileService,
  updateMyProfileService,
  getDashboardStatsService,
  getAdminSummaryService,
} from "../services/superAdmin.service";
import { errorResponse, successResponse } from "../utils/response";
import {
  ADMIN_MESSAGES,
  DASHBOARD_MESSAGES,
  EMAIL_MESSAGES,
  PROFILE_MESSAGES,
  SERVER_MESSAGES,
} from "../constants/messages";

interface AuthRequest extends Request {
  user?: {
    id: number;
  };
}

// Create Admin
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await createAdminService(req.body);

    return successResponse(
      res,
      ADMIN_MESSAGES.ADMIN_CREATE,
      {
        admin: result.admin,
        code: result.admin.code,
      },
      201,
    );
  } catch (error: any) {
    if (error.code === "EMAIL_EXISTS") {
      return errorResponse(res, EMAIL_MESSAGES.EMAIL_EXISTS, 400);
    }
    console.log("Error creating admin:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Get all admin
export const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = String(req.query.search || "");

    const adminData = await getAllAdminService(page, limit, search);

    return successResponse(res, ADMIN_MESSAGES.ADMINS, adminData, 200);
  } catch (error: any) {
    console.log("Error fetching admins:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Get admin by id
export const getAdminById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const admin = await getAdminByIdService(Number(id));

    return successResponse(res, ADMIN_MESSAGES.ADMIN, admin, 200);
  } catch (error: any) {
    console.log("Error fetching admin:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Update admin
export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedAdmin = await updateAdminService(Number(id), req.body);

    return successResponse(res, ADMIN_MESSAGES.ADMIN_UPDATE, updatedAdmin, 200);
  } catch (error: any) {
    console.log("Error updating admin:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Delete admin
export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedAdmin = await deleteAdminService(Number(id));

    return successResponse(res, ADMIN_MESSAGES.ADMIN_DELETE, deletedAdmin, 200);
  } catch (error: any) {
    console.log("Error deleting admin:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// My Profile
export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const superAdmin = await getMyProfileService(req.user!.id);

    return successResponse(res, PROFILE_MESSAGES.SUPER_ADMIN, superAdmin, 200);
  } catch (error: any) {
    console.log("Error fetching profile:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Update My Profile
export const updateMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const updatedProfile = await updateMyProfileService(req.user!.id, req.body);

    return successResponse(
      res,
      PROFILE_MESSAGES.UPDATE,
      updatedProfile,
      200,
    );
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Dashboard Stats
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const stats = await getDashboardStatsService();

    return successResponse(res, DASHBOARD_MESSAGES.CARDS, stats, 200);
  } catch (error: any) {
    console.log("Dashboard error:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Admin Summary
export const getAdminSummary = async (req: Request, res: Response) => {
  try {
    const summary = await getAdminSummaryService();

    return successResponse(res, ADMIN_MESSAGES.ADMINS, summary, 200);
  } catch (error: any) {
    console.error("Error fetching admin summary:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};
