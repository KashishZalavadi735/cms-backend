import prisma from "../config/prisma";

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
}