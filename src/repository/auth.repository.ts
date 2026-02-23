import prisma from "../config/prisma";
import { createStudentData } from "../interfaces";

// Find user
export const findUserByEmailRepo = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email
    },
    include: {
      role: true,
      branch: true,
      status: true
    },
  });
};

// signup only for student
export const createStudentUserRepo = async (data: createStudentData) => {
  return prisma.user.create({ data });
};