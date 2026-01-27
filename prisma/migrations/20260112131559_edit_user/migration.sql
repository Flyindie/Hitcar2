/*
  Warnings:

  - You are about to drop the column `display_name` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'User');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "display_name",
ADD COLUMN     "Role" "Role" NOT NULL DEFAULT 'User';
