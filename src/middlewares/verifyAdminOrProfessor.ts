import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import { errorResponse } from "../utils/response";
import { ADMIN_PROFESSOR_MESSAGES } from "../constants/messages";
import { EnumTable } from "@prisma/client";

interface AuthRequest extends Request {
  user?: {
    id: number;
    roleId: number;
    branchId: number;
    semesterId?: number;
    role: EnumTable;
  };
}

export const verifyAdminOrProfessor = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, ADMIN_PROFESSOR_MESSAGES.UNAUTHORIZED, 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        role: true,
      },
    });

    if (!user) {
      return errorResponse(res, ADMIN_PROFESSOR_MESSAGES.UNAUTHORIZED, 401);
    }

    if (
      user.role.enumValue !== "Admin" &&
      user.role.enumValue !== "Professor"
    ) {
      return errorResponse(res, ADMIN_PROFESSOR_MESSAGES.ACCESS_DENIED, 403);
    }

    req.user = {
      id: user.id,
      roleId: user.roleId,
      branchId: user.branchId,
      semesterId: user.semesterId ?? undefined,
      role: user.role,
    };

    next();
  } catch (error) {
    return errorResponse(res, ADMIN_PROFESSOR_MESSAGES.UNAUTHORIZED, 401);
  }
};