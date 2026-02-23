import { findStudentsByBranch } from "../repository/branchStudents.repository";

// View branch students
export const getBranchStudentsService = async (
  page: number,
  limit: number,
  search: string,
  branchId: string,
) => {

  const skip = (page - 1) * limit;

  const { students, totalCount } = await findStudentsByBranch(
    skip,
    limit,
    search,
    branchId,
  );

  return {
    students,
    totalRecords: totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  };
};
