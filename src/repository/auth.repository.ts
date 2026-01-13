import prisma from "../config/prisma";
import { createStudentData } from "../interfaces";

export const findUserByEmailRepo = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
      deletedAt: null,
    },
    include: {
      role: true,
    },
  });
};

// signup only for student

export const createStudentUserRepo = async (data: createStudentData) => {
  return prisma.user.create({ data });
};
