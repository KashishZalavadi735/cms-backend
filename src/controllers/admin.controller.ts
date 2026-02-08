import { Request, Response } from "express";
import {
  PROFESSOR_MESSAGES,
  PROFILE_MESSAGES,
  SERVER_MESSAGES,
  SUBJECT_MESSAGES,
} from "../constants/messages";
import {
  createProfessorService,
  getAllProfessorService,
  getProfessorByIdService,
  updateProfessorService,
  deleteProfessorService,
  updateProfessorSubjectsService,
  getBranchSubjectsService,
  getMyProfileService,
  updateMyProfileService
} from "../services/admin.service";
import { errorResponse, successResponse } from "../utils/response";

interface AuthRequest extends Request {
  user?: {
    id: number;
    roleId: number;
    branchId: number;
  };
}

// Create Professor
export const createProfessor = async (req: AuthRequest, res: Response) => {
  try {
    const admin = req.user!;

    const result = await createProfessorService(req.body, admin.branchId);

    return successResponse(
      res,
      PROFESSOR_MESSAGES.PROFESSOR_CREATE,
      {
        professor: result.professor,
        code: result.professor.code,
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

// Get all Professor
export const getAllProfessor = async (req: AuthRequest, res: Response) => {
  try {
    const admin = req.user!;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = String(req.query.search || "");

    const professorData = await getAllProfessorService(
      page,
      limit,
      search,
      admin.branchId,
    );

    return successResponse(
      res,
      PROFESSOR_MESSAGES.PROFESSORS,
      professorData,
      200,
    );
  } catch (error: any) {
    console.log("Error fetching professors: ", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Get Professor by id
export const getProfessorById = async (req: AuthRequest, res: Response) => {
  try {
    const admin = req.user!;
    const { id } = req.params;
    const professor = await getProfessorByIdService(Number(id), admin.branchId);

    return successResponse(res, PROFESSOR_MESSAGES.PROFESSOR, professor, 200);
  } catch (error: any) {
    console.log("Error fetching professor data: ", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Update Professor
export const updateProfessor = async (req: AuthRequest, res: Response) => {
  try {
    const admin = req.user!;
    const { id } = req.params;

    const updatedProfessor = await updateProfessorService(
      Number(id),
      req.body,
      admin.branchId,
    );

    return successResponse(
      res,
      PROFESSOR_MESSAGES.PROFESSOR_UPDATE,
      updatedProfessor,
      200,
    );
  } catch (error: any) {
    console.log("Error fetching professor data: ", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Delete Professor
export const deleteProfessor = async (req: AuthRequest, res: Response) => {
  try {
    const admin = req.user!;
    const { id } = req.params;

    const deletedProfessor = await deleteProfessorService(
      Number(id),
      admin.branchId,
    );

    return successResponse(
      res,
      PROFESSOR_MESSAGES.PROFESSOR_DELETE,
      deletedProfessor,
      200,
    );
  } catch (error: any) {
    console.log("Error fetching professor data: ", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Assign subject to existing professor
export const updateProfessorSubjects = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const professorId = Number(req.params.id);
    const { subjectIds } = req.body;
    const admin = req.user!;

    const result = await updateProfessorSubjectsService(
      professorId,
      subjectIds,
      admin.branchId,
    );

    return successResponse(
      res,
      PROFESSOR_MESSAGES.PROFESSOR_SUBJECT_UPDATE,
      result,
      200,
    );
  } catch (error: any) {
    console.log("Error updating professor subjects: ", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Subjects
export const getBranchSubjects = async (req: AuthRequest, res: Response) => {
  try {
    const branchId = req.user!.branchId;

    const subjects = await getBranchSubjectsService(branchId);

    return successResponse(res, SUBJECT_MESSAGES.SUBJECT, subjects, 200);
  } catch (error: any) {
    console.error("Error fetching branch subjects:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500);
  }
};

// My Profile
export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const superAdmin = await getMyProfileService(req.user!.id);

    return successResponse(res, PROFILE_MESSAGES.ADMIN, superAdmin, 200);
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