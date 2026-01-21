import prisma from "../config/prisma";
import { ASSIGNMENT_STATUS_ENUM, BRANCH_ENUM, ENUM_TYPE, ROLE_ENUM, SEMESTER_ENUM, STATUS_ENUM, YEAR_ENUM } from "../constants/enum.constants";
import { EnumSeed } from "../interfaces/enum";

export async function seedEnums() {
    const enums: EnumSeed[] = [
        // Roles
        ...ROLE_ENUM.map((role) => ({
            enumType: ENUM_TYPE.ROLE,
            enumValue: role
        })),

        // Branches
        ...BRANCH_ENUM.map((branch) => ({
            enumType: ENUM_TYPE.BRANCH,
            enumValue: branch
        })),

        // Semester
        ...SEMESTER_ENUM.map((semester) => ({
            enumType: ENUM_TYPE.SEMESTER,
            enumValue: semester
        })),

        // Acadamic Year
        ...YEAR_ENUM.map((year) => ({
            enumType: ENUM_TYPE.YEAR,
            enumValue: year
        })),

        // Assignment Status
        ...ASSIGNMENT_STATUS_ENUM.map((assignmentStatus) => ({
            enumType: ENUM_TYPE.ASSIGNMENT_STATUS,
            enumValue: assignmentStatus
        })),

        //  Status
        ...STATUS_ENUM.map((status) => ({
            enumType: ENUM_TYPE.STATUS_ENUM,
            enumValue: status
        }))
    ];

    await prisma.enumTable.createMany({
        data: enums,
        skipDuplicates: true,
    });
    
    console.log("All enums inserted!")
}