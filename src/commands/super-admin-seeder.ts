import { User } from "@prisma/client";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export async function seedSuperAdmin() {
  const superAdminEmail: string | undefined = process.env.SUPER_ADMIN_EMAIL;
  const superAdminPassword: string | undefined =
    process.env.SUPER_ADMIN_PASSWORD;

  if (!superAdminEmail || !superAdminPassword) {
    throw new Error(
      "SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD missing in .env",
    );
  }

  // Check if Super admin exists
  const superAdminExists: User | null = await prisma.user.findFirst({
    where: {
      email: superAdminEmail,
    },
  });

  if (superAdminExists) {
    console.log("Super admin already exists");
    return;
  }

  // Hash password
  const hashedPassword: string = await bcrypt.hash(superAdminPassword, 10);

  // Fetch related enums (IDs are strings now)
  const roleEnum = await prisma.enumTable.findFirst({
    where: { enumType: "ROLE", enumValue: "SuperAdmin" },
  });

  const branchEnum = await prisma.enumTable.findFirst({
    where: { enumType: "BRANCH", enumValue: "Computer Engineering" },
  });

  const semesterEnum = await prisma.enumTable.findFirst({
    where: { enumType: "SEMESTER", enumValue: "Semester 1" },
  });

  const yearEnum = await prisma.enumTable.findFirst({
    where: { enumType: "YEAR", enumValue: "First Year" },
  });

  const statusEnum = await prisma.enumTable.findFirst({
    where: { enumType: "STATUS_ENUM", enumValue: "Active" },
  });

  if (!roleEnum || !branchEnum || !semesterEnum || !yearEnum || !statusEnum) {
    throw new Error(
      "Required enum not found. Make sure enums are seeded first.",
    );
  }
  // Fixed code
  const SUPER_ADMIN_CODE = "SA_001";

  // Create Super Admin user
  const createSuperAadmin: User = await prisma.user.create({
    data: {
      name: "Super Admin",
      email: superAdminEmail,
      contactNumber: "9427127069",
      password: hashedPassword,
      roleId: roleEnum.id,
      branchId: branchEnum.id,
      semesterId: semesterEnum.id,
      yearId: yearEnum.id,
      statusId: statusEnum.id,
      code: SUPER_ADMIN_CODE,
    },
  });

  console.log(`Super Admin created: ${createSuperAadmin.email}`);
}
