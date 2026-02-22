-- DropIndex
DROP INDEX `Assignment_branchId_fkey` ON `assignment`;

-- DropIndex
DROP INDEX `Assignment_createdById_fkey` ON `assignment`;

-- DropIndex
DROP INDEX `Assignment_semesterId_fkey` ON `assignment`;

-- DropIndex
DROP INDEX `Assignment_subjectId_fkey` ON `assignment`;

-- DropIndex
DROP INDEX `AssignmentStatus_assignmentId_fkey` ON `assignmentstatus`;

-- DropIndex
DROP INDEX `AssignmentStatus_statusId_fkey` ON `assignmentstatus`;

-- DropIndex
DROP INDEX `ProfessorSubject_subjectId_fkey` ON `professorsubject`;

-- DropIndex
DROP INDEX `Subject_branchId_fkey` ON `subject`;

-- DropIndex
DROP INDEX `Subject_semesterId_fkey` ON `subject`;

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

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `typeId` INTEGER NOT NULL,
    `readStatusId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `EnumTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_semesterId_fkey` FOREIGN KEY (`semesterId`) REFERENCES `EnumTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfessorSubject` ADD CONSTRAINT `ProfessorSubject_professorId_fkey` FOREIGN KEY (`professorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfessorSubject` ADD CONSTRAINT `ProfessorSubject_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `EnumTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_semesterId_fkey` FOREIGN KEY (`semesterId`) REFERENCES `EnumTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignmentStatus` ADD CONSTRAINT `AssignmentStatus_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignmentStatus` ADD CONSTRAINT `AssignmentStatus_assignmentId_fkey` FOREIGN KEY (`assignmentId`) REFERENCES `Assignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignmentStatus` ADD CONSTRAINT `AssignmentStatus_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `EnumTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserOtp` ADD CONSTRAINT `UserOtp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `EnumTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_readStatusId_fkey` FOREIGN KEY (`readStatusId`) REFERENCES `EnumTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
