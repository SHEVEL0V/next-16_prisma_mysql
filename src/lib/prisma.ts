/** @format */

/**
 * Prisma Client Singleton
 * Manages database connection through MariaDB adapter
 * Implements singleton pattern to ensure single connection pool across app
 */

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client";

/**
 * MariaDB connection adapter with connection pool settings
 * Limits concurrent connections to 5 per pool
 * Configuration from environment variables:
 * - MYSQL_HOST: Database hostname
 * - MYSQL_USER: Database username
 * - MYSQL_PASSWORD: Database password
 * - MYSQL_DATABASE: Database name
 */
const adapter = new PrismaMariaDb({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 5,
});

/**
 * Create Prisma client with MariaDB adapter
 * Used as factory function for singleton pattern
 */
const prismaClientSingleton = () => new PrismaClient({ adapter });

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

/**
 * Global cache for Prisma client instance
 * Prevents multiple client instantiations across module reloads
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

/**
 * Prisma client singleton instance
 * Either uses cached instance or creates new one
 * Reused across all database operations
 */
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

/**
 * Cache Prisma instance during development
 * Prevents connection leaks from module hot-reloading
 * In production, use single instance (no caching needed)
 */
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
