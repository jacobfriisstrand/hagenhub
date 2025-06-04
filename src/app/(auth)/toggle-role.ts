"use server";

import { cookies } from "next/headers";

import { updatedUserSessionData } from "@/app/(auth)/core/sessions";
import { getCurrentUser } from "@/app/(auth)/current-user";
import prisma from "@/lib/prisma";

export async function toggleRole() {
  const user = await getCurrentUser({
    withFullUser: false,
    redirectIfNotFound: true,
  });

  const updatedUser = await prisma.user.update({
    where: {
      user_pk: user.user_pk,
    },
    data: {
      user_role: user.user_role === "admin" ? "user" : "admin",
    },
  });

  await updatedUserSessionData(
    {
      user_pk: updatedUser.user_pk,
      user_role: updatedUser.user_role as "user" | "admin",
    },
    await cookies(),
  );

  return updatedUser;
}
