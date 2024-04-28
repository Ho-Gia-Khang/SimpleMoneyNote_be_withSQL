import { PrismaClient, Type } from "@prisma/client";
import { z, ZodType } from "zod";

const prisma = new PrismaClient();

export default prisma;

export const types: ZodType<Type> = z.enum(["income", "expense"]);
