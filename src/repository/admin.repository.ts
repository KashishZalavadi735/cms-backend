import { Prisma, User } from "@prisma/client";
import prisma from "../config/prisma";

export const findEnumRepo = async (enumType:string, enumValue: string) => {
    return prisma.enumTable.findUnique({
        where: {
            enumType_enumValue: {
                enumType,
                enumValue
            }
        }
    });
};

// Find professor by id
export const findProfessorByEmailRepo = async (email:string) => {
    return prisma.user.findUnique({
        where: { email }
     });
};

// Create Professor
export const createProfessorRepo = async (data: Prisma.UserCreateInput): Promise<User> => {
    return prisma.user.create({ data });
};

// Subject validation
export const findSubjectsByIdsRepo = async (subjectIds:number[], branchId: number) => {
    return prisma.subject.findMany({
        where: {
            id: { in: subjectIds },
            branchId,
            deletedAt: null
        }
    });
}

// Attach subject
export const attachProfessorSubjectRepo = async (professorId: number, subjectIds: number[]) => {
    return prisma.professorSubject.createMany({
        data: subjectIds.map(subjectId => ({
            professorId,
            subjectId
        })),
        skipDuplicates: true
    });
}

// Get all Professor
export const getAllProfessorRepo = async (skip: number, limit: number, branchId: number) => {
    const [ professors, totalCount ] = await Promise.all([
        prisma.user.findMany({
            where: {
                role: {
                    enumValue: "Professor"
                },
                branchId: branchId,
            },
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc"
            }
        }),

        prisma.user.count({
            where: {
                role: {
                    enumValue: "Professor"
                },
                branchId: branchId
            }
        })
    ]);

    return { professors, totalCount };
};

// Get Professor by id
export const getProfessorByIdRepo = async (id: number) => {
    return prisma.user.findFirst({
        where: {id}
    });
};

// Update Professor
export const updateProfessorRepo = async (id: number, data: any) => {
    // Remove branch-related fields
    delete data.branch;
    delete data.branchId;
    delete data.branchValue;
    
    return prisma.user.update({
        where: {id},
        data
    });
};

// Delete Professor
// Soft delete
export const deleteProfessorRepo = async (id: number) => {
    return prisma.user.update({
        where: { id: id },
        data: {
            deletedAt: new Date(),
            status: {
                connect: {
                    id: 26
                }
            }
        }
    });
};

// Assign subject to existing professor
export const deleteProfessorSubjectsRepo = async (professorId: number) => {
    return prisma.professorSubject.deleteMany({
        where: { professorId }
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
}