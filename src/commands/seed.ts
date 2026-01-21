import prisma from "../config/prisma";
import { seedEnums } from "./enum-seeder";
import { seedSubjects } from "./subject-seeder";
import { seedSuperAdmin } from "./super-admin-seeder";

async function main() {
    await seedEnums();
    await seedSuperAdmin(); 
    await seedSubjects(); 
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })