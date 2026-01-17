import bcrypt from "bcryptjs";
import { ADMIN_MESSAGES } from "../constants/messages";
import { CreateAdminInput } from "../interfaces";
import { generateOtp } from "../utils/generateOtp";
import { generateUserCode } from "../utils/generateUserCode";
import { getEmailTemplate } from "../utils/emailTemplate";
import { sendEmail } from "../utils/sendEmail";
import {
  createAdminRepo,
  findAdminByEmailRepo,
  findEnumRepo,
  getAllAdminRepo,
  getAdminByIdRepo,
  updateAdminRepo,
  deleteAdminRepo
} from "../repository/superAdmin.repository";

// Create Admin
export const createAdminService = async (data: CreateAdminInput) => {
  const { name, email, contactNumber, branchValue, statusId } = data;

  // Check email
  const exists = await findAdminByEmailRepo(email);
  if (exists) {
    throw new Error(ADMIN_MESSAGES.EMAIL_EXISTS);
  }

  // Admin Role
  const role = await findEnumRepo("ROLE", "ADMIN");
  if (!role) throw new Error("ROLE.ADMIN not configured");

  // Branch
  const branch = await findEnumRepo("BRANCH", branchValue);
  if (!branch) throw new Error("Invalid branch");

  // Generate One-Time Password
  //Plain Password generator
  const otp = generateOtp(6);

  // Hash Password
  // Store One-Time Password
  const hashedPassword = await bcrypt.hash(otp, 10);

  // Generate code
  const code = await generateUserCode(role.id);

  // create admin

  const createdAdmin = await createAdminRepo({
    name,
    email,
    contactNumber,
    password: hashedPassword,
    code,
    isFirstLogin: true,
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

  // Prepare HTML email
  const htmlContent = getEmailTemplate(name, email, otp);

  // Send email
  await sendEmail(email, "Your One-Time Password", htmlContent);

  return {
    admin: createdAdmin,
    otp,
    message: "Admin created & One-Time Password sent to email",
  };
};

// Get all admin
export const getAllAdminService = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const { admins, totalCount } = await getAllAdminRepo(skip, limit);

  return {
    admins: admins,
    totalRecords: totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page
  };
};

// Get admin by id
export const getAdminByIdService = async (id: number) => {
  const admin = await getAdminByIdRepo(id);
  
  if (!admin) {
    throw new Error(ADMIN_MESSAGES.ADMIN_NOT_FOUND);
  }

  return admin;
};

// Update admin
export const updateAdminService = async (id: number, data: any) => {
  // Check if user exists
  const existingAdmin = await getAdminByIdRepo(id);

  if (!existingAdmin) {
    throw new Error(ADMIN_MESSAGES.ADMIN_NOT_FOUND);
  }

  // Prepare updated data
  const updatedData = {...data};

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
}

// Delete admin
export const deleteAdminService = async (id: number) => {
  const admin = await getAdminByIdRepo(id);

  if (!admin) {
    throw new Error(ADMIN_MESSAGES.ADMIN_NOT_FOUND);
  }

  return deleteAdminRepo(id);
}