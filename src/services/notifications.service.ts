import prisma from "../config/prisma";
import {
  createNotificationRepo,
  getMyNotificationsRepo,
  getUnreadCountRepo,
  markAsReadRepo,
} from "../repository/notifications.repository";

export const notifyUser = async ({
  title,
  message,
  typeEnumValue,
  userIds,
}: {
  title: string;
  message: string;
  typeEnumValue: string;
  userIds: number[];
}) => {
  if (!userIds.length) return;

  // Fetch enums
  const [typeEnum, unreadEnum] = await Promise.all([
    prisma.enumTable.findUnique({
      where: {
        enumType_enumValue: {
          enumType: "NOTIFICATION_TYPE",
          enumValue: typeEnumValue,
        },
      },
    }),
    prisma.enumTable.findUnique({
      where: {
        enumType_enumValue: {
          enumType: "NOTIFICATION_READ_STATUS",
          enumValue: "UNREAD",
        },
      },
    }),
  ]);

  if (!typeEnum || !unreadEnum) {
    throw new Error("Notification enums not found");
  }

  // Create notification for each user
  await Promise.all(
    userIds.map((userId) =>
      createNotificationRepo(
        title,
        message,
        typeEnum.id,
        unreadEnum.id,
        userId,
      ),
    ),
  );
};

export const getMyNotificationsService = async (userId: number) => {
  return getMyNotificationsRepo(userId);
};

export const getUnreadCountService = async (userId: number) => {
  const unreadEnum = await prisma.enumTable.findUnique({
    where: {
      enumType_enumValue: {
        enumType: "NOTIFICATION_READ_STATUS",
        enumValue: "UNREAD",
      },
    },
  });

  if (!unreadEnum) return 0;

  return getUnreadCountRepo(userId, unreadEnum.id);
};

export const markAsReadService = async (
  userId: number,
  notificationId: number,
) => {
  const readEnum = await prisma.enumTable.findUnique({
    where: {
      enumType_enumValue: {
        enumType: "NOTIFICATION_READ_STATUS",
        enumValue: "READ",
      },
    },
  });

  if (!readEnum) return;

  return markAsReadRepo(userId, notificationId, readEnum.id);
};
