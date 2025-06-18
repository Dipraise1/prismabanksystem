'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  Settings, 
  Eye, 
  Edit3, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  TrendingUp,
  Activity,
  Filter,
  Search,
  Calendar,
  UserPlus,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Account {
  id: string;
  type: 'CHECKING' | 'SAVINGS';
  balance: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  kycStatus: string;
  phone?: string;
  address?: string;
  occupation?: string;
  createdAt: string;
  accounts: Account[];
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest');
  const [filterKyc, setFilterKyc] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [balanceModal, setBalanceModal] = useState<{
    isOpen: boolean;
    user: User | null;
    accountType: 'CHECKING' | 'SAVINGS';
  }>({
    isOpen: false,
    user: null,
    accountType: 'CHECKING',
  });
  const [newBalance, setNewBalance] = useState('');
  const [reason, setReason] = useState('');
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

  const updateUserStatus = async (userId: string, updates: any) => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, updates }),
      });

      if (response.ok) {
        fetchUsers();
        setMessage('User updated successfully');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Error updating user');
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'REJECTED': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const isNewUser = (createdAt: string) => {
    const userDate = new Date(createdAt);
    const now = new Date();
    const diffInHours = (now.getTime() - userDate.getTime()) / (1000 * 60 * 60);
    return diffInHours <= 24; // Consider users created in last 24 hours as "new"
  };

  const filteredAndSortedUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesKyc = filterKyc === 'ALL' || user.kycStatus === filterKyc;
      return matchesSearch && matchesKyc;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const stats = {
    totalUsers: users.length,
    newSignups: users.filter(user => isNewUser(user.createdAt)).length,
    pendingKyc: users.filter(user => user.kycStatus === 'PENDING').length,
    totalBalance: users.reduce((sum, user) => 
      sum + user.accounts.reduce((accSum, acc) => accSum + acc.balance, 0), 0
    ),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-md ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Users
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {stats.totalUsers}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserPlus className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      New Signups (24h)
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {stats.newSignups}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Pending KYC
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {stats.pendingKyc}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Balance
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {formatCurrency(stats.totalBalance)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
          <div className="px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <select
                  value={filterKyc}
                  onChange={(e) => setFilterKyc(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="ALL">All KYC Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {filteredAndSortedUsers.length} of {users.length} users
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredAndSortedUsers.map((user) => (
              <li key={user.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        {isNewUser(user.createdAt) && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            New
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        Joined: {formatDate(user.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Account Balances */}
                    <div className="text-right">
                      {user.accounts.map((account) => (
                        <div key={account.id} className="text-sm">
                          <span className="text-gray-500 dark:text-gray-400">
                            {account.type}:
                          </span>
                          <span className="ml-1 font-medium text-gray-900 dark:text-white">
                            {formatCurrency(account.balance)}
                          </span>
                          <button
                            onClick={() => {
                              setBalanceModal({
                                isOpen: true,
                                user,
                                accountType: account.type as 'CHECKING' | 'SAVINGS',
                              });
                              setNewBalance(account.balance.toString());
                            }}
                            className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <Edit3 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* KYC Status */}
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.kycStatus)}`}>
                        {user.kycStatus}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      {user.kycStatus === 'PENDING' && (
                        <>
                          <button
                            onClick={() => updateUserStatus(user.id, { kycStatus: 'APPROVED' })}
                            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                            title="Approve KYC"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => updateUserStatus(user.id, { kycStatus: 'REJECTED' })}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            title="Reject KYC"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* User Details */}
                {user.phone || user.address || user.occupation ? (
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {user.phone && <span>📞 {user.phone}</span>}
                    {user.address && <span className="ml-4">📍 {user.address}</span>}
                    {user.occupation && <span className="ml-4">💼 {user.occupation}</span>}
                  </div>
                ) : null}

                {/* Recent Transactions */}
                {user.transactions.length > 0 && (
                  <div className="mt-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Recent Transactions:</div>
                    <div className="flex space-x-4">
                      {user.transactions.slice(0, 3).map((transaction) => (
                        <div key={transaction.id} className="text-xs">
                          <span className={`${transaction.type === 'DEPOSIT' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'DEPOSIT' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                          </span>
                          <span className="text-gray-400 ml-1">
                            {new Date(transaction.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {filteredAndSortedUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No users found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Balance Update Modal */}
      {balanceModal.isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Update {balanceModal.accountType} Balance
              </h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  User: {balanceModal.user?.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current Balance: {formatCurrency(
                    balanceModal.user?.accounts.find(acc => acc.type === balanceModal.accountType)?.balance || 0
                  )}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Balance
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newBalance}
                  onChange={(e) => setNewBalance(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="0.00"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reason for Change
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter reason for balance adjustment..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setBalanceModal({ isOpen: false, user: null, accountType: 'CHECKING' });
                    setNewBalance('');
                    setReason('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setBalanceModal({ isOpen: false, user: null, accountType: 'CHECKING' });
                    setNewBalance('');
                    setReason('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Update Balance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            href="/admin/accounts" 
            className="p-4 border rounded-lg bg-white shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">Manage User Accounts</h2>
            <p className="text-gray-600">View and modify user account balances</p>
          </Link>

          <Link 
            href="/admin/withdrawals" 
            className="p-4 border rounded-lg bg-white shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">Manage Withdrawals</h2>
            <p className="text-gray-600">Process withdrawal requests to external banks</p>
          </Link>
        </div>
      </div>
    </div>
  );
} 