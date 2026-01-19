import bcrypt from "bcryptjs";
import { PROFESSOR_MESSAGES } from "../constants/messages";
import { CreateProfessorInput } from "../interfaces";
import {
  createProfessorRepo,
  findEnumRepo,
  findProfessorByEmailRepo,
  getAllProfessorRepo,
  getProfessorByIdRepo,
  updateProfessorRepo,
    deleteProfessorRepo
} from "../repository/admin.repository";
import { generateOtp } from "../utils/generateOtp";
import { generateUserCode } from "../utils/generateUserCode";
import { getEmailTemplate } from "../utils/emailTemplate";
import { sendEmail } from "../utils/sendEmail";

// Create Professor
export const createProfessorService = async (
  data: CreateProfessorInput,
  adminBranchId: number,
) => {
  const { name, email, contactNumber, branchValue, statusId } = data;

  // Branch
  const branch = await findEnumRepo("BRANCH", branchValue);
  if (!branch) throw new Error("Invalid branch");

  // Admin cannot create professor of other branch
  if (branch?.id !== adminBranchId) {
    throw new Error(PROFESSOR_MESSAGES.ADMIN_CREATE_PROFESSOR);
  }

  // Existing email
  const exists = await findProfessorByEmailRepo(email);
  if (exists) {
    throw new Error(PROFESSOR_MESSAGES.EMAIL_EXISTS);
  }

  // Professor Role
  const role = await findEnumRepo("ROLE", "PROFESSOR");
  if (!role) throw new Error("ROLE.PROFESSOR not configured");

  // Generate One-Time Password
  //Plain Password generator
  const otp = generateOtp(6);

  // Hash Password
  // Store One-Time Password
  const hashedPassword = await bcrypt.hash(otp, 10);

  // Generate code
  const code = await generateUserCode(role.id);

  // Create Professor
  const createdProfessor = await createProfessorRepo({
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
    professor: createdProfessor,
    otp,
    message: "Professor created & One-Time Password sent to email",
  };
};

// Get all Professor
export const getAllProfessorService = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const { professors, totalCount } = await getAllProfessorRepo(skip, limit);

  return {
    professors: professors,
    totalRecords: totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  };
};

// Get Professor by id
export const getProfessorByIdService = async (id: number) => {
  const professor = await getProfessorByIdRepo(id);

  if (!professor) {
    throw new Error(PROFESSOR_MESSAGES.PROFESSOR_NOT_FOUND);
  }

  return professor;
};

// Update Professor
export const updateProfessorService = async (id: number, data: any) => {
  // check if professor exists
  const existingProfessor = await getProfessorByIdRepo(id);

  if (!existingProfessor) {
    throw new Error(PROFESSOR_MESSAGES.PROFESSOR_NOT_FOUND);
  }

  // Block branch value
  if (data.branchId || data.branch || data.branchValue) {
    throw new Error(PROFESSOR_MESSAGES.BRANCH_UPDATE);
  }

  // Prepare updated data
  const updatedData = { ...data };

  // Hash password if provided
  if (data.password) {
    updatedData.password = await bcrypt.hash(data.password, 10);
  }

  // Update professor in DB
  try {
    const updatedProfessor = await updateProfessorRepo(id, updatedData);

    return updatedProfessor;
  } catch (error: any) {
    console.error("Error updating professor:", error);
    throw new Error(PROFESSOR_MESSAGES.FAILED_UPDATE);
  }
};

// Delete Professor
export const deleteProfessorService = async (id: number) => {
  const professor = await getProfessorByIdRepo(id);

  if (!professor) {
    throw new Error(PROFESSOR_MESSAGES.PROFESSOR_NOT_FOUND);
  }

  // Delete professor in DB(Soft delete)
  try {
    const deletedProfessor = await deleteProfessorRepo(id);

    return deletedProfessor;
  } catch (error: any) {
    console.error("Error deleting professor:", error);
    throw new Error(PROFESSOR_MESSAGES.FAILED_DELETE);
  }
};
