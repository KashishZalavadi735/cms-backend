import prisma from "../config/prisma";

export const createNotificationRepo = async (
  title: string,
  message: string,
  typeId: number,
  readStatusId: number,
  userId: number,
) => {
  return prisma.notification.create({
    data: { title, message, typeId, readStatusId, userId },
  });
};

export const getMyNotificationsRepo = async (userId: number) => {
  return prisma.notification.findMany({
    where: { userId },
    include: {
      type: true,
      readStatus: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getUnreadCountRepo = async (
  userId: number,
  unreadStatusId: number,
) => {
  return prisma.notification.count({
    where: {
      userId,
      readStatusId: unreadStatusId,
    },
  });
};

export const markAsReadRepo = async (
  userId: number,
  notificationId: number,
  readStatusId: number,
) => {
  return prisma.notification.updateMany({
    where: {
      id: notificationId,
      userId,
    },
    data: {
      readStatusId,
    },
  });
};
