import { Request, Response } from "express";
import { getBranchStudentsService } from "../services/professor.service";
import { errorResponse, successResponse } from "../utils/response";
import { STUDENT_MESSAGES } from "../constants/messages";

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
        const professorBranchId = req.user!.branchId;

        const studentsData = await getBranchStudentsService(professorBranchId);

        return successResponse(res, STUDENT_MESSAGES.STUDENTS, studentsData, 200);
    } catch (error:any) {
        console.error("Error fetching students: ", error);
        return errorResponse(res, STUDENT_MESSAGES.SERVER_ERROR, 500, error.message);
    }
}