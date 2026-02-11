import prisma from "../config/prisma";

// Find User
export const findUserByEmailRepo = async (email: string) => {
  return prisma.user.findFirst({
    where: {
      email,
      deletedAt: null,
    },
    include: {
      role: true,
      branch: true,
    },
  });
};

// Save OTP
export const saveOtpRepo = async (
  userId: number,
  otp: string,
  expiresAt: Date,
) => {
  return prisma.userOtp.create({
    data: {
      userId,
      otp,
      expiresAt,
    },
  });
};

// Find valid OTP 
export const findValidOtpRepo = async (
  userId: number,
  otp: string,
) => {
  return prisma.userOtp.findFirst({
    where: {
      userId,
      otp,
      verified: false,
      expiresAt: { gt: new Date() },
    },
  });
};

// Verify OTP
export const verifyOtpRepo = async (id: number) => {
  return prisma.userOtp.update({
    where: { id },
    data: { verified: true },
  });
};

// Change password
export const changeUserPasswordRepo = async (
  userId: number,
  hashedPassword: string,
) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
    },
  });
};
