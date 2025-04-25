-- CreateTable
CREATE TABLE "phone_numbers" (
    "phone_number_pk" UUID NOT NULL,
    "phone_number" TEXT NOT NULL,

    CONSTRAINT "phone_numbers_pkey" PRIMARY KEY ("phone_number_pk")
);
