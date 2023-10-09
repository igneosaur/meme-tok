import { PrismaClient } from "@prisma/client";
export { type Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
