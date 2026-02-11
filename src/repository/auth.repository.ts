import prisma from "../config/prisma";
import { createStudentData } from "../interfaces";

// Find user
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

// signup only for student
export const createStudentUserRepo = async (data: createStudentData) => {
  return prisma.user.create({ data });
};