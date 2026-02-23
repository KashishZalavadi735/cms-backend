import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { UserPayload } from "../interfaces";
import { errorResponse, successResponse } from "../utils/response";
import {
  ASSIGNMENT_MESSAGES,
  SERVER_MESSAGES,
  SUBJECT_MESSAGES,
  SUMMARY_MESSAGES,
  UNAUTHORIZED_MESSAGES,
} from "../constants/messages";
import {
  createAssignmentService,
  getSubjectsForAssignmentService,
  getAssignmentsForStudentService,
  updateAssignmentStatusService,
  getAssignmentSummaryService,
} from "../services/assignment.service";

interface AuthRequest extends Request {
  user?: UserPayload;
  file?: Express.Multer.File;
}

// Assignment summary
export const getAssignmentSummary = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user)
      return errorResponse(res, UNAUTHORIZED_MESSAGES.UNAUTHORIZED, 401);

    const summary = await getAssignmentSummaryService(req.user);

    return successResponse(
      res,
      SUMMARY_MESSAGES.ASSIGNMENT_SUMMARY,
      summary,
      200,
    );
  } catch (error: any) {
    console.error("Error fetching admin summary:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Assign Assignment (Admin & Professor)
export const createAssignment = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return errorResponse(res, UNAUTHORIZED_MESSAGES.UNAUTHORIZED, 401);
    }

    const attachment = req.file ? `assignments/${req.file.filename}` : null;

    const assignment = await createAssignmentService(req.user!, {
      ...req.body,
      attachment,
    });

    return successResponse(
      res,
      ASSIGNMENT_MESSAGES.ASSIGNMENT_CREATE,
      assignment,
      201,
    );
  } catch (error: any) {
    console.log("Error creating assignment:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Assignement Subjects
export const getSubjectsForAssignment = async (
  req: AuthRequest,
  res: Response,
) => {
  const { semesterId } = req.query;

  if (!req.user)
    return errorResponse(res, UNAUTHORIZED_MESSAGES.UNAUTHORIZED, 401);

  const subjects = await getSubjectsForAssignmentService(
    req.user,
    String(semesterId),
  );

  return successResponse(res, SUBJECT_MESSAGES.SUBJECT, subjects, 200);
};

// View assignments (students)
export const getAssignmentsForStudent = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return errorResponse(res, UNAUTHORIZED_MESSAGES.UNAUTHORIZED, 401);
    }

    const assignments = await getAssignmentsForStudentService(req.user);

    return successResponse(
      res,
      ASSIGNMENT_MESSAGES.ASSIGNMENTS,
      assignments,
      200,
    );
  } catch (error: any) {
    console.log("Error fetching assignments:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Change assignement status (students)
export const updateAssignmentStatus = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return errorResponse(res, UNAUTHORIZED_MESSAGES.UNAUTHORIZED, 401);
    }

    // Normalize assignmentId to string
    const assignmentIdParam = req.params.assignmentId;
    const assignmentId = Array.isArray(assignmentIdParam)
      ? assignmentIdParam[0]
      : assignmentIdParam;

    const { statusId } = req.body;

    const result = await updateAssignmentStatusService(
      req.user,
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
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};

// Download attachment
export const downloadAssignment = async (req: Request, res: Response) => {
  try {
    const fileNameParam = req.params.fileName;
    const fileName = Array.isArray(fileNameParam)
      ? fileNameParam[0]
      : fileNameParam;

    if (!fileName) return errorResponse(res, "Invalid file name", 400);

    const filePath = path.join(__dirname, "../../public/assignments", fileName);

    if (!fs.existsSync(filePath))
      return errorResponse(res, "File not found", 404);

    return res.download(filePath);
  } catch (error: any) {
    console.error("Error downloading file:", error);
    return errorResponse(res, SERVER_MESSAGES.SERVER_ERROR, 500, error.message);
  }
};
