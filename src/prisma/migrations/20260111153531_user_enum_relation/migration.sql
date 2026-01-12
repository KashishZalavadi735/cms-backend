-- DropIndex
DROP INDEX `User_branchId_fkey` ON `user`;

-- DropIndex
DROP INDEX `User_roleId_fkey` ON `user`;

-- DropIndex
DROP INDEX `User_semesterId_fkey` ON `user`;

-- DropIndex
DROP INDEX `User_yearId_fkey` ON `user`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `EnumTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `EnumTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_semesterId_fkey` FOREIGN KEY (`semesterId`) REFERENCES `EnumTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_yearId_fkey` FOREIGN KEY (`yearId`) REFERENCES `EnumTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
