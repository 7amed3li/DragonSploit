// src/utils/jwt.ts
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

export const signTokens = (user: { id: string; role: Role }) => {
  if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    console.error("JWT secrets are not defined in .env file");
    throw new Error("JWT secrets must be defined");
  }

  const accessToken = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};
