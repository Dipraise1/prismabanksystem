'use client';

import { useState, useEffect } from 'react';

interface WithdrawalRequest {
  id: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
  createdAt: string;
  reason?: string;
  user: {
    name: string;
    email: string;
  };
  account: {
    type: string;
    balance: number;
  };
}

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      const response = await fetch('/api/admin/withdrawals');
      if (!response.ok) throw new Error('Failed to fetch withdrawals');
      const data = await response.json();
      setWithdrawals(data.withdrawals);
    } catch (err) {
      setError('Failed to load withdrawals');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    withdrawalId: string,
    status: 'APPROVED' | 'REJECTED' | 'COMPLETED',
    currentBalance: number,
    requestAmount: number
  ) => {
    let reason = '';
    
    if (status === 'REJECTED') {
      reason = prompt('Please provide a reason for rejection:') || '';
      if (!reason) return;
    }

    if (status === 'COMPLETED' && currentBalance < requestAmount) {
      alert('Insufficient balance to complete this withdrawal');
      return;
    }

    try {
      const response = await fetch('/api/admin/withdrawals', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          withdrawalId,
          status,
          reason,
        }),
      });

      if (!response.ok) throw new Error('Failed to update withdrawal status');
      await fetchWithdrawals();
    } catch (err) {
      alert('Failed to update withdrawal status');
      console.error(err);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  const pendingWithdrawals = withdrawals.filter((w) => w.status === 'PENDING');
  const otherWithdrawals = withdrawals.filter((w) => w.status !== 'PENDING');

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Withdrawals</h1>

      {/* Pending Withdrawals */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Pending Withdrawals ({pendingWithdrawals.length})
        </h2>
        <div className="space-y-6">
          {pendingWithdrawals.map((withdrawal) => (
            <div
              key={withdrawal.id}
              className="border-b pb-6 last:border-b-0 last:pb-0"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">
                    {withdrawal.user.name} ({withdrawal.user.email})
                  </p>
                  <p className="text-lg font-semibold text-blue-600">
                    ${withdrawal.amount.toFixed(2)} from {withdrawal.account.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    To: {withdrawal.bankName} - {withdrawal.accountNumber}
                  </p>
                  <p className="text-sm text-gray-600">
                    Account Name: {withdrawal.accountName}
                  </p>
                  <p className="text-sm text-gray-500">
                    Requested: {new Date(withdrawal.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Current Balance: ${withdrawal.account.balance.toFixed(2)}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() =>
                      handleStatusUpdate(
                        withdrawal.id,
                        'APPROVED',
                        withdrawal.account.balance,
                        withdrawal.amount
                      )
                    }
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleStatusUpdate(
                        withdrawal.id,
                        'COMPLETED',
                        withdrawal.account.balance,
                        withdrawal.amount
                      )
                    }
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() =>
                      handleStatusUpdate(
                        withdrawal.id,
                        'REJECTED',
                        withdrawal.account.balance,
                        withdrawal.amount
                      )
                    }
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
          {pendingWithdrawals.length === 0 && (
            <p className="text-gray-500">No pending withdrawals</p>
          )}
        </div>
      </div>

      {/* Other Withdrawals */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Processed Withdrawals ({otherWithdrawals.length})
        </h2>
        <div className="space-y-4">
          {otherWithdrawals.map((withdrawal) => (
            <div
              key={withdrawal.id}
              className="border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">
                    {withdrawal.user.name} ({withdrawal.user.email})
                  </p>
                  <p className="text-lg">
                    ${withdrawal.amount.toFixed(2)} from {withdrawal.account.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    To: {withdrawal.bankName} - {withdrawal.accountNumber}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(withdrawal.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      withdrawal.status === 'COMPLETED'
                        ? 'bg-green-100 text-green-800'
                        : withdrawal.status === 'REJECTED'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {withdrawal.status}
                  </span>
                  {withdrawal.reason && (
                    <p className="text-sm text-gray-500 mt-1">
                      {withdrawal.reason}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 