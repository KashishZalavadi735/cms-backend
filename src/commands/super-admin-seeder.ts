import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export async function seedSuperAdmin() {
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;

    if (!superAdminEmail || !superAdminPassword) {
        throw new Error("SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD missing in .env");
    }

    // Check if Super admin exists
    const superAdminExists = await prisma.user.findFirst({
        where: {
            roleId: 1
        }
    });

    if (superAdminExists) {
        console.log("Super admin already exists");
        return;
    }

    // Create Super Admin user 
    await prisma.user.create({
        data: {
            name: "Super Admin",
            email: superAdminEmail,
            contactNumber: "9999999999",
            password: await bcrypt.hash(superAdminPassword, 10),
            roleId: 1,
            branchId: 5,
            semesterId: 12,
            yearId: 24
        }
    });

    console.log(`Super Admin created: ${superAdminEmail}`);
}