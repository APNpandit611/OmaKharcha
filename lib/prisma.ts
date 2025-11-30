
import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// Create a singleton to avoid exhausting connections in serverless environments
declare const globalThis: {
  prismaGlobal?: PrismaClient;
} & typeof global;

export const prisma =
  globalThis.prismaGlobal ??
  new PrismaClient({
    adapter,
    log: ["query", "error"], // optional logging
  });

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;