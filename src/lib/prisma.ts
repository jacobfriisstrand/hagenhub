declare global {
  // eslint-disable-next-line no-var
  var prismaClient: PrismaClient | undefined;
}

import { PrismaClient } from "@prisma/client";

const prisma = globalThis.prismaClient || new PrismaClient({ log: ["info"] });
if (process.env.NODE_ENV !== "production")
  globalThis.prismaClient = prisma;

export default prisma;
