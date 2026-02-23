import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { errorResponse } from "../utils/response";
import { UNAUTHORIZED_MESSAGES } from "../constants/messages";

interface TokenPayload extends JwtPayload {
  id: string;
  roleId: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    roleId: string;
  };
}

export const verifyAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, UNAUTHORIZED_MESSAGES.UNAUTHORIZED, 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;

    req.user = {
      id: decoded.id,
      roleId: decoded.roleId,
    };

    next();
  } catch (error) {
    return errorResponse(res, UNAUTHORIZED_MESSAGES.UNAUTHORIZED, 401, error);
  }
};