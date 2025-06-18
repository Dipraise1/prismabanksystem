import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
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

    // Get user with accounts and transactions
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        accounts: {
          include: {
            transactions: {
              orderBy: { createdAt: 'desc' },
              take: 10,
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Calculate totals
    const checkingAccount = user.accounts.find(acc => acc.type === 'CHECKING');
    const savingsAccount = user.accounts.find(acc => acc.type === 'SAVINGS');
    const totalBalance = user.accounts.reduce((sum, acc) => sum + acc.balance, 0);

    // Get recent transactions
    const allTransactions = user.accounts.flatMap(acc => 
      acc.transactions.map(tx => ({
        ...tx,
        accountType: acc.type,
      }))
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        kycStatus: user.kycStatus,
      },
      accounts: {
        checking: checkingAccount?.balance || 0,
        savings: savingsAccount?.balance || 0,
        totalBalance,
      },
      transactions: allTransactions.slice(0, 10),
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 