import { getEnumsByTypeRepo } from "../repository/enum.repository";

export const getEnumsByTypeService = async (type: string) => {
  return getEnumsByTypeRepo(type);
};
