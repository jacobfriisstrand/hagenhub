import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";

export async function getUserByPk(user_pk: string) {
  const user = await prisma.user.findUnique({
    where: {
      user_pk,
    },
    select: {
      user_pk: true,
      user_first_name: true,
      user_avatar_url: true,
    },
  });

  if (!user) {
    notFound();
  }

  return user;
}
