import { PrismaClient } from "@prisma/client";

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

/**
 * @type {import('@prisma/client').PrismaClient}
 */
const client = global.prisma || new PrismaClient();

export { client };
