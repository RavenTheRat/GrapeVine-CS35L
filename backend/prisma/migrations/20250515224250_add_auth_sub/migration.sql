/*
  Warnings:

  - A unique constraint covering the columns `[authSub]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authSub` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `authSub` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_authSub_key` ON `User`(`authSub`);
