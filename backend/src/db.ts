// backend/src/db.ts

import { PrismaClient } from '@prisma/client';

// قم بإنشاء نسخة واحدة من PrismaClient وقم بتصديرها
export const prisma = new PrismaClient();
