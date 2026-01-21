import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response";
import { ADMIN_PROFESSOR_MESSAGES } from "../constants/messages";
import { EnumTable } from "@prisma/client";

// Extend express request to include user
interface AuthRequest extends Request {
    user?: {
        role: EnumTable
    };
} 

export const verifyAdminOrProfessor = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    
    if (!user) {
        return errorResponse(res, ADMIN_PROFESSOR_MESSAGES.UNAUTHORIZED, 401);
    }

    if (user.role.enumValue !== "Admin" && user.role.enumValue !== "Professor") {
        return errorResponse(res, ADMIN_PROFESSOR_MESSAGES.ACCESS_DENIED, 403);
    }
    
    next();
};