import { findMyProfileRepo } from "../repository/student.repository";

// My profile
export const getMyProfileService = async (userId: number) => {
  return await findMyProfileRepo(userId);
};
