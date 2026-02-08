import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { errorResponse, successResponse } from "../utils/response";
import { ASSIGNMENT_MESSAGES, SUBJECT_MESSAGES } from "../constants/messages";
import {
  createAssignmentService,
  getSubjectsForAssignmentService,
  getAssignmentsForStudentService,
  updateAssignmentStatusService,
} from "../services/assignment.service";
import { UserPayload } from "../interfaces";

interface AuthRequest extends Request {
  user?: UserPayload;
  file?: Express.Multer.File;
}

// Assign Assignment (Admin & Professor)
export const createAssignment = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return errorResponse(res, "Unauthorized", 401);
    }

    const attachment = req.file
      ? `assignments/${req.file.filename}`
      : null;

    const assignment = await createAssignmentService(req.user!, {...req.body, attachment});

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

// Assignement Subjects
export const getSubjectsForAssignment = async (
  req: AuthRequest,
  res: Response,
) => {
  const { semesterId } = req.query;

  if (!req.user) return errorResponse(res, "Unauthorized", 401);

  const subjects = await getSubjectsForAssignmentService(
    req.user,
    Number(semesterId),
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
      return errorResponse(res, "Unauthorized", 401);
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

// Download attachment
export const downloadAssignment = async (req: Request, res: Response) => {
  const fileNameParam = req.params.fileName;

  // ✅ Ensure fileName is string
  const fileName = Array.isArray(fileNameParam)
    ? fileNameParam[0]
    : fileNameParam;

  if (!fileName) {
    return errorResponse(res, "Invalid file name", 400);
  }

  const filePath = path.join(
    __dirname,
    "../../public/assignments",
    fileName
  );

  if (!fs.existsSync(filePath)) {
    return errorResponse(res, "File not found", 404);
  }

  res.download(filePath);
};