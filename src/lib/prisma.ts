import { PrismaClient } from "@prisma/client";

declare global {
  // @ts-ignore
  var prisma: PrismaClient | undefined;
}

// @ts-ignore
const prisma = global.prisma || new PrismaClient({ log: ["info"] });
if (process.env.NODE_ENV !== "production")
  // @ts-ignore
  global.prisma = prisma;

export default prisma;