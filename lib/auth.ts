import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

export async function createUser(
  email: string, 
  name: string, 
  password: string, 
  phone?: string,
  initialCheckingAmount: number = 0,
  initialSavingsAmount: number = 0
) {
  const hashedPassword = await hashPassword(password);
  
  const user = await prisma.user.create({
    data: {
      email,
      name,
      phone,
      password: hashedPassword,
    },
  });

  // Create default accounts with initial amounts
  await prisma.account.createMany({
    data: [
      {
        userId: user.id,
        type: 'CHECKING',
        balance: initialCheckingAmount,
      },
      {
        userId: user.id,
        type: 'SAVINGS',
        balance: initialSavingsAmount,
      },
    ],
  });

  return user;
}

export function generateAccountNumber(prefix: string): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
}

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      accounts: true,
    },
  });

  if (!user || !(await verifyPassword(password, user.password))) {
    return null;
  }

  const token = generateToken(user.id);
  return { user, token };
} 