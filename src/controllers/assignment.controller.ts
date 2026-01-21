import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import { ASSIGNMENT_MESSAGES } from "../constants/messages";
import {
  createAssignmentService,
  getAssignmentsForStudentService,
  updateAssignmentStatusService,
} from "../services/assignment.service";
import { UserPayload } from "../interfaces";

interface AuthRequest extends Request {
  user?: UserPayload;
}

// Assign Assignment (Admin & Professor)
export const createAssignment = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return errorResponse(res, "Unauthorized", 401);
    }

    const assignment = await createAssignmentService(req.user!, req.body);

    return successResponse(
      res,
      ASSIGNMENT_MESSAGES.ASSIGNMENT_CREATE,
      assignment,
      201,
    );
  } catch (error: any) {
    console.log("Error creating assignment:", error);
    return errorResponse(
      res,
      ASSIGNMENT_MESSAGES.SERVER_ERROR,
      500,
      error.message,
    );
  }
};

// View assignments (students)
export const getAssignmentsForStudent = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return errorResponse(res, "Unauthorized", 401);
    }

    const assignments = await getAssignmentsForStudentService(req.user!);

    return successResponse(
      res,
      ASSIGNMENT_MESSAGES.ASSIGNMENTS,
      assignments,
      200,
    );
  } catch (error: any) {
    console.log("Error fetching assignments:", error);
    return errorResponse(
      res,
      ASSIGNMENT_MESSAGES.SERVER_ERROR,
      500,
      error.message,
    );
  }
};

// Change assignement status (students)
export const updateAssignmentStatus = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return errorResponse(res, "Unauthorized", 401);
    }

    const assignmentId = Number(req.params.assignmentId);
    const { statusId } = req.body;

    const result = await updateAssignmentStatusService(
      req.user!,
      assignmentId,
      statusId,
    );

    return successResponse(
      res,
      ASSIGNMENT_MESSAGES.ASSIGNMENT_STATUS_UPDATED,
      result,
      200,
    );
  } catch (error: any) {
    console.log("Error updating assignment status:", error);
    return errorResponse(
      res,
      ASSIGNMENT_MESSAGES.SERVER_ERROR,
      500,
      error.message,
    );
  }
};
