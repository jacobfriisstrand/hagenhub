"use server";

import type { z } from "zod";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "sonner";

import prisma from "@/lib/prisma";
import { UserSchema } from "@/prisma/generated/zod";

import hashPassword, {
  comparePasswords,
  generateSalt,
} from "./core/password-hasher";
import { createUserSession, removeUserFromSession } from "./core/sessions";

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
type UserRole = z.infer<typeof UserSchema.shape.user_role>;

export async function login(unsafedata: LoginInput) {
  const { success, data } = LoginSchema.safeParse(unsafedata);

  if (!success) {
    return { error: "Invalid credentials" };
  }

  const user = await prisma.user.findUnique({
    select: {
      user_pk: true,
      user_email: true,
      user_first_name: true,
      user_role: true,
      salt: true,
      user_password: true,
    },
    where: {
      user_email: data.user_email,
    },
  });

  if (!user) {
    return { error: "Invalid email or password. Please try again." };
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.user_password,
    password: data.user_password,
    salt: user.salt,
  });

  if (!isCorrectPassword) {
    toast.error("Invalid email or password. Please try again.");
    return { error: "Invalid credentials" };
  }

  await createUserSession(
    { user_pk: user.user_pk, user_role: user.user_role as UserRole },
    await cookies(),
  );

  redirect("/");
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
    return { error: "Unable to create account. Please try again." };
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
      { user_pk: user.user_pk, user_role: user.user_role as UserRole },
      await cookies(),
    );
  }
  catch (error) {
    console.error(error);
    return { error: "Failed to create user" };
  }
}

export async function logout() {
  await removeUserFromSession(await cookies());
}
