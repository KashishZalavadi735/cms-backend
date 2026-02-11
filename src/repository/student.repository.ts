import prisma from "../config/prisma";

// My Profile
export const findMyProfileRepo = async (userId:number) => {
    return prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            name: true,
            email: true,
            contactNumber: true,
            role: true,
            code: true,
            branch: true,
            semester: true,
            year: true
        },  
    });
};