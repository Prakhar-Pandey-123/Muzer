import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prismaClient = new PrismaClient({
  adapter,
});

// PrismaPg helps Prisma connect specifically to PostgreSQL using the DATABASE_URL.

// PrismaClient gives you, the developer, methods to interact with the database:
// prismaClient.user.findMany()
// prismaClient.user.create()
// prismaClient.user.update()
// prismaClient.user.delete()