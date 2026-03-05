import bcrypt from "bcryptjs";
import {
  ADMIN_MESSAGES,
  BRANCH_MESSAGE,
  EMAIL_MESSAGES,
  FIELDS_MESSAGES,
} from "../constants/messages";
import { CreateAdminInput } from "../interfaces";
import { generateUserCode } from "../utils/generateUserCode";
import { getEmailTemplate } from "../utils/AdminEmailTemplate";
import { sendEmail } from "../utils/sendEmail";
import {
  createAdminRepo,
  findAdminByEmailRepo,
  findEnumRepo,
  getAllAdminRepo,
  getAdminByIdRepo,
  updateAdminRepo,
  deleteAdminRepo,
  findMyProfileRepo,
  updateMyProfileRepo,
  totalUsersRepo,
  professorSubjectRepo,
  activeAssignmentsRepo,
  completedAssignmentsRepo,
  getAssignmentsDueThisWeekRepo,
  getAdminSummaryRepo,
  getDepartmentsRepo,
} from "../repository/superAdmin.repository";
import { createSetPasswordLink } from "../utils/createSetPasswordLink";
import { notifyUser } from "./notifications.service";
import { NOTIFICATION_TYPES } from "../constants/notificationTypes";

// Dashboard Stats
export const getDashboardStatsService = async () => {
  const totalUsers = await totalUsersRepo();

  const professors = await professorSubjectRepo();

  const activeAssignments = await activeAssignmentsRepo();

  const completedAssignments = await completedAssignmentsRepo();

  const dueThisWeek = await getAssignmentsDueThisWeekRepo();

  const departments = await getDepartmentsRepo();

  return {
    totalUsers,
    professors,
    activeAssignments,
    completedAssignments,
    dueThisWeek,
    departments,

    // later you can calculate real growth
    usersGrowth: 12,
    completedGrowth: 23,
  };
};

// Admin summary service
export const getAdminSummaryService = async () => {
  return await getAdminSummaryRepo();
};

// Create Admin
export const createAdminService = async (data: CreateAdminInput) => {
  const { name, email, contactNumber, branchValue, statusId } = data;

  // Check email
  const exists = await findAdminByEmailRepo(email);
  if (exists) {
    throw new Error(EMAIL_MESSAGES.EMAIL_EXISTS);
  }

  // Admin Role
  const role = await findEnumRepo("ROLE", "Admin");
  if (!role) throw new Error(ADMIN_MESSAGES.ADMIN_ROLE);

  // Branch
  const branch = await findEnumRepo("BRANCH", branchValue);
  if (!branch) throw new Error(BRANCH_MESSAGE.INVALID);

  // Generate code
  const code = await generateUserCode(role.id);

  // create admin
  const createdAdmin = await createAdminRepo({
    name,
    email,
    contactNumber,
    password: null,
    code,
    status: {
      connect: { id: statusId },
    },
    role: {
      connect: { id: role.id },
    },
    branch: {
      connect: { id: branch.id },
    },
  });

  // Notification for admin
  await notifyUser({
    title: "Account Created",
    message:
      "Your admin (HOD) account has been created. Please check your email to set your password.",
    typeEnumValue: NOTIFICATION_TYPES.ACCOUNT,
    userIds: [createdAdmin.id],
  });

  // Generate set-password link
  const setPasswordLink = await createSetPasswordLink(String(createdAdmin.id));

  // Prepare HTML email
  const htmlContent = getEmailTemplate(
    name,
    email,
    branch.enumValue,
    setPasswordLink,
  );

  // Send email
  let emailSent = true;
  try {
    await sendEmail(email, "Set Your Password - CMS", htmlContent);
    console.log(`Email sent successfully to ${email}`);
  } catch (error: any) {
    emailSent = false;
    console.error(" Email sending failed:");
    console.error("  Message:", error.message);
    console.error("  Code:", error.code);
    console.error("  Response:", error.response);
    console.error("  Full error:", JSON.stringify(error, null, 2));
  }

  return {
    admin: createdAdmin,
    emailSent,
    message: emailSent
      ? "Admin created & credentials sent to email"
      : "Admin created but email delivery failed. Please resend manually.",
  };
};

// Get all admin
export const getAllAdminService = async (
  page: number,
  limit: number,
  search: string,
) => {
  const skip = (page - 1) * limit;

  const { admins, totalCount } = await getAllAdminRepo(skip, limit, search);

  return {
    admins: admins,
    totalRecords: totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  };
};

// Get admin by id
export const getAdminByIdService = async (id: string) => {
  const admin = await getAdminByIdRepo(id);

  if (!admin) {
    throw new Error(ADMIN_MESSAGES.ADMIN_NOT_FOUND);
  }

  return admin;
};

// Update admin
export const updateAdminService = async (id: string, data: any) => {
  // Check if user exists
  const existingAdmin = await getAdminByIdRepo(id);

  if (!existingAdmin) {
    throw new Error(ADMIN_MESSAGES.ADMIN_NOT_FOUND);
  }

  // Prepare updated data
  const updatedData = { ...data };

  // Hash password if provided
  if (data.password) {
    updatedData.password = await bcrypt.hash(data.password, 10);
  }

  // Update admin in DB
  try {
    const updatedAdmin = await updateAdminRepo(id, updatedData);

    return updatedAdmin;
  } catch (error: any) {
    console.error("Error updating admin:", error);
    throw new Error(ADMIN_MESSAGES.FAILED_UPDATE);
  }
};

// Delete admin
export const deleteAdminService = async (id: string) => {
  try {
    const admin = await getAdminByIdRepo(id);

    if (!admin) {
      throw new Error(ADMIN_MESSAGES.ADMIN_NOT_FOUND);
    }

    return deleteAdminRepo(id);
  } catch (error: any) {
    console.error("Error deleting admin:", error);
    throw new Error(ADMIN_MESSAGES.FAILED_DELETE);
  }
};

// My profile
export const getMyProfileService = async (userId: string) => {
  return await findMyProfileRepo(userId);
};

// Update My Profile
export const updateMyProfileService = async (
  userId: string,
  data: {
    name: string;
    contactNumber: string;
    newPassword?: string;
  },
) => {
  const { name, contactNumber, newPassword } = data;

  if (!name || !contactNumber) {
    throw new Error(FIELDS_MESSAGES.REQUIRED_FIELDS);
  }

  const updateData: any = {
    name,
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
