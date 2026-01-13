import prisma from "../config/prisma"
import { ASSIGNMENT_STATUS_ENUM, BRANCH_ENUM, ENUM_TYPE, ROLE_ENUM, SEMESTER_ENUM, YEAR_ENUM } from "../constants/enum.constants";
import { EnumSeed } from "../interfaces/enum";

export async function seedEnums() {
    // const enums = [
    //     // Roles
    //     {enumType: "ROLE", enumValue: "SuperAdmin"},
    //     {enumType: "ROLE", enumValue: "Admin"},
    //     {enumType: "ROLE", enumValue: "Professor"},
    //     {enumType: "ROLE", enumValue: "Student"},
        
    //     // Branches
    //     {enumType: "BRANCH", enumValue: "Computer Engineering"},
    //     {enumType: "BRANCH", enumValue: "Mechanical Engineering"},
    //     {enumType: "BRANCH", enumValue: "Electrical Engineering"},
    //     {enumType: "BRANCH", enumValue: "Civil Engineering"},
    //     {enumType: "BRANCH", enumValue: "Chemical Engineering"},
        
    //     // Semesters
    //     {enumType: "SEMESTER", enumValue: "Semester 1"},
    //     {enumType: "SEMESTER", enumValue: "Semester 2"},
    //     {enumType: "SEMESTER", enumValue: "Semester 3"},
    //     {enumType: "SEMESTER", enumValue: "Semester 4"},
    //     {enumType: "SEMESTER", enumValue: "Semester 5"},
    //     {enumType: "SEMESTER", enumValue: "Semester 6"},
    //     {enumType: "SEMESTER", enumValue: "Semester 7"},
    //     {enumType: "SEMESTER", enumValue: "Semester 8"},
        
    //     // Acadamic Year
    //     {enumType: "YEAR", enumValue: "First Year"},
    //     {enumType: "YEAR", enumValue: "Second Year"},
    //     {enumType: "YEAR", enumValue: "Third Year"},
    //     {enumType: "YEAR", enumValue: "Fourth Year"},

    //     // Assignment Status
    //     {enumType: "ASSIGNMENT_STATUS", enumValue: "Pending"},
    //     {enumType: "ASSIGNMENT_STATUS", enumValue: "In Process"},
    //     {enumType: "ASSIGNMENT_STATUS", enumValue: "Completed"},
        
    // ];

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
        ...ASSIGNMENT_STATUS_ENUM.map((status) => ({
            enumType: ENUM_TYPE.ASSIGNMENT_STATUS,
            enumValue: status
        }))
    ];

    await prisma.enumTable.createMany({
        data: enums,
        skipDuplicates: true,
    });
    
    console.log("All enums inserted!")
}