import prisma from "../config/prisma";
import {
  CreateAssignmentRepo,
  StudentAssignmentFilter,
  UpdateAssignmentStatus,
} from "../interfaces";

// Assignment summary
export const getAssignmentSummaryRepo = async (
  createdById: string,
  now: Date,
  weekEnd: Date,
) => {
  // Recent assignment
  const recentAssignment = prisma.assignment.findMany({
    where: {
      createdById,
      deletedAt: { isSet: false },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: {
      subject: true,
      semester: true,
    },
  });

  const total = await prisma.assignment.count({
    where: { createdById, deletedAt: { isSet: false } },
  });

  const active = await prisma.assignment.count({
    where: {
      createdById,
      deletedAt: { isSet: false },
      dueDate: { gte: now },
    },
  });

  const dueThisWeek = await prisma.assignment.count({
    where: {
      createdById,
      deletedAt: { isSet: false },
      dueDate: {
        gte: now,
        lte: weekEnd,
      },
    },
  });

  return {
    total,
    active,
    dueThisWeek,
    recentAssignment: (await recentAssignment).map((a) => ({
      id: a.id,
      title: a.title,
      subject: a.subject,
      semester: a.semester,
      dueDate: a.dueDate,
    })),
  };
};

// Assign Assignment (Admin & Professor)
export const professorSubjectRepo = async (
  professorId: string,
  subjectId: string,
) => {
  return prisma.professorSubject.findFirst({
    where: {
      professorId,
      subjectId,
    },
    select: {
      id: true,
    },
  });
};

export const createAssignmentRepo = async (data: CreateAssignmentRepo) => {
  return prisma.assignment.create({
    data,
  });
};

// Assignement Subjects

// Professor → only assigned subjects
export const getProfessorSubjectsRepo = async (
  professorId: string,
  branchId: string,
  semesterId: string,
) => {
  return prisma.subject.findMany({
    where: {
      semesterId,
      branchId,
      professors: {
        some: {
          professorId,
        },
      },
    },
  });
};

// Admin → all subjects of branch + semester
export const getSubjectsByBranchSemesterRepo = async (
  branchId: string,
  semesterId: string,
) => {
  return prisma.subject.findMany({
    where: {
      semesterId,
      branchId,
    },
  });
};

// View assignments (students)
export const getAssignmentsForStudentRepo = async (
  filters: StudentAssignmentFilter & { studentId: string },
) => {
  return prisma.assignment.findMany({
    where: {
      branchId: filters.branchId,
      semesterId: filters.semesterId,
      deletedAt: { isSet: false },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      subject: true,
      semester: true,
      createdBy: {
        select: {
          id: true,
          name: true,
          roleId: true,
        },
      },
      statuses: {
        where: {
          studentId: filters.studentId,
        },
        include: {
          status: true,
        },
      },
    },
  });
};

// Change assignement status (students)
export const updateAssignmentStatusRepo = async (
  data: UpdateAssignmentStatus,
) => {
  const { assignmentId, studentId, statusId } = data;

  return prisma.assignmentStatus.upsert({
    where: {
      studentId_assignmentId: {
        studentId,
        assignmentId,
      },
    },
    update: {
      statusId,
    },
    create: {
      assignmentId,
      studentId,
      statusId,
    },
  });
};

// Find studnets
export const findStudentRepo = async (branchId: string, semesterId: string) => {
  return prisma.user.findMany({
    where: {
      role: {
        enumValue: "STUDENT",
      },
      branchId,
      semesterId,
    },
    select: {
      id: true,
    },
  });
};

// Fetch assignment creator
export const findAssignmentCreatorRepo = async (assignmentId: string) => {
  return prisma.assignment.findUnique({
    where: {
      id: assignmentId,
    },
    select: {
      createdById: true,
      title: true,
    },
  });
};

// Find user name
export const findUserBasicInfoRepo = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      code: true,
    },
  });
};
