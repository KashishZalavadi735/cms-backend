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
            branch: true
        },  
    });
};

// View branch students
export const findStudentsByBranch = async (branchId:number) => {
    return prisma.user.findMany({
        where: {
            branchId,
            roleId: 4
        },
        select: {
            id: true,
            name: true,
            email: true,
            code: true,
            contactNumber: true,
            branchId: true,
            semesterId: true,
            yearId: true,
            statusId: true
        }
    });
};