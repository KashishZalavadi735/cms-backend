import { Request, Response } from "express";
import { PROFESSOR_MESSAGES, STUDENT_MESSAGES } from "../constants/messages";
import {
  createProfessorService,
  getAllProfessorService,
  getProfessorByIdService,
  updateProfessorService,
  deleteProfessorService,
  updateProfessorSubjectsService,
  getBranchStudentsService
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
export const getAllProfessor = async (req: AuthRequest, res: Response) => {
  try {
    const admin = req.user!;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const professorData = await getAllProfessorService(
      page,
      limit,
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
    return errorResponse(
      res,
      PROFESSOR_MESSAGES.SERVER_ERROR,
      500,
      error.message,
    );
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
    return errorResponse(
      res,
      PROFESSOR_MESSAGES.SERVER_ERROR,
      500,
      error.message,
    );
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
    return errorResponse(
      res,
      PROFESSOR_MESSAGES.SERVER_ERROR,
      500,
      error.message,
    );
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
    return errorResponse(
      res,
      PROFESSOR_MESSAGES.SERVER_ERROR,
      500,
      error.message,
    );
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
    return errorResponse(
      res,
      PROFESSOR_MESSAGES.SERVER_ERROR,
      500,
      error.message,
    );
  }
};

// View branch students
export const getBranchStudents = async (req: AuthRequest, res: Response) => {
  try {
    const professorBranchId = req.user!.branchId;

    const studentsData = await getBranchStudentsService(professorBranchId);

    return successResponse(res, STUDENT_MESSAGES.STUDENTS, studentsData, 200);
  } catch (error: any) {
    console.error("Error fetching students: ", error);
    return errorResponse(
      res,
      STUDENT_MESSAGES.SERVER_ERROR,
      500,
      error.message,
    );
  }
};
