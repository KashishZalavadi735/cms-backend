import prisma from "../config/prisma";

// My Profile
export const findMyProfileRepo = async (userId: number) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      contactNumber: true,
      role: true,
      code: true,
      branch: true,
      semester: true,
      year: true,
    },
  });
};

// Update My Profile
export const updateMyProfileRepo = async (
  userId: number,
  data: {
    name: string;
    email: string;
    contactNumber: string;
    password?: string;
  },
) => {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      contactNumber: true,
      role: true,
      code: true,
    },
  });
};

// Dashboard stats
export const professorRepo = async (branchId: number) => {
  return prisma.user.count({
    where: {
      role: {
        enumValue: "Professor",
      },
      branchId,
      deletedAt: null,
    },
  });
};

export const departmentAdminRepo = async (branchId: number) => {
  return prisma.user.count({
    where: {
      role: {
        enumValue: "Admin",
      },
      branchId,
      deletedAt: null,
    },
  });
};

export const activeAssignmentsRepo = async (branchId: number) => {
  return prisma.assignment.count({
    where: {
      branchId,
      deletedAt: null,
      dueDate: {
        gte: new Date(),
      },
    },
  });
};

export const completedAssignmentsRepo = async (branchId: number) => {
  const completedStatus = await prisma.enumTable.findUnique({
    where: {
      enumType_enumValue: {
        enumType: "ASSIGNMENT_STATUS",
        enumValue: "Completed",
      },
    },
  });

  if (!completedStatus) return 0;

  return prisma.assignmentStatus.count({
    where: {
      statusId: completedStatus.id,
      assignment: {
        branchId,
        deletedAt: null,
      },
    },
  });
};

export const getAssignmentsDueThisWeekRepo = async (branchId: number) => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  return prisma.assignment.count({
    where: {
      deletedAt: null,
      branchId,
      dueDate: {
        gte: today,
        lte: nextWeek,
      },
    },
  });
};

export const getDepartmentsRepo = async (branchId: number) => {
  const department = await prisma.enumTable.findUnique({
    where: { id: branchId },
    select: { enumValue: true },
  });

  return department?.enumValue || "";
};