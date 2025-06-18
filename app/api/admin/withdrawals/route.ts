import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/db';

// Get all withdrawal requests
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Verify admin role
    const admin = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const withdrawals = await prisma.withdrawalRequest.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        account: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ withdrawals });
  } catch (error) {
    console.error('Get withdrawals error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Process withdrawal request (approve/reject/complete)
export async function PATCH(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Verify admin role
    const admin = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const { withdrawalId, status, reason } = await request.json();

    // Update withdrawal request status
    const result = await prisma.$transaction(async (tx) => {
      const withdrawal = await tx.withdrawalRequest.findUnique({
        where: { id: withdrawalId },
        include: { account: true },
      });

      if (!withdrawal) {
        throw new Error('Withdrawal request not found');
      }

      // If completing the withdrawal, update account balance
      if (status === 'COMPLETED') {
        await tx.account.update({
          where: { id: withdrawal.accountId },
          data: {
            balance: {
              decrement: withdrawal.amount,
            },
          },
        });

        // Create transaction record
        await tx.transaction.create({
          data: {
            userId: withdrawal.userId,
            accountId: withdrawal.accountId,
            type: 'WITHDRAWAL',
            amount: withdrawal.amount,
            description: `Bank withdrawal to ${withdrawal.bankName} - ${withdrawal.accountNumber}`,
          },
        });
      }

      // Update withdrawal request
      const updatedWithdrawal = await tx.withdrawalRequest.update({
        where: { id: withdrawalId },
        data: {
          status,
          reason,
        },
      });

      // Log admin action
      await tx.adminAction.create({
        data: {
          adminId: payload.userId,
          action: 'PROCESS_WITHDRAWAL',
          targetUserId: withdrawal.userId,
          details: JSON.stringify({
            withdrawalId,
            status,
            reason,
            amount: withdrawal.amount,
          }),
        },
      });

      return updatedWithdrawal;
    });

    return NextResponse.json({
      message: 'Withdrawal request processed successfully',
      withdrawal: result,
    });
  } catch (error) {
    console.error('Process withdrawal error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 