import { STUDENT_MESSAGES } from "../constants/messages"
import { findStudentsByBranch } from "../repository/professor.repository";

// View branch students
export const getBranchStudentsService = async (branchId:number) => {
    if (!branchId) {
        throw new Error(STUDENT_MESSAGES.BRANCHID_MISSING);
    }

    const students = await findStudentsByBranch(branchId);

    return students;
};