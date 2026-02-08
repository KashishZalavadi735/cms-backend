import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import {
  EMAIL_MESSAGES,
  PROFESSOR_MESSAGES,
  STUDENT_MESSAGES,
} from "../constants/messages";
import { CreateProfessorInput } from "../interfaces";
import {
  createProfessorRepo,
  findEnumRepo,
  findProfessorByEmailRepo,
  getAllProfessorRepo,
  getProfessorByIdRepo,
  updateProfessorRepo,
  deleteProfessorRepo,
  attachProfessorSubjectRepo,
  findSubjectsByIdsRepo,
  deleteProfessorSubjectsRepo,
  findSubjectsByBranchRepo,
  findMyProfileRepo,
  updateMyProfileRepo,
} from "../repository/admin.repository";
import { generateUserCode } from "../utils/generateUserCode";
import { getEmailTemplate } from "../utils/ProfessorEmailTemplate";
import { sendEmail } from "../utils/sendEmail";
import { createSetPasswordLink } from "../utils/createSetPasswordLink";

// Create Professor
export const createProfessorService = async (
  data: CreateProfessorInput,
  adminBranchId: number,
) => {
  const {
    name,
    email,
    contactNumber,
    branchValue,
    statusId,
    subjectIds = [],
  } = data;

  // Branch
  const branch = await findEnumRepo("BRANCH", branchValue);
  if (!branch) throw new Error("Invalid branch");

  // Admin cannot create professor of other branch
  if (branch?.id !== adminBranchId) {
    throw new Error(PROFESSOR_MESSAGES.ADMIN_CREATE_PROFESSOR);
  }

  // Existing email
  const exists = await findProfessorByEmailRepo(email);
  if (exists) throw new Error(EMAIL_MESSAGES.EMAIL_EXISTS);

  // Professor Role
  const role = await findEnumRepo("ROLE", "PROFESSOR");
  if (!role) throw new Error("ROLE.PROFESSOR not configured");

  // Validate & fetch subjects
  let subjectNames: string[] = [];

  if (subjectIds.length > 0) {
    const subjects = await findSubjectsByIdsRepo(subjectIds, branch.id);

    if (subjects.length !== subjectIds.length) {
      throw new Error("Invalid subjects for this branch");
    }

    subjectNames = subjects.map((s) => s.name);
  }

  // Generate code
  const code = await generateUserCode(role.id);

  // Create Professor
  const createdProfessor = await createProfessorRepo({
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

  // Attach subjects
  if (subjectIds.length > 0) {
    await attachProfessorSubjectRepo(createdProfessor.id, subjectIds);
  }

  // Set password link
  const setPasswordLink = await createSetPasswordLink(createdProfessor.id);

  // Prepare HTML email
  const htmlContent = getEmailTemplate(
    name,
    email,
    branch.enumValue,
    subjectNames,
    setPasswordLink,
  );

  // Send email
  await sendEmail(email, "Set Your Password - CMS", htmlContent);

  return {
    professor: createdProfessor,
    message: "Professor created & Credentials sent to email",
  };
};

// Get all Professor
export const getAllProfessorService = async (
  page: number,
  limit: number,
  search: string,
  adminBranchId: number,
) => {
  const skip = (page - 1) * limit;

  const { professors, totalCount } = await getAllProfessorRepo(
    skip,
    limit,
    search,
    adminBranchId,
  );

  return {
    professors: professors,
    totalRecords: totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  };
};

// Get Professor by id
export const getProfessorByIdService = async (
  id: number,
  adminBranchId: number,
) => {
  const professor = await getProfessorByIdRepo(id);

  if (!professor || professor.branchId !== adminBranchId) {
    throw new Error(PROFESSOR_MESSAGES.PROFESSOR_NOT_FOUND);
  }

  return professor;
};

// Update Professor
export const updateProfessorService = async (
  id: number,
  data: any,
  adminBranchId: number,
) => {
  // check if professor exists
  const existingProfessor = await getProfessorByIdRepo(id);

  if (!existingProfessor) {
    throw new Error(PROFESSOR_MESSAGES.PROFESSOR_NOT_FOUND);
  }

  // Branch ownership check
  if (existingProfessor.branchId !== adminBranchId) {
    throw new Error("Access denied");
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
export const deleteProfessorService = async (
  id: number,
  adminBranchId: number,
) => {
  const professor = await getProfessorByIdRepo(id);

  if (!professor) {
    throw new Error(PROFESSOR_MESSAGES.PROFESSOR_NOT_FOUND);
  }

  // Branch ownership check
  if (professor.branchId !== adminBranchId) {
    throw new Error("Access denied");
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

// Assign subject to existing professor
export const updateProfessorSubjectsService = async (
  professorId: number,
  subjectIds: number[],
  adminBranchId: number,
) => {
  // Professor exists
  const professor = await getProfessorByIdRepo(professorId);
  if (!professor) throw new Error("Professor not found");

  // same branch check
  if (professor.branchId !== adminBranchId) {
    throw new Error("You cannot modify professor of another branch");
  }

  // Validate subjects
  const subjects = await findSubjectsByIdsRepo(subjectIds, professor.branchId);

  if (subjects.length !== subjectIds.length) {
    throw new Error("Invalid subjects for this branch");
  }

  // Remove old subjects
  await deleteProfessorSubjectsRepo(professorId);

  // Attach new subject
  await attachProfessorSubjectRepo(professorId, subjectIds);

  return { professorId, subjectIds };
};

// Subjects
export const getBranchSubjectsService = async (branchId: number) => {
  if (!branchId) {
    throw new Error(STUDENT_MESSAGES.BRANCHID_MISSING);
  }

  const subjects = await findSubjectsByBranchRepo(branchId);

  return subjects;
};

// My profile
export const getMyProfileService = async (userId: number) => {
  return await findMyProfileRepo(userId);
};

// Update My Profile
export const updateMyProfileService = async (
  userId: number,
  data: {
    name: string;
    email: string;
    contactNumber: string;
    newPassword?: string;
  },
) => {
  const { name, email, contactNumber, newPassword } = data;

  if (!name || !email || !contactNumber) {
    throw new Error("Name, Email and contact number are required");
  }

  // Ensure ADMIN role
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      role: { select: { enumValue: true } },
      password: true,
    },
  });

  if (user?.role.enumValue !== "Admin") {
    throw new Error("Unauthorized access");
  }

  // Email uniqueness check
  const emailExists = await prisma.user.findFirst({
    where: {
      email,
      NOT: { id: userId },
    },
  });

  if (emailExists) {
    throw new Error("Email already exists");
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
