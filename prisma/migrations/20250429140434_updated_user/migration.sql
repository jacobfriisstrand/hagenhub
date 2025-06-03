/*
  Warnings:

  - You are about to drop the column `user_address` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_address",
ADD COLUMN     "user_street_name" TEXT,
ADD COLUMN     "user_street_number" TEXT,
ADD COLUMN     "user_zip_code" TEXT;
