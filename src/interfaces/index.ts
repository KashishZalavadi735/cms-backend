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