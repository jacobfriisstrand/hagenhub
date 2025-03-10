import { z } from 'zod';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

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

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const QueryModeSchema = z.enum(['default', 'insensitive']);
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
