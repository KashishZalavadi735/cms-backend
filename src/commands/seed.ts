import prisma from "../config/prisma";
import { seedEnums } from "./enum-seeder";
import { seedSuperAdmin } from "./super-admin-seeder";

async function main() {
    console.log("Seeding started...");

    await seedEnums();
    await seedSuperAdmin();

    console.log("Seeding completed !");    
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })