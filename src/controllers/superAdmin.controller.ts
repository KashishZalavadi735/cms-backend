import { Request, Response } from "express";
import {
  createAdminService,
  getAllAdminService,
  getAdminByIdService,
  updateAdminService,
  deleteAdminService,
  getMyProfileService
} from "../services/superAdmin.service";
import { errorResponse, successResponse } from "../utils/response";
import { ADMIN_MESSAGES, PROFILE_MESSAGES, SERVER_MESSAGES } from "../constants/messages";

interface AuthRequest extends Request {
  user?: {
    id: number;
  } 
};

// Create Admin
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await createAdminService(req.body);

    return successResponse(
      res,
      ADMIN_MESSAGES.ADMIN_CREATE,
      {
        admin: result.admin,
        tempPassword: result.otp,
        code: result.admin.code,
      },
      201,
    );
  } catch (error: any) {
    if (error.code === "EMAIL_EXISTS") {
      return errorResponse(res, "Email already exists", 400);
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

    const adminData = await getAllAdminService(page, limit);

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
}