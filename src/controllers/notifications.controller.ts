import { Request, Response } from "express";
import {
  getMyNotificationsService,
  getUnreadCountService,
  markAsReadService,
} from "../services/notifications.service";
import { errorResponse, successResponse } from "../utils/response";
import { NOTIFICATION_MESSAGES } from "../constants/messages";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    roleId: string;
  };
}

export const getMyNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const notifications = await getMyNotificationsService(userId);

    return successResponse(
      res,
      NOTIFICATION_MESSAGES.FETCHED,
      notifications,
      200,
    );
  } catch (error: any) {
    return errorResponse(res, NOTIFICATION_MESSAGES.FAILED_FETCHED, 500, error);
  }
};

export const getUnreadCount = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    
    const count = await getUnreadCountService(userId);
    
    return successResponse(
      res,
      NOTIFICATION_MESSAGES.COUNT,
      count,
      200,
    );
    
  } catch (error: any) {
    return errorResponse(res, NOTIFICATION_MESSAGES.FAILED_COUNT, 500, error);
  }
};

export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const notificationId = String(req.params.id);
    
    const markAsRead = await markAsReadService(userId, notificationId);
    
    return successResponse(
      res,
      NOTIFICATION_MESSAGES.MARK_AS_READ,
      markAsRead,
      200,
    );
  } catch (error:any) {
    return errorResponse(res, NOTIFICATION_MESSAGES.FAILED_MARK_AS_READ, 500, error);
  }
};
