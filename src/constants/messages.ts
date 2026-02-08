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

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Login successful",
  SIGNUP_SUCCESS: "Student registered successfully",
  INVALID_CREDENTIALS: "Invalid email or password",
  REQUIRED_FIELDS: "All fields are required",
};

export const OTP_MESSAGES = {
  SEND_OTP: "OTP sent successfully",
  VERIFY_OTP: "OTP verified successfully",
  INVALID_OTP: "Invalid or expired OTP",
  NOT_VALID: "OTP not verified",
};

export const CHANGE_PASSWORD_MESSAGES = {
  CHANGE_PASSWORD: "Password changed successfully",
  PASSWORD_NOT_MATCH: "Password do not match",
};

export const USER_MESSAGES = {
  USER_NOT_FOUND: "User not found",
};

export const SET_PASSWORD_MESSAGES = {
  REQUIRED_FIELDS: "All fields are required",
  PASSWORD: "Password set successfully",
  ALREADY_SET_PASSWORD: "Password already set",
};

export const SERVER_MESSAGES = {
  SERVER_ERROR: "Internal server error",
};

export const EMAIL_MESSAGES = {
  EMAIL_EXISTS: "Email already exists",
};

export const SUBJECT_MESSAGES = {
  SUBJECT: "Subjects fetched successfully",
};

export const BRANCH_MESSAGE = {
  INVALID: "Invalid branch",
};

export const ADMIN_MESSAGES = {
  ADMIN_CREATE: "Admin created successfully",
  ADMINS: "All Admins fetched successfully",
  ADMIN: "Admin fetched successfully",
  ADMIN_UPDATE: "Admin updated successfully",
  ADMIN_DELETE: "Admin deleted successfully",
  ADMIN_NOT_FOUND: "Admin not found",
  FAILED_UPDATE: "Failed to update admin",
  FAILED_DELETE: "Failed to delete admin",
  ADMIN_ROLE: "ROLE.ADMIN not configured",
};

export const PROFESSOR_MESSAGES = {
  PROFESSOR_CREATE: "Professor created successfully",
  PROFESSORS: "All Professors fetched successfully",
  PROFESSOR: "Professor fetched successfully",
  PROFESSOR_UPDATE: "Professor updated successfully",
  PROFESSOR_DELETE: "Professor deleted successfully",
  PROFESSOR_SUBJECT_UPDATE: "Professor subjects updated successfully",
  PROFESSOR_NOT_FOUND: "Professor not found",
  FAILED_UPDATE: "Failed to update professor",
  FAILED_DELETE: "Failed to delete professor",
  SERVER_ERROR: "Internal server error",
  EMAIL_EXISTS: "Email already exists",
  ADMIN_CREATE_PROFESSOR:
    "Admin can only create professors of their own branch",
  BRANCH_UPDATE: "Branch cannot be updated",
};

export const STUDENT_MESSAGES = {
  STUDENTS: "Students fetched successfully",
  BRANCHID_MISSING: "Branch ID missing",
};

export const ADMIN_PROFESSOR_MESSAGES = {
  UNAUTHORIZED: "Unauthorized",
  ACCESS_DENIED: "Access denied",
};

export const ASSIGNMENT_MESSAGES = {
  ASSIGNMENT_CREATE: "Assignment created successfully",
  ASSIGNMENT_STATUS_UPDATED: "Assignment status updated successfully",
  ASSIGNMENTS: "Assignments fetched successfully",
  SERVER_ERROR: "Internal server error",
};

export const PROFILE_MESSAGES = {
  SUPER_ADMIN: "Super admin profile fetched successfully",
  ADMIN: "Admin profile fetched successfully",
  PROFESSOR: "Professor profile fetched successfully",
  STUDENT: "Student profile fetched successfully",
  UPDATE: "Profile updated successfully",
};

export const ENUM_MESSAGES = {
  FETCHED: "Enums fetched successfully",
  FAILED: "Failed to fetch enums",
};

export const DASHBOARD_MESSAGES = {
  CARDS: "Dashboard statistics fetched successfully",
};
