// Login response
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Student signup
export interface SignupStudentData {
  name: string;
  email: string;
  contactNumber: string;
  password: string;
  branchId: string;
  semesterId: string;
  yearId: string;
}

export interface CreateStudentData extends SignupStudentData {
  roleId: string;
  statusId: string;
  code: string;
}

// Student data
export interface createStudentData {
  name: string;
  email: string;
  contactNumber: string;
  password: string;
  branchId: string;
  semesterId: string;
  yearId: string;
  roleId: string;
  statusId: string;
  code: string;
}

// Admin interfaces
export interface CreateAdminInput {
  name: string;
  email: string;
  contactNumber: string;
  branchValue: string;
  statusId: string;
}

// Professor interface
export interface CreateProfessorInput {
  name: string;
  email: string;
  contactNumber: string;
  branchValue: string;
  statusId: string;
  subjectIds: string[];
}

// User payload interface
export interface UserPayload {
  id: string;
  name: string;
  code: string;
  roleId: string;
  branchId: string;
  semesterId?: string;
  yearId?: string;
}

// Assignment interface
export interface CreateAssignmentInput {
  title: string;
  description: string;
  dueDate: string;
  attachment: string;
  subjectId: string;
  semesterId: string;
}

export interface CreateAssignmentRepo {
  title: string;
  description: string;
  dueDate: Date;
  attachment: string;
  subjectId: string;
  semesterId: string;
  branchId: string;
  createdById: string;
}

// Student assignment
export interface StudentAssignmentFilter {
  semesterId: string;
  branchId: string;
}

// Update assignment Status
export interface UpdateAssignmentStatus {
  assignmentId: string;
  studentId: string;
  statusId: string;
}