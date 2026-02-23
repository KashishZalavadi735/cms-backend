import prisma from "../config/prisma";
import { ROLE_PREFIX } from "../constants/rolePrefix";

export const generateUserCode = async (
  roleId: string
): Promise<string> => {
  const role = await prisma.enumTable.findUnique({
    where: { id: roleId },
    select: { enumValue: true }
  });

  if (!role) throw new Error("Invalid role");

  const prefix = ROLE_PREFIX[role.enumValue];
  if (!prefix) throw new Error("Prefix not defined");

  const lastUser = await prisma.user.findFirst({
    where: { roleId },
    orderBy: { code: "desc" },
    select: { code: true }
  });

  if (!lastUser?.code) return `${prefix}_001`;

  const num = parseInt(lastUser.code.split("_")[1], 10);
  return `${prefix}_${String(num + 1).padStart(3, "0")}`;
};
