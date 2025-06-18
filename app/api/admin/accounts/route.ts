import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function PATCH(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify token and check admin role
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const admin = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const { accountId, newBalance, reason } = await request.json();

    // Get the account
    const account = await prisma.account.findUnique({
      where: { id: accountId },
      include: { user: true },
    });

    if (!account) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    const oldBalance = account.balance;
    const difference = newBalance - oldBalance;

    // Update account balance and create transaction record
    const result = await prisma.$transaction(async (tx) => {
      // Update account balance
      const updatedAccount = await tx.account.update({
        where: { id: accountId },
        data: { balance: newBalance },
      });

      // Create transaction record
      await tx.transaction.create({
        data: {
          userId: account.userId,
          accountId: accountId,
          type: difference > 0 ? 'DEPOSIT' : 'WITHDRAWAL',
          amount: Math.abs(difference),
          description: `Admin adjustment: ${reason || 'Balance update'}`,
        },
      });

      // Log admin action
      await tx.adminAction.create({
        data: {
          adminId: payload.userId,
          action: 'UPDATE_BALANCE',
          targetUserId: account.userId,
          details: JSON.stringify({
            accountId,
            oldBalance,
            newBalance,
            difference,
            reason,
          }),
        },
      });

      return updatedAccount;
    });

    return NextResponse.json({
      message: 'Account balance updated successfully',
      account: result,
    });
  } catch (error) {
    console.error('Admin update balance error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 