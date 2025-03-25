"use server";

import type { z } from "zod";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { UserSchema } from "@/prisma/generated/zod";

import hashPassword, { generateSalt } from "./core/password-hasher";
import { createUserSession } from "./core/sessions";

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
  console.log(success, data);
  if (!success) {
    return { error: "Invalid credentials" };
  }
  // TODO: Implement login logic
  // 1. Validate credentials
  // 2. Create session
  // 3. Return user data or error
}

export async function signup(unsafedata: SignupInput) {
  const { success, data } = SignupSchema.safeParse(unsafedata);
  if (!success) {
    return { error: "Invalid credentials" };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      user_email: data.user_email,
    },
  });
  if (existingUser) {
    return { error: "User already exists" };
  }

  try {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(data.user_password, salt);

    const user = await prisma.user.create({
      data: {
        user_first_name: data.user_first_name,
        user_email: data.user_email,
        user_password: hashedPassword,
        salt,
      },
    });
    if (user === null) {
      return { error: "Failed to create user" };
    }

    await createUserSession(
      { id: user.user_pk, role: user.user_role as "user" | "admin" },
      await cookies(),
    );
  }
  catch (error) {
    console.error(error);
    return { error: "Failed to create user" };
  }
}

export async function logout() {
  // TODO: Implement logout logic
  // 1. Destroy session
  // 2. Redirect to home
}
