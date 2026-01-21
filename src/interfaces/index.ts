export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export interface SignupStudentData {
  name: string;
  email: string;
  contactNumber: string;
  password: string;
  branchId: number;
  semesterId: number;
  yearId: number;
}

export interface createStudentData {
  name: string;
  email: string;
  contactNumber: string;
  password: string;
  branchId: number;
  semesterId: number;
  yearId: number;
  roleId: number;
}

// Admin interfaces

export interface CreateAdminInput {
  name: string;
  email: string;
  contactNumber: string;
  branchValue: string;
  statusId: number;
}

// Professor interface

export interface CreateProfessorInput {
  name: string;
  email: string;
  contactNumber: string;
  branchValue: string;
  statusId: number;
  subjectIds: number[];
}

// User payload interface
export interface UserPayload {
  id: number;
  roleId: number;
  branchId: number;
  semesterId?: number;
  yearId?: number;
}

// Assignment interface
export interface CreateAssignmentInput {
  title: string;
  description: string;
  dueDate: string;
  attachment: string;
  subjectId: number;
  semesterId: number;
}

export interface CreateAssignmentRepo {
  title: string;
  description: string;
  dueDate: Date;
  attachment: string;
  subjectId: number;
  semesterId: number;
  branchId: number;
  createdById: number;
}

// Student assignment
export interface StudentAssignmentFilter {
  semesterId: number;
  branchId: number;
}

// Update assignment Status
export interface UpdateAssignmentStatus {
  assignmentId: number;
  studentId: number;
  statusId: number;
}