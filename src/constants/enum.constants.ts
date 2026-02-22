export const ENUM_TYPE = {
  ROLE: "ROLE",
  BRANCH: "BRANCH",
  SEMESTER: "SEMESTER",
  YEAR: "YEAR",
  ASSIGNMENT_STATUS: "ASSIGNMENT_STATUS",
  STATUS_ENUM: "STATUS_ENUM",
  NOTIFICATION_TYPE: "NOTIFICATION_TYPE",
  NOTIFICATION_READ_STATUS: "NOTIFICATION_READ_STATUS",
} as const;

export const ROLE_ENUM = [
  "SuperAdmin",
  "Admin",
  "Professor",
  "Student",
] as const;

export const BRANCH_ENUM = [
  "Computer Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
] as const;

export const SEMESTER_ENUM = [
  "Semester 1",
  "Semester 2",
  "Semester 3",
  "Semester 4",
  "Semester 5",
  "Semester 6",
  "Semester 7",
  "Semester 8",
] as const;

export const YEAR_ENUM = [
  "First Year",
  "Second Year",
  "Third Year",
  "Fourth Year",
] as const;

export const ASSIGNMENT_STATUS_ENUM = [
  "Pending",
  "In Process",
  "Completed",
] as const;

export const STATUS_ENUM = ["Active", "Inactive"] as const;

export const NOTIFICATION_TYPE_ENUM = [
  "ACCOUNT",
  "ASSIGNMENT",
  "STATUS",
  "PROFESSOR",
] as const;

export const NOTIFICATION_READ_STATUS_ENUM = ["UNREAD", "READ"] as const;
