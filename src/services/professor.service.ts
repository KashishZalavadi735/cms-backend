import { findMyProfileRepo } from "../repository/professor.repository";

// My profile
export const getMyProfileService = async (userId: number) => {
  return await findMyProfileRepo(userId);
};

