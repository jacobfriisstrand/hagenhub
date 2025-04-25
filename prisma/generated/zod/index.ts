import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['user_pk','user_first_name','user_last_name','user_email','user_password','salt','user_dob','user_phone_number','user_address','user_description','user_avatar_url','user_role','user_verified','user_created_at','user_updated_at']);

export const ListingScalarFieldEnumSchema = z.enum(['listing_pk','listing_title','listing_description','listing_zip_code','listing_street_name','listing_street_number','listing_night_price','listing_area_fk','listing_type_fk','listing_latitude','listing_longitude','listing_guest_count','listing_bedrooms','listing_user_fk','listing_created_at','listing_updated_at','listing_deleted_at']);

export const ListingAreaScalarFieldEnumSchema = z.enum(['listing_area_pk','listing_area_name']);

export const ListingTypeScalarFieldEnumSchema = z.enum(['listing_type_pk','listing_type_name','listing_type_icon']);

export const ReviewScalarFieldEnumSchema = z.enum(['review_pk','review_rating','review_comment','review_created_at','review_user_fk','review_listing_fk','review_booking_fk']);

export const BookingScalarFieldEnumSchema = z.enum(['booking_pk','booking_guest_fk','booking_listing_fk','booking_guest_count','booking_night_count','booking_check_in','booking_check_out','booking_status','booking_created_at','booking_updated_at']);

export const ListingImageScalarFieldEnumSchema = z.enum(['listing_image_pk','listing_image_url','listing_image_listing_fk']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  user_pk: z.string().uuid(),
  user_first_name: z.string().min(3, { message: "Name must be at least 2 characters long" }).max(256, { message: "Name must be less than 256 characters long" }),
  user_last_name: z.string().min(2, { message: "Last name must be at least 2 characters long" }).max(256, { message: "Last name must be less than 256 characters long" }).nullable(),
  user_email: z.string().email({ message: "Please enter a valid email address" }),
  /**
   * .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
   * message: "Password must contain at least one uppercase letter, one number, and one special character"
   * })
   */
  user_password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  salt: z.string(),
  user_dob: z.coerce.date().nullable(),
  user_phone_number: z.string().regex(/^\d+$/, { message: "Phone number can only contain numbers" }).nullable(),
  user_address: z.string().min(2, { message: "Address must be at least 2 characters long" }).max(100, { message: "Address must be less than 100 characters long" }).nullable(),
  user_description: z.string().min(10, { message: "Description must be at least 10 characters long" }).max(500, { message: "Description must be less than 500 characters long" }).nullable(),
  user_avatar_url: z.string().nullable(),
  user_role: z.enum(["user", "admin"]),
  user_verified: z.boolean(),
  user_created_at: z.coerce.date().nullable(),
  user_updated_at: z.coerce.date().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// LISTING SCHEMA
/////////////////////////////////////////

export const ListingSchema = z.object({
  listing_pk: z.string().uuid(),
  listing_title: z.string().min(2, { message: "Title must be at least 2 characters long" }).max(100, { message: "Title must be less than 100 characters long" }),
  listing_description: z.string().min(10, { message: "Description must be at least 10 characters long" }).max(500, { message: "Description must be less than 500 characters long" }),
  listing_zip_code: z.string().regex(/^\d{4}$/, { message: "Zip code must be exactly 4 digits" }),
  listing_street_name: z.string().min(2, { message: "Street name must be at least 2 characters long" }).max(100, { message: "Street name must be less than 100 characters long" }),
  listing_street_number: z.string().regex(/^\d+$/, { message: "Street number can only contain numbers" }),
  listing_night_price: z.number().min(1, { message: "Price must be greater than 0" }),
  listing_area_fk: z.string(),
  listing_type_fk: z.string(),
  listing_latitude: z.number(),
  listing_longitude: z.number(),
  listing_guest_count: z.number().min(1, { message: "Minimum 1 guest spot is required" }),
  listing_bedrooms: z.number().min(1, { message: "Minimum 1 bedroom is required" }),
  listing_user_fk: z.string(),
  listing_created_at: z.coerce.date(),
  listing_updated_at: z.coerce.date(),
  listing_deleted_at: z.coerce.date().nullable(),
})

export type Listing = z.infer<typeof ListingSchema>

/////////////////////////////////////////
// LISTING AREA SCHEMA
/////////////////////////////////////////

export const ListingAreaSchema = z.object({
  listing_area_pk: z.string().uuid(),
  listing_area_name: z.string(),
})

export type ListingArea = z.infer<typeof ListingAreaSchema>

/////////////////////////////////////////
// LISTING TYPE SCHEMA
/////////////////////////////////////////

export const ListingTypeSchema = z.object({
  listing_type_pk: z.string().uuid(),
  listing_type_name: z.string(),
  listing_type_icon: z.string(),
})

export type ListingType = z.infer<typeof ListingTypeSchema>

/////////////////////////////////////////
// REVIEW SCHEMA
/////////////////////////////////////////

export const ReviewSchema = z.object({
  review_pk: z.string().uuid(),
  review_rating: z.number().min(1).max(5).step(0.5).refine(val => [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].includes(val), { message: "Rating must be one of: 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5" }),
  review_comment: z.string().min(10, { message: "Review must be at least 10 characters long" }).max(500, { message: "Review must be less than 500 characters long" }),
  review_created_at: z.coerce.date(),
  review_user_fk: z.string(),
  review_listing_fk: z.string(),
  review_booking_fk: z.string(),
})

export type Review = z.infer<typeof ReviewSchema>

/////////////////////////////////////////
// BOOKING SCHEMA
/////////////////////////////////////////

export const BookingSchema = z.object({
  booking_pk: z.string().uuid(),
  booking_guest_fk: z.string(),
  booking_listing_fk: z.string(),
  booking_guest_count: z.number().min(1, { message: "Minimum 1 guest is required" }),
  booking_night_count: z.number().min(1, { message: "Minimum 1 night is required" }),
  booking_check_in: z.coerce.date(),
  booking_check_out: z.coerce.date(),
  booking_status: z.enum(["Pending", "Confirmed", "Completed", "Cancelled"]),
  booking_created_at: z.coerce.date(),
  booking_updated_at: z.coerce.date(),
})

export type Booking = z.infer<typeof BookingSchema>

/////////////////////////////////////////
// LISTING IMAGE SCHEMA
/////////////////////////////////////////

export const ListingImageSchema = z.object({
  listing_image_pk: z.string().uuid(),
  listing_image_url: z.string(),
  listing_image_listing_fk: z.string(),
})

export type ListingImage = z.infer<typeof ListingImageSchema>
