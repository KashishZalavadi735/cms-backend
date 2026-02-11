import prisma from "../config/prisma";

// Find user by password token
export const findUserByPasswordTokenRepo = async (hashedToken: string) => {
  return prisma.user.findFirst({
    where: {
      passwordSetupToken: hashedToken,
      passwordSetupExpiresAt: {
        gt: new Date(),
      },
    },
  });
};

// Update user password
export const updateUserPasswordRepo = async (
  userId: number,
  hashedPassword: string,
) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
      passwordSetupToken: null,
      passwordSetupExpiresAt: null,
    },
  });
};