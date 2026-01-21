import prisma from "../config/prisma";
import { SUBJECTS } from "../constants/subject.constants";
import { ENUM_TYPE } from "../constants/enum.constants";

export const seedSubjects = async (): Promise<void> => {

  for (const [branchKey, semesters] of Object.entries(SUBJECTS)) {
    // Convert "Computer_Engineering" → "Computer Engineering"
    const branchValue = branchKey.replace(/_/g, " ");

    // Find Branch enum
    const branchEnum = await prisma.enumTable.findFirst({
      where: {
        enumType: ENUM_TYPE.BRANCH,
        enumValue: branchValue,
      },
    });

    if (!branchEnum) {
      console.warn(`Branch not found: ${branchValue}`);
      continue;
    }

    for (const [semesterValue, subjects] of Object.entries(semesters)) {
      // Find Semester enum
      const semesterEnum = await prisma.enumTable.findFirst({
        where: {
          enumType: ENUM_TYPE.SEMESTER,
          enumValue: semesterValue,
        },
      });

      if (!semesterEnum) {
        console.warn(`Semester not found: ${semesterValue}`);
        continue;
      }

      for (const subjectName of subjects) {
        await prisma.subject.upsert({
          where: {
            name_branchId_semesterId: {
              name: subjectName,
              branchId: branchEnum.id,
              semesterId: semesterEnum.id,
            },
          },
          update: {},
          create: {
            name: subjectName,
            branchId: branchEnum.id,
            semesterId: semesterEnum.id,
          },
        });

      }
    }
  }

  console.log("Subject seeding completed successfully");
};
