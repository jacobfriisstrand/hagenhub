/*
  Warnings:

  - You are about to drop the `PhoneNumber` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "user_verified" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "PhoneNumber";
