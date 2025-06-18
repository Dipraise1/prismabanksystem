'use client';

import { useState, useEffect } from 'react';

interface Account {
  id: string;
  type: 'CHECKING' | 'SAVINGS';
  balance: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  accounts: Account[];
}

export default function AdminAccounts() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data.users);
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateBalance = async (accountId: string, currentBalance: number) => {
    const newBalance = prompt('Enter new balance:', currentBalance.toString());
    if (newBalance === null) return;

    const numBalance = parseFloat(newBalance);
    if (isNaN(numBalance)) {
      alert('Please enter a valid number');
      return;
    }

    try {
      const response = await fetch('/api/admin/accounts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId,
          newBalance: numBalance,
          reason: 'Admin balance adjustment',
        }),
      });

      if (!response.ok) throw new Error('Failed to update balance');
      await fetchUsers(); // Refresh the list
    } catch (err) {
      alert('Failed to update balance');
      console.error(err);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Manage User Accounts</h1>
      
      <div className="space-y-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
            
            <div className="space-y-4">
              {user.accounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between border-t pt-4">
                  <div>
                    <span className="font-medium">{account.type}</span>
                    <span className="ml-4 text-gray-600">
                      Balance: ${account.balance.toFixed(2)}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => updateBalance(account.id, account.balance)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Update Balance
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 