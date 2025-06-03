/*
  Warnings:

  - Added the required column `listing_guests` to the `listings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "listings" ADD COLUMN     "listing_guests" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "zip_codes" (
    "zip_code_pk" UUID NOT NULL,
    "zip_code" TEXT NOT NULL,
    "zip_code_city_name" TEXT NOT NULL,
    "zip_code_district_name" TEXT NOT NULL,

    CONSTRAINT "zip_codes_pkey" PRIMARY KEY ("zip_code_pk")
);

-- CreateIndex
CREATE UNIQUE INDEX "zip_codes_zip_code_key" ON "zip_codes"("zip_code");

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_listing_zip_code_fkey" FOREIGN KEY ("listing_zip_code") REFERENCES "zip_codes"("zip_code") ON DELETE RESTRICT ON UPDATE CASCADE;
