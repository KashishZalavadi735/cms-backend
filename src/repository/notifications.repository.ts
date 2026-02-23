import prisma from "../config/prisma";

export const createNotificationRepo = async (
  title: string,
  message: string,
  typeId: string,
  readStatusId: string,
  userId: string,
) => {
  return prisma.notification.create({
    data: { title, message, typeId, readStatusId, userId },
  });
};

export const getMyNotificationsRepo = async (userId: string) => {
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
  userId: string,
  unreadStatusId: string,
) => {
  return prisma.notification.count({
    where: {
      userId,
      readStatusId: unreadStatusId,
    },
  });
};

export const markAsReadRepo = async (
  userId: string,
  notificationId: string,
  readStatusId: string,
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
