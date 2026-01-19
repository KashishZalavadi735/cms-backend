import { Request, Response } from "express";
import { PROFESSOR_MESSAGES } from "../constants/messages";
import {
  createProfessorService,
  getAllProfessorService,
    getProfessorByIdService,
    updateProfessorService,
    deleteProfessorService
} from "../services/admin.service";
import { errorResponse, successResponse } from "../utils/response";

interface AuthRequest extends Request {
  user?: {
    id: number;
    name: string;
    email: string;
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
        tempPassword: result.otp,
        code: result.professor.code,
      },
      201,
    );
  } catch (error: any) {
    if (error.code === "EMAIL_EXISTS") {
      return errorResponse(res, "Email already exists", 400);
    }
    console.log("Error creating admin:", error);
    return errorResponse(
      res,
      PROFESSOR_MESSAGES.SERVER_ERROR,
      500,
      error.message,
    );
  }
};

// Get all Professor
export const getAllProfessor = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const professorData = await getAllProfessorService(page, limit);

    return successResponse(res, PROFESSOR_MESSAGES.PROFESSORS, professorData, 200);
  } catch (error: any) {
    console.log("Error fetching professors: ", error);
    return errorResponse(res, PROFESSOR_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Get Professor by id
export const getProfessorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const professor = await getProfessorByIdService(Number(id));

    return successResponse(res, PROFESSOR_MESSAGES.PROFESSOR, professor, 200);
  } catch (error:any) {
    console.log("Error fetching professor data: ", error);
    return errorResponse(res, PROFESSOR_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Update Professor
export const updateProfessor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const updatedProfessor = await updateProfessorService(Number(id), req.body);

    return successResponse(res, PROFESSOR_MESSAGES.PROFESSOR_UPDATE, updatedProfessor, 200);
  } catch (error:any) {
    console.log("Error fetching professor data: ", error);
    return errorResponse(res, PROFESSOR_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Delete Professor
export const deleteProfessor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedProfessor = await deleteProfessorService(Number(id));

    return successResponse(res, PROFESSOR_MESSAGES.PROFESSOR_DELETE, deletedProfessor, 200);
  } catch (error:any) {
    console.log("Error fetching professor data: ", error);
    return errorResponse(res, PROFESSOR_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};
