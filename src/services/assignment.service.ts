import path from "path";
import { CreateAssignmentInput, UserPayload } from "../interfaces";
import {
  createAssignmentRepo,
  professorSubjectRepo,
  getProfessorSubjectsRepo,
  getSubjectsByBranchSemesterRepo,
  getAssignmentsForStudentRepo,
  updateAssignmentStatusRepo,
  findStudentRepo,
  findAssignmentCreatorRepo,
  findUserBasicInfoRepo,
  getAssignmentSummaryRepo,
} from "../repository/assignment.repository";
import { notifyUser } from "./notifications.service";
import { NOTIFICATION_TYPES } from "../constants/notificationTypes";

const ROLE_PROFESSOR = 3;

// Assignment summary
export const getAssignmentSummaryService = async (user: UserPayload) => {
  const now = new Date();

  const weekEnd = new Date();
  weekEnd.setDate(now.getDate() + 7);

  return await getAssignmentSummaryRepo(user.id, now, weekEnd);
};

// Assign Assignment (Admin & Professor)
export const createAssignmentService = async (
  user: UserPayload,
  data: CreateAssignmentInput,
) => {
  const { title, description, dueDate, attachment, subjectId, semesterId } =
    data;

  // Convert to numbers
  const subjectIdNum = Number(subjectId);
  const semesterIdNum = Number(semesterId);

  if (Number.isNaN(subjectIdNum) || Number.isNaN(semesterIdNum)) {
    throw new Error("Invalid subject or semester ID");
  }
  // Business rule → Professor can assign only own subjects
  if (user.roleId === ROLE_PROFESSOR) {
    const isAllowed = await professorSubjectRepo(user.id, subjectIdNum);

    if (!isAllowed) {
      throw new Error("You are not assigned to this subject");
    }
  }

  const createdAssignment = await createAssignmentRepo({
    title,
    description,
    dueDate: new Date(dueDate),
    attachment: data.attachment,
    subjectId: subjectIdNum,
    semesterId: semesterIdNum,
    branchId: user.branchId,
    createdById: user.id,
  });

  // Notification for student
  const students = await findStudentRepo(user.branchId, semesterIdNum);

  if (students.length > 0) {
    await notifyUser({
      title: "New Assignment",
      message: `A new assignment "${title}" has been added.`,
      typeEnumValue: NOTIFICATION_TYPES.ASSIGNMENT,
      userIds: students.map((s) => s.id),
    });
  }

  return createdAssignment;
};

// Assignement Subjects
export const getSubjectsForAssignmentService = async (
  user: UserPayload,
  semesterId: number,
) => {
  // For Professor
  if (user.roleId === ROLE_PROFESSOR) {
    return getProfessorSubjectsRepo(user.id, user.branchId, semesterId);
  }

  // For Admin
  return getSubjectsByBranchSemesterRepo(user.branchId, semesterId);
};

// View assignments (students)
export const getAssignmentsForStudentService = async (student: UserPayload) => {
  if (!student.semesterId) {
    throw new Error("Student semester not assigned");
  }

  const assignments = await getAssignmentsForStudentRepo({
    branchId: student.branchId,
    semesterId: student.semesterId,
    studentId: student.id,
  });

  //  Normalize response (single status object)
  return assignments.map((a) => ({
    id: a.id,
    title: a.title,
    dueDate: a.dueDate,
    subject: a.subject,
    semester: a.semester,
    description: a.description,
    createdAt: a.createdAt,
    status: a.statuses[0]?.status?.enumValue ?? "Pending",
    attachment: a.attachment
      ? `${process.env.BACKEND_URL}/api/assignment/download/${path.basename(
          a.attachment,
        )}`
      : null,
  }));
};

// Change assignement status (students)
export const updateAssignmentStatusService = async (
  student: UserPayload,
  assignmentId: number,
  statusId: number,
) => {
  const updatedStatus = await updateAssignmentStatusRepo({
    assignmentId,
    studentId: student.id,
    statusId,
  });

  // Notification to assignment creator
  const assignment = await findAssignmentCreatorRepo(assignmentId);

  if (assignment?.createdById) {
    const studentInfo = await findUserBasicInfoRepo(student.id);

    await notifyUser({
      title: "Assignment Status Updated",
      message: `Student ${studentInfo?.code} updated status for "${assignment.title}".`,
      typeEnumValue: NOTIFICATION_TYPES.STATUS,
      userIds: [assignment.createdById],
    });
  }

  return updatedStatus;
};
