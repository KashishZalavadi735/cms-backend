import prisma from "../config/prisma";

export const getEnumsByTypeRepo = async (type: string) => {
  return prisma.enumTable.findMany({
    where: {
      enumType: type,
    },
    select: {
      id: true,
      enumValue: true,
    },
    orderBy: {
      id: "asc",
    },
  });
};
