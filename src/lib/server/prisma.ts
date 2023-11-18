import {
  PrismaClient,
  Material,
  User,
  UserKey,
  UserSession,
} from "@prisma/client";
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV == "development") global.prisma = prisma;
const { material, user, userSession, userKey } = prisma;

export { prisma };
export type { Material, User, UserKey, UserSession };
