import { z } from "zod";

import { UserSchema } from "@/prisma/generated/zod";

import { redisClient } from "../redis/redis";

// Seven days in scounds
const SESSION_EXPIRATION_SECONDS = 7 * 24 * 60 * 60;
const COOKIE_SESSION_KEY = "session-id";

const sessionSchema = z.object({
  user_pk: z.string(),
  user_role: UserSchema.shape.user_role,
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

export async function updatedUserSessionData(
  user: UserSession,
  cookies: Pick<Cookies, "get">,
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null)
    return null;

  await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRATION_SECONDS,
  });
}

export async function createUserSession(
  user: UserSession,
  cookies: Pick<Cookies, "set">,
) {
  // Generate a session ID using a more deterministic approach
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  const sessionId = `${timestamp}-${random}`.normalize();

  await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRATION_SECONDS,
  });

  setCookie(sessionId, cookies);
}

export async function updateUserSessionExpiration(
  cookies: Pick<Cookies, "get" | "set">,
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null)
    return null;

  const user = await getUserSessionById(sessionId);
  if (user == null)
    return null;

  await redisClient.set(`session:${sessionId}`, user, {
    ex: SESSION_EXPIRATION_SECONDS,
  });

  setCookie(sessionId, cookies);
}

export async function removeUserFromSession(
  cookies: Pick<Cookies, "get" | "delete">,
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null)
    return null;

  await redisClient.del(`session:${sessionId}`);
  cookies.delete(COOKIE_SESSION_KEY);
}

function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  const expirationDate = new Date();
  expirationDate.setSeconds(expirationDate.getSeconds() + SESSION_EXPIRATION_SECONDS);

  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: expirationDate.getTime(),
  });
}

async function getUserSessionById(sessionId: string) {
  const rawUser = await redisClient.get(`session:${sessionId}`);

  const { success, data: user } = sessionSchema.safeParse(rawUser);

  return success ? user : null;
}
