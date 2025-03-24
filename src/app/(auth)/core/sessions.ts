import { UserSchema } from '@/prisma/generated/zod';
import { z } from 'zod';
import crypto from 'crypto';
import { redisClient } from '../redis/redis';

// Seven days in scounds
const SESSION_EXPIRATION_SECONDS = 7 * 24 * 60 * 60;
const COOKIE_SESSION_KEY = 'session-id';

const sessionSchema = z.object({
  id: z.string(),
  role: UserSchema.shape.user_role,
});

type UserSession = z.infer<typeof sessionSchema>;

export type Cookies = {
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      sameSite?: 'strict' | 'lax';
      expires?: number;
      httpOnly?: boolean;
    }
  ) => void;
};

export async function createUserSession(user: UserSession, cookies: Cookies) {
  const sessionId = crypto.randomBytes(512).toString('hex').normalize();
  await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRATION_SECONDS,
  });

  setCookie(sessionId, cookies);
}

function setCookie(sessionId: string, cookies: Pick<Cookies, 'set'>) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
}
