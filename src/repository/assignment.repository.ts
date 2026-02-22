import prisma from "../config/prisma";
import {
  CreateAssignmentRepo,
  StudentAssignmentFilter,
  UpdateAssignmentStatus,
} from "../interfaces";

// Assignment summary
export const getAssignmentSummaryRepo = async (
  createdById: number,
  now: Date,
  weekEnd: Date,
) => {
  // Recent assignment
  const recentAssignment = prisma.assignment.findMany({
    where: {
      createdById,
      deletedAt: null,
    },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: {
      
      subject: true,
      semester: true,
    },
  });

  const total = await prisma.assignment.count({
    where: { createdById, deletedAt: null },
  });

  const active = await prisma.assignment.count({
    where: {
      createdById,
      deletedAt: null,
      dueDate: { gte: now },
    },
  });

  const dueThisWeek = await prisma.assignment.count({
    where: {
      createdById,
      deletedAt: null,
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
  professorId: number,
  subjectId: number,
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
  professorId: number,
  branchId: number,
  semesterId: number,
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
  branchId: number,
  semesterId: number,
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
  filters: StudentAssignmentFilter & { studentId: number },
) => {
  return prisma.assignment.findMany({
    where: {
      branchId: filters.branchId,
      semesterId: filters.semesterId,
      deletedAt: null,
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
export const findStudentRepo = async (branchId: number, semesterId: number) => {
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
export const findAssignmentCreatorRepo = async (assignmentId: number) => {
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
export const findUserBasicInfoRepo = async (userId: number) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      code: true,
    },
  });
};
