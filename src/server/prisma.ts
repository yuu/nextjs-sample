import { Prisma, PrismaClient } from "@prisma/client";
import extension from "prisma-paginate";

const log: Array<Prisma.LogLevel> =
  process.env.NODE_ENV === "development"
    ? ["query", "error", "warn"]
    : ["error"];

export const prisma = new PrismaClient({
  log: log,
}).$extends(extension);
