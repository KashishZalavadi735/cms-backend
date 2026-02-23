import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

// View branch students
export const findStudentsByBranch = async (
  skip: number,
  limit: number,
  search: string,
  branchId: string,
) => {
  const whereCondition: Prisma.UserWhereInput = {
    branchId,
    role: { enumValue: "Student" },
    OR: search
      ? [
          { name: { contains: search } },
          { email: { contains: search } },
          { code: { contains: search } },
          { status: { enumValue: { contains: search } } },
        ]
      : undefined,
  };

  const [students, totalCount] = await Promise.all([
    prisma.user.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        code: true,
        contactNumber: true,
        semester: { select: { enumValue: true } },
        year: { select: { enumValue: true } },
        status: { select: { enumValue: true } },
      },
    }),

    prisma.user.count({
        where: whereCondition
    })
  ]);

  return { students, totalCount };

};
