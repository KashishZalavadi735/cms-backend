import { Prisma, User } from "@prisma/client";
import prisma from "../config/prisma";
import { BRANCH_MESSAGE } from "../constants/messages";

// Find admin
export const findAdminByEmailRepo = async (
  email: string,
): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

// Find enum
export const findEnumRepo = async (enumType: string, enumValue: string) => {
  return prisma.enumTable.findUnique({
    where: {
      enumType_enumValue: {
        enumType,
        enumValue,
      },
    },
  });
};

// Create admin
export const createAdminRepo = async (
  data: Prisma.UserCreateInput,
): Promise<User> => {
  return prisma.user.create({ data });
};

// Get all admins
export const getAllAdminRepo = async (
  skip: number,
  limit: number,
  search: string,
) => {
  const whereCondition: Prisma.UserWhereInput = {
    role: { enumValue: "Admin" },
    OR: search
      ? [
          { name: { contains: search } },
          { email: { contains: search } },
          { code: { contains: search } },
          { branch: { enumValue: { contains: search } } },
          { status: { enumValue: { contains: search } } },
        ]
      : undefined,
  };

  const [admins, totalCount] = await Promise.all([
    prisma.user.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        branch: true,
        status: true,
      },
    }),

    prisma.user.count({
      where: whereCondition,
    }),
  ]);

  return { admins, totalCount };
};

// Get admin by id
export const getAdminByIdRepo = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      branch: true,
      status: true,
    },
  });
};

// Update admin
export const updateAdminRepo = async (id: number, data: any): Promise<User> => {
  // Destructure only what you need
  const { branchValue, statusId, password, ...rest } = data;

  // Branch relation
  let branchConnect;
  if (branchValue) {
    const branch = await prisma.enumTable.findUnique({
      where: {
        enumType_enumValue: {
          enumType: "BRANCH",
          enumValue: branchValue,
        },
      },
    });

    if (!branch) throw new Error(BRANCH_MESSAGE.INVALID);
    branchConnect = { connect: { id: branch.id } };
  }

  //  Status relation
  let statusConnect;
  if (statusId) {
    statusConnect = { connect: { id: statusId } };
  }

  // Prisma update
  return prisma.user.update({
    where: { id },
    data: {
      ...rest, // only allowed fields: name, email, contactNumber, etc.
      ...(branchConnect && { branch: branchConnect }),
      ...(statusConnect && { status: statusConnect }),
    },
  });
};

// Delete admin
// Soft delete
export const deleteAdminRepo = async (id: number) => {
  return prisma.user.update({
    where: { id: id },
    data: {
      deletedAt: new Date(),
      status: {
        connect: {
          id: 26,
        },
      },
    },
  });
};

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
    },
  });
};

// Update My Profile
export const updateMyProfileRepo = async (
  userId: number,
  data: {
    name: string;
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

// Dashboard Stats
export const totalUsersRepo = async () => {
  return prisma.user.count({
    where: { deletedAt: null },
  });
};

export const professorSubjectRepo = async () => {
  return prisma.user.count({
    where: {
      role: { enumValue: "Professor" },
    },
  });
};

export const activeAssignmentsRepo = async () => {
  return prisma.assignment.count({
    where: {
      deletedAt: null,
      dueDate: {
        gte: new Date(),
      },
    },
  });
};

export const completedAssignmentsRepo = async () => {
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
      deletedAt: null,
    },
  });
};

export const getAssignmentsDueThisWeekRepo = async () => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  return prisma.assignment.count({
    where: {
      deletedAt: null,
      dueDate: {
        gte: today,
        lte: nextWeek,
      },
    },
  });
};

// Admin summary repo
export const getAdminSummaryRepo = async () => {
  // Admin role
  const adminRole = await prisma.enumTable.findUnique({
    where: {
      enumType_enumValue: {
        enumType: "ROLE",
        enumValue: "Admin",
      },
    },
  });

  if (!adminRole) {
    return {
      totalAdmins: 0,
      totalDepartments: 0,
      recentAdmins: [],
    };
  }

  // Total admins
  const totalAdmins = await prisma.user.count({
    where: {
      roleId: adminRole.id,
      deletedAt: null,
    },
  });

  // Total departments
  const totalDepartments = await prisma.enumTable.count({
    where: {
      enumType: "BRANCH",
      deletedAt: null,
    },
  });

  // Recent admins
  const recentAdmins = await prisma.user.findMany({
    where: {
      roleId: adminRole.id,
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
    select: {
      id: true,
      name: true,
      branch: {
        select: {
          enumValue: true,
        },
      },
    },
  });

  return {
    totalAdmins,
    totalDepartments,
    recentAdmins: recentAdmins.map((admin) => ({
      id: admin.id,
      name: admin.name,
      branch: admin.branch.enumValue,
    })),
  };
};

// Department
export const getDepartmentsRepo = async () => {
  return prisma.enumTable.count({
    where: {
      enumType: "BRANCH",
      deletedAt: null,
    },
  });
};
