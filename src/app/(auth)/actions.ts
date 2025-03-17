'use server';

import { UserSchema } from '@/prisma/generated/zod';
import { z } from 'zod';

const LoginSchema = UserSchema.pick({
  user_email: true,
  user_password: true,
});

const SignupSchema = UserSchema.pick({
  user_first_name: true,
  user_email: true,
  user_password: true,
});

type LoginInput = z.infer<typeof LoginSchema>;
type SignupInput = z.infer<typeof SignupSchema>;

export async function login(unsafedata: LoginInput) {
  const { success, data } = LoginSchema.safeParse(unsafedata);
  if (!success) {
    return { error: 'Invalid credentials' };
  }
  // TODO: Implement login logic
  // 1. Validate credentials
  // 2. Create session
  // 3. Return user data or error
}

export async function signup(unsafedata: SignupInput) {
  const { success, data } = SignupSchema.safeParse(unsafedata);
  if (!success) {
    return { error: 'Invalid credentials' };
  }
  // TODO: Implement signup logic
  // 1. Check if user exists
  // 2. Hash password
  // 3. Create user
  // 4. Create session
  // 5. Return user data or error
}

export async function logout() {
  // TODO: Implement logout logic
  // 1. Destroy session
  // 2. Redirect to home
}
