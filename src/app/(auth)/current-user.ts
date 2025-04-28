import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { prisma } from "@/lib/prisma";

import { getUserFromSession } from "./core/sessions";

type FullUser = Exclude<
  Awaited<ReturnType<typeof getUserFromDb>>,
  undefined | null
>;

type User = Exclude<
  Awaited<ReturnType<typeof getUserFromSession>>,
  undefined | null
>;

function _getCurrentUser(options: {
  withFullUser: true;
  redirectIfNotFound: true;
}): Promise<FullUser>;
function _getCurrentUser(options: {
  withFullUser: true;
  redirectIfNotFound: false;
}): Promise<FullUser | null>;
function _getCurrentUser(options: {
  withFullUser: false;
  redirectIfNotFound: true;
}): Promise<User>;
function _getCurrentUser(options: {
  withFullUser: false;
  redirectIfNotFound: false;
}): Promise<User | null>;
async function _getCurrentUser({
  withFullUser = false,
  redirectIfNotFound = false,
} = {}) {
  const user = await getUserFromSession(await cookies());

  if (user == null) {
    if (redirectIfNotFound) {
      redirect("/login");
    }
    return null;
  }

  const fullUser = withFullUser
    ? await getUserFromDb(user.user_pk)
    : null;

  if (withFullUser) {
  // This should never happen
    if (fullUser == null) {
      throw new Error("User not found");
    }
    return fullUser;
  }
  return user;
}

export const getCurrentUser = cache(_getCurrentUser);

async function getUserFromDb(id: string) {
  const user = await prisma.user.findUnique({
    select: {
      user_pk: true,
      user_email: true,
      user_first_name: true,
      user_role: true,
    },
    where: {
      user_pk: id,
    },
  });
  return user;
}
