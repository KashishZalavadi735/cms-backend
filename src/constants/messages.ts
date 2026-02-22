export const TOKEN_MESSAGES = {
  NO_TOKEN: "No token provided",
  INVALID_TOKEN: "Invalid token",
  MALFORMED_TOKEN: "Malformed token",
  ACCESS_DENIED_SA: "Access denied. SuperAdmin Only.",
  ACCESS_DENIED_ADMIN: "Access denied. Admin Only.",
  ACCESS_DENIED_PROF: "Access denied. Professor Only.",
  ACCESS_DENIED_STUD: "Access denied. Student Only.",
  ACCESS_DENIED_ADMIN_PROF: "Access denied. Admin and Professor Only."
};

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Login successful",
  SIGNUP_SUCCESS: "Student registered successfully",
  INVALID_CREDENTIALS: "Invalid email or password",
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


export const SET_PASSWORD_MESSAGES = {
  PASSWORD: "Password set successfully",
  ALREADY_SET_PASSWORD: "Password already set",
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
  ADMIN_CREATE_PROFESSOR:
  "Admin can only create professors of their own branch",
  BRANCH_UPDATE: "Branch cannot be updated",
  PROFESSOR_ROLE: "ROLE.PROFESSOR not configured",
};

export const STUDENT_MESSAGES = {
  STUDENTS: "Students fetched successfully",
  BRANCHID_MISSING: "Branch ID missing",
};

export const ASSIGNMENT_MESSAGES = {
  ASSIGNMENT_CREATE: "Assignment created successfully",
  ASSIGNMENT_STATUS_UPDATED: "Assignment status updated successfully",
  ASSIGNMENTS: "Assignments fetched successfully",
};

export const PROFILE_MESSAGES = {
  SUPER_ADMIN: "Super admin profile fetched successfully",
  ADMIN: "Admin profile fetched successfully",
  PROFESSOR: "Professor profile fetched successfully",
  STUDENT: "Student profile fetched successfully",
  UPDATE: "Profile updated successfully",
};

export const SUMMARY_MESSAGES = {
  ADMIN_SUMMARY: "Admin summary fetched successfully",
  PROFESSOR_SUMMARY: "Professor summary fetched successfully",
  ASSIGNMENT_SUMMARY: "Assignments summary fetched successfully",
};

export const DASHBOARD_MESSAGES = {
  CARDS: "Dashboard statistics fetched successfully",
};

export const NOTIFICATION_MESSAGES = {
  FETCHED: "Notifications fetched successfully",
  FAILED_FETCHED: "Failed to fetch notifications",
  COUNT: "Unread notification count fetched",
  FAILED_COUNT: "Failed to fetch unread count",
  MARK_AS_READ: "Notification marked as read",
  FAILED_MARK_AS_READ: "Failed to mark notification as read",
};

export const ENUM_MESSAGES = {
  FETCHED: "Enums fetched successfully",
  FAILED: "Failed to fetch enums",
};

export const FIELDS_MESSAGES = {
  REQUIRED_FIELDS: "All fields are required",
};

export const SERVER_MESSAGES = {
  SERVER_ERROR: "Internal server error",
};

export const USER_MESSAGES = {
  USER_NOT_FOUND: "User not found",
};

export const UNAUTHORIZED_MESSAGES = {
  UNAUTHORIZED: "Unauthorized Access",
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
