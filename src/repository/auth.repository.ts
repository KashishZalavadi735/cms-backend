import prisma from "../config/prisma";

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
interface SignupData {
  name: string;
  email: string;
  contactNumber: string;
  password: string;
  branchId: number;
  semesterId: number;
  yearId: number;
  roleId: number;
}

export const createStudentUserRepo = async (data: SignupData) => {
  return prisma.user.create({ data });
};
