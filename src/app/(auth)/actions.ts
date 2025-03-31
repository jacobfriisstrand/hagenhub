"use server";

import type { z } from "zod";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
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
    return { error: "User not found" };
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.user_password,
    password: data.user_password,
    salt: user.salt,
  });

  if (!isCorrectPassword) {
    return { error: "Invalid credentials" };
  }

  await createUserSession(
    { id: user.user_pk, role: user.user_role as "user" | "admin" },
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
  redirect("/");
}

export async function logout() {
  await removeUserFromSession(await cookies());
  redirect("/");
}
