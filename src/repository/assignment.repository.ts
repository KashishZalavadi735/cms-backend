import prisma from "../config/prisma";
import {
  CreateAssignmentRepo,
  StudentAssignmentFilter,
  UpdateAssignmentStatus,
} from "../interfaces";

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
