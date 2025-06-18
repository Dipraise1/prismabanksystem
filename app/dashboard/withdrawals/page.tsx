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
  account: {
    type: string;
  };
}

interface Account {
  id: string;
  type: string;
  balance: number;
}

export default function Withdrawals() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form state
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch user's accounts
      const accountsResponse = await fetch('/api/user/accounts');
      if (!accountsResponse.ok) throw new Error('Failed to fetch accounts');
      const accountsData = await accountsResponse.json();
      setAccounts(accountsData.accounts);

      // Fetch withdrawal requests
      const withdrawalsResponse = await fetch('/api/user/withdrawals');
      if (!withdrawalsResponse.ok) throw new Error('Failed to fetch withdrawals');
      const withdrawalsData = await withdrawalsResponse.json();
      setWithdrawals(withdrawalsData.withdrawals);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/user/withdrawals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId: selectedAccountId,
          amount: parseFloat(amount),
          bankName,
          accountNumber,
          accountName,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit withdrawal request');
      }

      // Reset form
      setSelectedAccountId('');
      setAmount('');
      setBankName('');
      setAccountNumber('');
      setAccountName('');

      // Refresh data
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit request');
      console.error(err);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Bank Withdrawals</h1>

      {/* New Withdrawal Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Request New Withdrawal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">From Account</label>
            <select
              value={selectedAccountId}
              onChange={(e) => setSelectedAccountId(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Account</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.type} - Balance: ${account.balance.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded"
              required
              min="0.01"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bank Name</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Account Name</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit Withdrawal Request
          </button>
        </form>
      </div>

      {/* Withdrawal History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Withdrawal History</h2>
        <div className="space-y-4">
          {withdrawals.length === 0 ? (
            <p className="text-gray-500">No withdrawal requests yet</p>
          ) : (
            withdrawals.map((withdrawal) => (
              <div
                key={withdrawal.id}
                className="border-b pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      ${withdrawal.amount.toFixed(2)} from {withdrawal.account.type}
                    </p>
                    <p className="text-sm text-gray-600">
                      To: {withdrawal.bankName} - {withdrawal.accountNumber}
                    </p>
                    <p className="text-sm text-gray-600">
                      Account Name: {withdrawal.accountName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(withdrawal.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        withdrawal.status === 'COMPLETED'
                          ? 'bg-green-100 text-green-800'
                          : withdrawal.status === 'REJECTED'
                          ? 'bg-red-100 text-red-800'
                          : withdrawal.status === 'APPROVED'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
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
            ))
          )}
        </div>
      </div>
    </div>
  );
} 