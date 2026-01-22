import { STUDENT_MESSAGES } from "../constants/messages"
import { findMyProfileRepo, findStudentsByBranch } from "../repository/professor.repository";

// My profile
export const getMyProfileService = async (userId: number) => {
  return await findMyProfileRepo(userId);
};

// View branch students
export const getBranchStudentsService = async (branchId:number) => {
    if (!branchId) {
        throw new Error(STUDENT_MESSAGES.BRANCHID_MISSING);
    }

    const students = await findStudentsByBranch(branchId);

    return students;
};