import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// DECIMAL
//------------------------------------------------------

export const DecimalJsLikeSchema: z.ZodType<Prisma.DecimalJsLike> = z.object({
  d: z.array(z.number()),
  e: z.number(),
  s: z.number(),
  toFixed: z.function(z.tuple([]), z.string()),
});

export const DECIMAL_STRING_REGEX =
  /^(?:-?Infinity|NaN|-?(?:0[bB][01]+(?:\.[01]+)?(?:[pP][-+]?\d+)?|0[oO][0-7]+(?:\.[0-7]+)?(?:[pP][-+]?\d+)?|0[xX][\da-fA-F]+(?:\.[\da-fA-F]+)?(?:[pP][-+]?\d+)?|(?:\d+|\d*\.\d+)(?:[eE][-+]?\d+)?))$/;

export const isValidDecimalInput = (
  v?: null | string | number | Prisma.DecimalJsLike
): v is string | number | Prisma.DecimalJsLike => {
  if (v === undefined || v === null) return false;
  return (
    (typeof v === 'object' &&
      'd' in v &&
      'e' in v &&
      's' in v &&
      'toFixed' in v) ||
    (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
    typeof v === 'number'
  );
};

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  'ReadUncommitted',
  'ReadCommitted',
  'RepeatableRead',
  'Serializable',
]);

export const UserScalarFieldEnumSchema = z.enum([
  'user_pk',
  'user_first_name',
  'user_last_name',
  'user_email',
  'user_password',
  'user_phone_number',
  'user_address',
  'user_description',
  'user_avatar_url',
  'user_created_at',
  'user_updated_at',
]);

export const ListingScalarFieldEnumSchema = z.enum([
  'listing_pk',
  'listing_title',
  'listing_description',
  'listing_zip_code',
  'listing_street_name',
  'listing_address',
  'listing_price',
  'listing_area',
  'listing_type',
  'listing_latitude',
  'listing_longitude',
  'listing_guests',
  'listing_bedrooms',
  'listing_created_at',
  'listing_updated_at',
]);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const QueryModeSchema = z.enum(['default', 'insensitive']);

export const NullsOrderSchema = z.enum(['first', 'last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  user_pk: z.string(),
  user_first_name: z
    .string()
    .min(3, { message: 'min error' })
    .max(10, { message: 'max error' }),
  user_last_name: z.string(),
  user_email: z.string().email(),
  user_password: z.string(),
  user_phone_number: z.string(),
  user_address: z.string(),
  user_description: z.string(),
  user_avatar_url: z.string(),
  user_created_at: z.coerce.date(),
  user_updated_at: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// LISTING SCHEMA
/////////////////////////////////////////

export const ListingSchema = z.object({
  listing_pk: z.string().uuid(),
  listing_title: z.string(),
  listing_description: z.string(),
  listing_zip_code: z.number().int(),
  listing_street_name: z.string(),
  listing_address: z.string(),
  listing_price: z.instanceof(Prisma.Decimal, {
    message:
      "Field 'listing_price' must be a Decimal. Location: ['Models', 'Listing']",
  }),
  listing_area: z.string(),
  listing_type: z.string(),
  listing_latitude: z.number().nullable(),
  listing_longitude: z.number().nullable(),
  listing_guests: z.number().int(),
  listing_bedrooms: z.number().int(),
  listing_created_at: z.coerce.date(),
  listing_updated_at: z.coerce.date(),
});

export type Listing = z.infer<typeof ListingSchema>;
