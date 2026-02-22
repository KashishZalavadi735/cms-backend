import prisma from "../config/prisma";
import { generateUserCodeTx } from "../utils/generateUserCode";

// backfill for user whose already exists in table
async function backfill() {
  const users = await prisma.user.findMany({
    where: { code: null },
    select: { id: true, roleId: true },
    orderBy: { id: "asc" },
  });

  for (const user of users) {
    await prisma.$transaction(async (tx) => {
      const code = await generateUserCodeTx(tx, user.roleId);

      await tx.user.update({
        where: { id: user.id },
        data: { code },
      });

      console.log(`Updated user ${user.id} → ${code}`);
    });
  }

  console.log("Backfill completed");
}

backfill()
  .catch((err) => {
    console.error("Backfill failed:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
