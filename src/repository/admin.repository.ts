import { Prisma, User } from "@prisma/client";
import prisma from "../config/prisma";

// Find Enum
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

// Dashboard stats
export const totalStudentsRepo = async (branchId: string) => {
  return prisma.user.count({
    where: {
      role: {
        enumValue: "Student",
      },
      branchId,
      deletedAt: { isSet: false },
    },
  });
};

export const professorRepo = async (branchId: string) => {
  return prisma.user.count({
    where: {
      role: {
        enumValue: "Professor",
      },
      branchId,
      deletedAt: { isSet: false },
    },
  });
};

export const activeAssignmentsRepo = async (branchId: string) => {
  return prisma.assignment.count({
    where: {
      branchId,
      deletedAt: { isSet: false },
      dueDate: {
        gte: new Date(),
      },
    },
  });
};

export const completedAssignmentsRepo = async (branchId: string) => {
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
        deletedAt: { isSet: false },
      },
    },
  });
};

export const getAssignmentsDueThisWeekRepo = async (branchId: string) => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  return prisma.assignment.count({
    where: {
      deletedAt: { isSet: false },
      branchId,
      dueDate: {
        gte: today,
        lte: nextWeek,
      },
    },
  });
};

export const getDepartmentsRepo = async (branchId: string) => {
  const department = await prisma.enumTable.findUnique({
    where: { id: branchId },
    select: { enumValue: true },
  });

  return department?.enumValue || "";
};

// Find professor by id
export const findProfessorByEmailRepo = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

// Create Professor
export const createProfessorRepo = async (
  data: Prisma.UserCreateInput,
): Promise<User> => {
  return prisma.user.create({ data });
};

// Subject validation
export const findSubjectsByIdsRepo = async (
  subjectIds: string[],
  branchId: string,
) => {
  return prisma.subject.findMany({
    where: {
      id: { in: subjectIds },
      branchId,
      deletedAt: { isSet: false },
    },
  });
};

// Attach subject
export const attachProfessorSubjectRepo = async (
  professorId: string,
  subjectIds: string[],
) => {
  if (!subjectIds || subjectIds.length === 0) return;

  return prisma.professorSubject.createMany({
    data: subjectIds.map((subjectId) => ({
      professorId,
      subjectId,
    })),
  });
};

// Get all Professor
export const getAllProfessorRepo = async (
  skip: number,
  limit: number,
  search: string,
  branchId: string,
) => {
  const whereCondition: Prisma.UserWhereInput = {
    role: { enumValue: "Professor" },
    branchId: branchId,
    OR: search
      ? [
          { name: { contains: search } },
          { email: { contains: search } },
          { code: { contains: search } },
          { status: { enumValue: { contains: search } } },
        ]
      : undefined,
  };

  const [professors, totalCount] = await Promise.all([
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

  return { professors, totalCount };
};

// Get Professor by id
export const getProfessorByIdRepo = async (id: string) => {
  return prisma.user.findFirst({
    where: { id },
    include: {
      branch: true,
      status: true,
      professorSubjects: {
        include: {
          subject: {
            include: {
              semester: true,
            },
          },
        },
      },
    },
  });
};

// Update Professor
export const updateProfessorRepo = async (id: string, data: any) => {
  // Remove branch-related fields
  delete data.branch;
  delete data.branchId;
  delete data.branchValue;

  return prisma.user.update({
    where: { id },
    data,
  });
};

// Delete Professor
// Soft delete
export const deleteProfessorRepo = async (id: string) => {
  return prisma.user.update({
    where: { id: id },
    data: {
      deletedAt: new Date(),
      status: {
        connect: {
          enumType_enumValue: {
            enumType: "STATUS",
            enumValue: "Inactive",
          },
        },
      },
    },
  });
};

// Assign subject to existing professor
export const deleteProfessorSubjectsRepo = async (professorId: string) => {
  return prisma.professorSubject.deleteMany({
    where: { professorId },
  });
};

// Subjects
export const findSubjectsByBranchRepo = async (branchId: string) => {
  return prisma.subject.findMany({
    where: {
      branchId,
      deletedAt: { isSet: false },
    },
    include: {
      semester: true,
    },
    orderBy: {
      semesterId: "asc",
    },
  });
};

// My Profile
export const findMyProfileRepo = async (userId: string) => {
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
    },
  });
};

// Update My Profile
export const updateMyProfileRepo = async (
  userId: string,
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

// Professor summary repo
export const getProfessorSummaryRepo = async (branchId: string) => {
  // Professor role
  const ProfessorRole = await prisma.enumTable.findUnique({
    where: {
      enumType_enumValue: {
        enumType: "ROLE",
        enumValue: "Professor",
      },
    },
  });

  if (!ProfessorRole) {
    return {
      totalProfessors: 0,
      branchName: "",
      totalSubjects: 0,
      recentProfessors: [],
    };
  }

  // Branch name
  const branch = await prisma.enumTable.findUnique({
    where: { id: branchId },
  });

  // Total Professors
  const totalProfessors = await prisma.user.count({
    where: {
      roleId: ProfessorRole.id,
      branchId,
      deletedAt: { isSet: false },
    },
  });

  // Total assigned subjects (COUNT MAPPINGS)
  const totalSubjects = await prisma.professorSubject.count({
    where: {
      professor: {
        branchId,
        deletedAt: { isSet: false },
      },
    },
  });

  // Recent Professors
  const recentProfessors = await prisma.user.findMany({
    where: {
      roleId: ProfessorRole.id,
      branchId,
      deletedAt: { isSet: false },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
    include: {
      professorSubjects: {
        include: {
          subject: true,
        },
      },
    },
  });

  return {
    totalProfessors,
    branchName: branch?.enumValue ?? "",
    totalSubjects,
    recentProfessors: recentProfessors.map((prof) => ({
      id: prof.id,
      name: prof.name,
      subjects: prof.professorSubjects?.map((ps) => ps.subject.name) ?? [],
    })),
  };
};

// Find super admin
export const findSuperAdminRepo = async () => {
  return prisma.user.findFirst({
    where: {
      role: {
        enumValue: "SuperAdmin",
      },
      deletedAt: { isSet: false },
    },
    select: {
      id: true,
    },
  });
};
