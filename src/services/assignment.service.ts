import { CreateAssignmentInput, UserPayload } from "../interfaces";
import {
  createAssignmentRepo,
  professorSubjectRepo,
  getAssignmentsForStudentRepo,
  updateAssignmentStatusRepo,
} from "../repository/assignment.repository";

const ROLE_PROFESSOR = 3;

// Assign Assignment (Admin & Professor)
export const createAssignmentService = async (
  user: UserPayload,
  data: CreateAssignmentInput,
) => {
  const { title, description, dueDate, attachment, subjectId, semesterId } = data;

  // Business rule → Professor can assign only own subjects
  if (user.roleId === ROLE_PROFESSOR) {
    const isAllowed = await professorSubjectRepo(user.id, subjectId);

    if (!isAllowed) {
      throw new Error("You are not assigned to this subject");
    }
  }

  const createdAssignment = await createAssignmentRepo({
    title,
    description,
    dueDate: new Date(dueDate),
    attachment,
    subjectId,
    semesterId,
    branchId: user.branchId,
    createdById: user.id
  });

  return createdAssignment;
};

// View assignments (students)
export const getAssignmentsForStudentService = async (student: UserPayload) => {

  if (!student.semesterId) {
    throw new Error("Student semester not assigned");
  }

  const assignments = await getAssignmentsForStudentRepo({
    branchId: student.branchId, 
    semesterId: student.semesterId,
    studentId: student.id
  });

  //  Normalize response (single status object)
  return assignments.map((assignment) => ({
    ...assignment,
    status: assignment.statuses[0] || null,
    statuses: undefined
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

  return updatedStatus;
};
