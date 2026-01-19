export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Login successful",
  SIGNUP_SUCCESS: "Student registered successfully",
  INVALID_CREDENTIALS: "Invalid email or password",
  EMAIL_EXISTS: "Email already registered",
  REQUIRED_FIELDS: "All fields are required",
  SERVER_ERROR: "Internal server error",
};

export const TOKEN_MESSAGES = {
  NO_TOKEN: "No token provided",
  INVALID_TOKEN: "Invalid token",
  MALFORMED_TOKEN: "Malformed token",
  USER_NOT_FOUND: "User not found",
  ACCESS_DENIED_SA: "Access denied. SuperAdmin Only.",
  ACCESS_DENIED_ADMIN: "Access denied. Admin Only.",
  ACCESS_DENIED_PROF: "Access denied. Professor Only.",
  ACCESS_DENIED_STUD: "Access denied. Student Only.",
};

export const ADMIN_MESSAGES = {
  ADMIN_CREATE: "Admin created successfully",
  ADMINS: "All Admins fetched successfully",
  ADMIN: "Admin fetched successfully",
  ADMIN_UPDATE: "Admin updated successfully",
  ADMIN_DELETE: "Admin deleted successfully",
  ADMIN_NOT_FOUND: "Admin not found",
  FAILED_UPDATE: "Failed to update admin",
  SERVER_ERROR: "Internal server error",
  EMAIL_EXISTS: "Email already exists",
};

export const PROFESSOR_MESSAGES = {
  PROFESSOR_CREATE: "Professor created successfully",
  PROFESSORS: "All Professors fetched successfully",
  PROFESSOR: "Professor fetched successfully",
  PROFESSOR_UPDATE: "Professor updated successfully",
  PROFESSOR_DELETE: "Professor deleted successfully",
  PROFESSOR_NOT_FOUND: "Professor not found",
  FAILED_UPDATE: "Failed to update professor",
  FAILED_DELETE: "Failed to delete professor",
  SERVER_ERROR: "Internal server error",
  EMAIL_EXISTS: "Email already exists",
  ADMIN_CREATE_PROFESSOR: "Admin can only create professors of their own branch",
  BRANCH_UPDATE: "Branch cannot be updated",
};

export const STUDENT_MESSAGES = {
  STUDENTS: "Students fetched successfully",
  SERVER_ERROR: "Internal server error",
  BRANCHID_MISSING: "Branch ID missing for professor"
};