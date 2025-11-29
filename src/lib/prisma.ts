import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as any;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;
