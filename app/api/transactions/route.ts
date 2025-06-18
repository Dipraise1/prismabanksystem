import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify token
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { type, amount, description, accountType = 'CHECKING' } = await request.json();

    // Validate input
    if (!type || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid transaction data' },
        { status: 400 }
      );
    }

    // Get user's account
    const account = await prisma.account.findFirst({
      where: {
        userId: payload.userId,
        type: accountType,
      },
    });

    if (!account) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    // Check balance for withdrawals
    if (type === 'WITHDRAWAL' && account.balance < amount) {
      return NextResponse.json(
        { error: 'Insufficient funds' },
        { status: 400 }
      );
    }

    // Calculate new balance
    let newBalance = account.balance;
    if (type === 'DEPOSIT') {
      newBalance += amount;
    } else if (type === 'WITHDRAWAL') {
      newBalance -= amount;
    }

    // Create transaction and update balance in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create transaction record
      const transaction = await tx.transaction.create({
        data: {
          userId: payload.userId,
          accountId: account.id,
          type: type,
          amount: amount,
          description: description || `${type.toLowerCase()} transaction`,
        },
      });

      // Update account balance
      await tx.account.update({
        where: { id: account.id },
        data: { balance: newBalance },
      });

      return transaction;
    });

    return NextResponse.json({
      message: 'Transaction completed successfully',
      transaction: result,
      newBalance,
    });
  } catch (error) {
    console.error('Transaction error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 