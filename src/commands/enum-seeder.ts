import prisma from "../config/prisma"

export async function seedEnums() {
    const enums = [
        // Roles
        {enumType: "ROLE", enumValue: "SuperAdmin"},
        {enumType: "ROLE", enumValue: "Admin"},
        {enumType: "ROLE", enumValue: "Professor"},
        {enumType: "ROLE", enumValue: "Student"},
        
        // Branches
        {enumType: "BRANCH", enumValue: "Computer Engineering"},
        {enumType: "BRANCH", enumValue: "Mechanical Engineering"},
        {enumType: "BRANCH", enumValue: "Electrical Engineering"},
        {enumType: "BRANCH", enumValue: "Civil Engineering"},
        {enumType: "BRANCH", enumValue: "Chemical Engineering"},
        
        // Semesters
        {enumType: "SEMESTER", enumValue: "Semester 1"},
        {enumType: "SEMESTER", enumValue: "Semester 2"},
        {enumType: "SEMESTER", enumValue: "Semester 3"},
        {enumType: "SEMESTER", enumValue: "Semester 4"},
        {enumType: "SEMESTER", enumValue: "Semester 5"},
        {enumType: "SEMESTER", enumValue: "Semester 6"},
        {enumType: "SEMESTER", enumValue: "Semester 7"},
        {enumType: "SEMESTER", enumValue: "Semester 8"},
        
        // Acadamic Year
        {enumType: "YEAR", enumValue: "First Year"},
        {enumType: "YEAR", enumValue: "Second Year"},
        {enumType: "YEAR", enumValue: "Third Year"},
        {enumType: "YEAR", enumValue: "Fourth Year"},

        // Assignment Status
        {enumType: "ASSIGNMENT_STATUS", enumValue: "Pending"},
        {enumType: "ASSIGNMENT_STATUS", enumValue: "In Process"},
        {enumType: "ASSIGNMENT_STATUS", enumValue: "Completed"},
        
    ];

        await prisma.enumTable.createMany({
            data: enums,
            skipDuplicates: true,
        });
    
    console.log("All enums inserted!")
}