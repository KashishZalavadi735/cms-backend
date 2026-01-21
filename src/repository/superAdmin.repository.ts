import { Prisma, User } from "@prisma/client";
import prisma from "../config/prisma";

export const findAdminByEmailRepo = async (email: string) : Promise<User | null> => {
    return prisma.user.findUnique({
        where: { email }
    });
};

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

// Create admin
export const createAdminRepo = async (data: Prisma.UserCreateInput): Promise<User>=> {
    return prisma.user.create({ data });
};

// Get all admins
export const getAllAdminRepo = async (skip: number, limit: number) => {
    const [ admins, totalCount ] = await Promise.all([
        prisma.user.findMany({
            where: {
                role: {
                    enumValue: "Admin"
                },
                deletedAt: null,
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
                    enumValue: "Admin"
                },
                deletedAt: null,
            },
        }),
    ]);

    return { admins, totalCount };
};

// Get admin by id
export const getAdminByIdRepo = async (id:number) => {
    return prisma.user.findFirst({
        where: {id}
    });
};

// Update admin
export const updateAdminRepo = async (id: number, data: any) => {
    return prisma.user.update({
        where: {id},
        data
    });
};

// Delete admin
// Soft delete
export const deleteAdminRepo = async (id: number) => {
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
}