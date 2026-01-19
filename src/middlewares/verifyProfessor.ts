import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response";
import { TOKEN_MESSAGES } from "../constants/messages";

// Extend express request to include user
interface AuthRequest extends Request {
    user?: {
        id: number;
        name: string;
        email: string;
        roleId: number;
        branchId: number;
    };
} 
export const verifyProfessor = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return errorResponse(res, TOKEN_MESSAGES.NO_TOKEN, 401);
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return errorResponse(res, TOKEN_MESSAGES.MALFORMED_TOKEN, 401);
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };

        // Find User
        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        });

        if (!user) {
            return errorResponse(res, TOKEN_MESSAGES.USER_NOT_FOUND, 404);
        }

        // Check admin role
        if (user.roleId !== 3) {
            return errorResponse(res, TOKEN_MESSAGES.ACCESS_DENIED_PROF, 403);
        }

        req.user = user; // store user info

        next();
    } catch (error) {
        console.error(error);
        return errorResponse(res, TOKEN_MESSAGES.INVALID_TOKEN, 401);
    }
}