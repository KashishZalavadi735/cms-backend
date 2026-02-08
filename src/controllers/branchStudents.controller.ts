import { Request, Response } from "express";
import { getBranchStudentsService } from "../services/branchStudents.service";
import { errorResponse, successResponse } from "../utils/response";
import { SERVER_MESSAGES, STUDENT_MESSAGES } from "../constants/messages";

interface AuthRequest extends Request {
  user?: {
    id: number;
    name: string;
    email: string;
    roleId: number;
    branchId: number;
  };
}

// View branch students
export const getBranchStudents = async (req: AuthRequest, res: Response) => {
  try {
    const BranchId = req.user!.branchId;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = String(req.query.search || "");

    const studentsData = await getBranchStudentsService(
      page,
      limit,
      search,
      BranchId,
    );

    return successResponse(res, STUDENT_MESSAGES.STUDENTS, studentsData, 200);
  } catch (error: any) {
    console.error("Error fetching students: ", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};
