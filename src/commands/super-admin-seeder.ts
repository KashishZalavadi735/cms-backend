import { User } from "@prisma/client";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export async function seedSuperAdmin() {
    const superAdminEmail: string | undefined = process.env.SUPER_ADMIN_EMAIL;
    const superAdminPassword: string | undefined = process.env.SUPER_ADMIN_PASSWORD;

    if (!superAdminEmail || !superAdminPassword) {
        throw new Error("SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD missing in .env");
    }

    // Check if Super admin exists
    const superAdminExists: User | null = await prisma.user.findFirst({
        where: {
            roleId: 1
        }
    });

    if (superAdminExists) {
        console.log("Super admin already exists");
        return;
    }

    // Hash password
    const hashedPassword: string = await bcrypt.hash(superAdminPassword, 10);

    // Create Super Admin user 
    const createSuperAadmin: User = await prisma.user.create({
        data: {
            name: "Super Admin",
            email: superAdminEmail,
            contactNumber: "9999999999",
            password: hashedPassword,
            roleId: 1,
            branchId: 5,
            semesterId: 12,
            yearId: 24
        }
    });

    console.log(`Super Admin created: ${createSuperAadmin.email}`);
}