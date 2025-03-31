import crypto from "node:crypto";
import { z } from "zod";

import { UserSchema } from "@/prisma/generated/zod";

import { redisClient } from "../redis/redis";

// Seven days in scounds
const SESSION_EXPIRATION_SECONDS = 7 * 24 * 60 * 60;
const COOKIE_SESSION_KEY = "session-id";

const sessionSchema = z.object({
  id: z.string(),
  role: UserSchema.shape.user_role,
});

type UserSession = z.infer<typeof sessionSchema>;

export type Cookies = {
  get: (key: string) => { name: string; value: string } | undefined;
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      sameSite?: "strict" | "lax";
      expires?: number;
      httpOnly?: boolean;
    }
  ) => void;
  delete: (key: string) => void;
};

export function getUserFromSession(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null)
    return null;

  return getUserSessionById(sessionId);
}

export async function createUserSession(
  user: UserSession,
  cookies: Pick<Cookies, "set">,
) {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();
  await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRATION_SECONDS,
  });

  setCookie(sessionId, cookies);
}

export async function removeUserFromSession(
  cookies: Pick<Cookies, "get" | "delete">,
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null)
    return;

  await redisClient.del(`session:${sessionId}`);
  cookies.delete(COOKIE_SESSION_KEY);
}

function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
}

async function getUserSessionById(sessionId: string) {
  const rawUser = await redisClient.get(`session:${sessionId}`);

  const { success, data: user } = sessionSchema.safeParse(rawUser);

  return success ? user : null;
}
