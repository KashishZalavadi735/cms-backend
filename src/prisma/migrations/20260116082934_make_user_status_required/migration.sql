/*
  Warnings:

  - Made the column `statusId` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `User_branchId_fkey` ON `user`;

-- DropIndex
DROP INDEX `User_roleId_fkey` ON `user`;

-- DropIndex
DROP INDEX `User_semesterId_fkey` ON `user`;

-- DropIndex
DROP INDEX `User_statusId_fkey` ON `user`;

-- DropIndex
DROP INDEX `User_yearId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` MODIFY `statusId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `EnumTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `EnumTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_semesterId_fkey` FOREIGN KEY (`semesterId`) REFERENCES `EnumTable`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_yearId_fkey` FOREIGN KEY (`yearId`) REFERENCES `EnumTable`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `EnumTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
