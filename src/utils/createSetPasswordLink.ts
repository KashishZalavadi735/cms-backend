import crypto from "crypto";
import prisma from "../config/prisma";

export const createSetPasswordLink = async (userId: string) => {
    const rawToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

     const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); 

    await prisma.user.update({
        where: { id: userId },
        data: {
            passwordSetupToken: hashedToken,
            passwordSetupExpiresAt: expires
        }
    });

    return `${process.env.FRONTEND_URL}/SetPassword?token=${rawToken}`;
};