/*
  Warnings:

  - You are about to drop the column `create_dt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `end_dt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `start_dt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `update_dt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `create_dt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `update_dt` on the `User` table. All the data in the column will be lost.
  - Added the required column `createDt` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDt` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDt` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateDt` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createDt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateDt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` DROP COLUMN `create_dt`,
    DROP COLUMN `end_dt`,
    DROP COLUMN `start_dt`,
    DROP COLUMN `update_dt`,
    ADD COLUMN `createDt` DATETIME(3) NOT NULL,
    ADD COLUMN `endDt` DATETIME(3) NOT NULL,
    ADD COLUMN `startDt` DATETIME(3) NOT NULL,
    ADD COLUMN `updateDt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `create_dt`,
    DROP COLUMN `update_dt`,
    ADD COLUMN `createDt` DATETIME(3) NOT NULL,
    ADD COLUMN `updateDt` DATETIME(3) NOT NULL;
