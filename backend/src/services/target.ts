// src/services/target.ts

import { PrismaClient, Target } from '@prisma/client';

const prisma = new PrismaClient();

// --- واجهة البيانات ---
interface HedefOlusturmaVerisi {
  name: string;
  url: string;
  organizationId: string;
  olusturanId: string;
}

// --- الدالة 1: إنشاء هدف ---
export const organizasyonIcinHedefOlustur = async (veri: HedefOlusturmaVerisi): Promise<Target> => {
  const uyelik = await prisma.membership.findUnique({
    where: {
      userId_organizationId: {
        userId: veri.olusturanId,
        organizationId: veri.organizationId,
      },
    },
  });

  if (!uyelik) {
    throw new Error('YASAK: Kullanıcı bu organizasyonun üyesi değil.');
  }

  const yeniHedef = await prisma.target.create({
    data: {
      name: veri.name,
      url: veri.url,
      organizationId: veri.organizationId,
    },
  });

  return yeniHedef;
};

// --- الدالة 2: عرض قائمة الأهداف ---
export const organizasyonHedefleriniGetir = async (organizationId: string, userId: string): Promise<Target[]> => {
  const uyelik = await prisma.membership.findUnique({
    where: {
      userId_organizationId: {
        userId: userId,
        organizationId: organizationId,
      },
    },
  });

  if (!uyelik) {
    throw new Error('YASAK: Kullanıcı bu organizasyonun üyesi değil.');
  }

  const hedefler = await prisma.target.findMany({
    where: {
      organizationId: organizationId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return hedefler;
};

// --- الدالة 3: عرض هدف واحد ---
export const tekHedefiGetir = async (targetId: string, userId: string): Promise<Target | null> => {
  const hedef = await prisma.target.findFirst({
    where: {
      id: targetId,
      organization: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
    },
  });
  return hedef;
};

// --- الدالة 4: حذف هدف ---
export const hedefiSil = async (targetId: string, userId: string): Promise<Target> => {
  const mevcutHedef = await tekHedefiGetir(targetId, userId);

  if (!mevcutHedef) {
    throw new Error('NOT_FOUND_OR_FORBIDDEN');
  }

  const silinenHedef = await prisma.target.delete({
    where: {
      id: targetId,
    },
  });
  return silinenHedef;
};
