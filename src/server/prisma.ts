import { PrismaClient } from "@prisma/client";
import extension from "prisma-paginate";

export const prisma = new PrismaClient().$extends(extension);
