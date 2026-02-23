import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import {
  EMAIL_MESSAGES,
  FIELDS_MESSAGES,
  UNAUTHORIZED_MESSAGES,
} from "../constants/messages";
import {
  findMyProfileRepo,
  updateMyProfileRepo,
  totalStudentsRepo,
  activeAssignmentsRepo,
  departmentAdminRepo,
  completedAssignmentsRepo,
  getAssignmentsDueThisWeekRepo,
  getDepartmentsRepo,
} from "../repository/professor.repository";

// My profile
export const getMyProfileService = async (userId: string) => {
  return await findMyProfileRepo(userId);
};

// Update My Profile
export const updateMyProfileService = async (
  userId: string,
  data: {
    name: string;
    email: string;
    contactNumber: string;
    newPassword?: string;
  },
) => {
  const { name, email, contactNumber, newPassword } = data;

  if (!name || !email || !contactNumber) {
    throw new Error(FIELDS_MESSAGES.REQUIRED_FIELDS);
  }

  // Ensure PROFESSOR role
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      role: { select: { enumValue: true } },
      password: true,
    },
  });

  if (user?.role.enumValue !== "Professor") {
    throw new Error(UNAUTHORIZED_MESSAGES.UNAUTHORIZED);
  }

  // Email uniqueness check
  const emailExists = await prisma.user.findFirst({
    where: {
      email,
      NOT: { id: userId },
    },
  });

  if (emailExists) {
    throw new Error(EMAIL_MESSAGES.EMAIL_EXISTS);
  }

  const updateData: any = {
    name,
    email,
    contactNumber,
  };

  // Password update (optional)
  if (newPassword) {
    if (newPassword.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    updateData.password = await bcrypt.hash(newPassword, 10);
  }

  return await updateMyProfileRepo(userId, updateData);
};

// Dashboard Stats
export const getDashboardStatsService = async (branchId: string) => {
  const totalStudents = await totalStudentsRepo(branchId);

  const activeAssignments = await activeAssignmentsRepo(branchId);

  const admin = await departmentAdminRepo(branchId);

  const completedAssignments = await completedAssignmentsRepo(branchId);

  const dueThisWeek = await getAssignmentsDueThisWeekRepo(branchId);

  const department = await getDepartmentsRepo(branchId);

  return {
    totalStudents,
    admin,
    activeAssignments,
    completedAssignments,
    dueThisWeek,
    department,

    // later you can calculate real growth
    usersGrowth: 12,
    completedGrowth: 23,
  };
};
