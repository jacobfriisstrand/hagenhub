-- CreateTable
CREATE TABLE "users" (
    "user_pk" UUID NOT NULL,
    "user_test" TEXT NOT NULL,
    "user_first_name" TEXT NOT NULL,
    "user_last_name" TEXT,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "user_dob" TIMESTAMP(3),
    "user_phone_number" TEXT,
    "user_address" TEXT,
    "user_description" TEXT,
    "user_avatar_url" TEXT,
    "user_role" TEXT NOT NULL DEFAULT 'user',
    "user_created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_updated_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_pk")
);

-- CreateTable
CREATE TABLE "listings" (
    "listing_pk" UUID NOT NULL,
    "listing_title" TEXT NOT NULL,
    "listing_description" TEXT NOT NULL,
    "listing_zip_code" TEXT NOT NULL,
    "listing_street_name" TEXT NOT NULL,
    "listing_street_number" TEXT NOT NULL,
    "listing_night_price" INTEGER NOT NULL,
    "listing_area_fk" UUID NOT NULL,
    "listing_type_fk" UUID NOT NULL,
    "listing_latitude" DOUBLE PRECISION NOT NULL,
    "listing_longitude" DOUBLE PRECISION NOT NULL,
    "listing_guest_count" INTEGER NOT NULL,
    "listing_bedrooms" INTEGER NOT NULL,
    "listing_user_fk" UUID NOT NULL,
    "listing_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "listing_updated_at" TIMESTAMP(3) NOT NULL,
    "listing_deleted_at" TIMESTAMP(3),

    CONSTRAINT "listings_pkey" PRIMARY KEY ("listing_pk")
);

-- CreateTable
CREATE TABLE "listing_areas" (
    "listing_area_pk" UUID NOT NULL,
    "listing_area_name" TEXT NOT NULL,

    CONSTRAINT "listing_areas_pkey" PRIMARY KEY ("listing_area_pk")
);

-- CreateTable
CREATE TABLE "listing_types" (
    "listing_type_pk" UUID NOT NULL,
    "listing_type_name" TEXT NOT NULL,
    "listing_type_icon" TEXT NOT NULL,

    CONSTRAINT "listing_types_pkey" PRIMARY KEY ("listing_type_pk")
);

-- CreateTable
CREATE TABLE "reviews" (
    "review_pk" UUID NOT NULL,
    "review_rating" DOUBLE PRECISION NOT NULL,
    "review_comment" TEXT NOT NULL,
    "review_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "review_user_fk" UUID NOT NULL,
    "review_listing_fk" UUID NOT NULL,
    "review_booking_fk" UUID NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_pk")
);

-- CreateTable
CREATE TABLE "bookings" (
    "booking_pk" UUID NOT NULL,
    "booking_guest_fk" UUID NOT NULL,
    "booking_listing_fk" UUID NOT NULL,
    "booking_guest_count" INTEGER NOT NULL,
    "booking_night_count" INTEGER NOT NULL,
    "booking_check_in" TIMESTAMP(3) NOT NULL,
    "booking_check_out" TIMESTAMP(3) NOT NULL,
    "booking_status" TEXT NOT NULL DEFAULT 'Pending',
    "booking_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "booking_updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("booking_pk")
);

-- CreateTable
CREATE TABLE "listing_images" (
    "listing_image_pk" UUID NOT NULL,
    "listing_image_url" TEXT NOT NULL,
    "listing_image_listing_fk" UUID NOT NULL,

    CONSTRAINT "listing_images_pkey" PRIMARY KEY ("listing_image_pk")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_review_booking_fk_key" ON "reviews"("review_booking_fk");

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_listing_area_fk_fkey" FOREIGN KEY ("listing_area_fk") REFERENCES "listing_areas"("listing_area_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_listing_type_fk_fkey" FOREIGN KEY ("listing_type_fk") REFERENCES "listing_types"("listing_type_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_listing_user_fk_fkey" FOREIGN KEY ("listing_user_fk") REFERENCES "users"("user_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_review_user_fk_fkey" FOREIGN KEY ("review_user_fk") REFERENCES "users"("user_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_review_listing_fk_fkey" FOREIGN KEY ("review_listing_fk") REFERENCES "listings"("listing_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_review_booking_fk_fkey" FOREIGN KEY ("review_booking_fk") REFERENCES "bookings"("booking_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_booking_guest_fk_fkey" FOREIGN KEY ("booking_guest_fk") REFERENCES "users"("user_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_booking_listing_fk_fkey" FOREIGN KEY ("booking_listing_fk") REFERENCES "listings"("listing_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listing_images" ADD CONSTRAINT "listing_images_listing_image_listing_fk_fkey" FOREIGN KEY ("listing_image_listing_fk") REFERENCES "listings"("listing_pk") ON DELETE RESTRICT ON UPDATE CASCADE;
