'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  PiggyBank, 
  TrendingUp, 
  Send, 
  Download, 
  Upload,
  Eye,
  EyeOff,
  Bell,
  Settings,
  LogOut,
  Building2,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Minus,
  RefreshCw,
  History,
  Shield,
  Star,
  Calendar,
  User,
  Phone,
  Mail,
  Zap,
  FileCheck,
  Camera,
  Upload as UploadIcon,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';

interface BankAccount {
  checking: number;
  savings: number;
  creditAvailable: number;
  creditLimit: number;
  totalBalance: number;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  category?: string;
}

export default function DashboardPage() {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [kycVerified, setKycVerified] = useState(false);
  const [showKycForm, setShowKycForm] = useState(false);
  const [account, setAccount] = useState<BankAccount>({
    checking: 0.00,
    savings: 0.00,
    creditAvailable: 5000.00,
    creditLimit: 5000.00,
    totalBalance: 0.00
  });

  // User state
  const [user, setUser] = useState({
    name: 'New User',
    email: 'user@bankbroker.com',
    accountNumber: '****0000',
    joinDate: '2024-01-20',
    tier: 'Starter'
  });

  // Empty transactions for new user
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/user/dashboard');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setAccount({
          checking: data.accounts.checking,
          savings: data.accounts.savings,
          creditAvailable: 5000, // Default credit limit
          creditLimit: 5000,
          totalBalance: data.accounts.totalBalance,
        });
        setTransactions(data.transactions.map((tx: any) => ({
          id: tx.id,
          type: tx.type.toLowerCase(),
          amount: tx.amount,
          description: tx.description,
          date: new Date(tx.createdAt).toLocaleDateString(),
          status: tx.status.toLowerCase(),
          category: tx.type,
        })));
        setKycVerified(data.user.kycStatus === 'APPROVED');
      } else if (response.status === 401) {
        // Not authenticated, redirect to signin
        window.location.href = '/signin';
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    if (!showBalance) return '••••••';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const quickActions = [
    { icon: Plus, label: 'Deposit', color: 'from-green-500 to-emerald-600', action: 'deposit' },
    { icon: Minus, label: 'Withdraw', color: 'from-red-500 to-red-600', action: 'withdraw' },
    { icon: Send, label: 'Transfer', color: 'from-blue-500 to-indigo-600', action: 'transfer' },
    { icon: CreditCard, label: 'Pay Bills', color: 'from-purple-500 to-purple-600', action: 'bills' }
  ];

  const handleQuickAction = (action: string) => {
    setActiveTab(action);
  };

  const handleTransaction = async (type: string, amount: number, description: string) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type.toUpperCase(),
          amount,
          description,
          accountType: 'CHECKING',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Refresh dashboard data to get updated balances and transactions
        fetchDashboardData();
        setActiveTab('overview'); // Return to overview
        alert('Transaction completed successfully!');
      } else {
        alert(result.error || 'Transaction failed');
      }
    } catch (error) {
      console.error('Transaction error:', error);
      alert('An error occurred during the transaction');
    }
  };

  return (
    <div className="min-h-screen dark-gradient-bg">
      {/* Modern Header */}
      <header className="glass-card dark-border border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-banking-600 to-banking-700 rounded-lg shadow-lg group-hover:scale-110 transition-all duration-300">
                <Zap className="h-5 w-5 text-white absolute top-1.5 left-1.5" />
              </div>
              <span className="text-base font-bold gradient-text">BankBroker</span>
            </Link>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <button className="p-2 dark-text-secondary hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all">
                <Bell className="h-4 w-4" />
              </button>
              <button className="p-2 dark-text-secondary hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all">
                <Settings className="h-4 w-4" />
              </button>
              <div className="flex items-center space-x-2">
                <Link
                  href="/profile"
                  className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                >
                  Edit Profile
                </Link>
                <div className="text-right">
                  <div className="text-xs font-medium dark-text">{user.name}</div>
                  <div className="text-xs dark-text-muted">{user.accountNumber}</div>
                </div>
                <Link href="/" className="p-2 dark-text-secondary hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all">
                  <LogOut className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold dark-text">Welcome to BankBroker!</h1>
              <p className="text-xs dark-text-secondary">
                {kycVerified 
                  ? 'Your account is fully verified - enjoy all features!' 
                  : 'Complete your verification to unlock all banking features'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {showBalance ? (
                  <Eye className="h-4 w-4 dark-text-secondary" />
                ) : (
                  <EyeOff className="h-4 w-4 dark-text-secondary" />
                )}
              </button>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                kycVerified ? 'status-verified' : 'status-pending'
              }`}>
                {kycVerified ? 'Verified' : 'Verification Pending'}
              </div>
            </div>
          </div>
        </div>

        {/* KYC Verification Section */}
        {!kycVerified && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6 mb-6 bg-gradient-to-r from-amber-50/50 to-orange-50/50 border border-amber-200/50"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-3">
                    <FileCheck className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold dark-text flex items-center">
                      Complete Your Identity Verification
                      <AlertCircle className="h-4 w-4 text-amber-500 ml-2" />
                    </h3>
                    <p className="text-xs dark-text-secondary">Required for regulatory compliance</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-xs dark-text">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                    <span>Verify your identity with government-issued ID</span>
                  </div>
                  <div className="flex items-center text-xs dark-text">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                    <span>Confirm your address and financial information</span>
                  </div>
                  <div className="flex items-center text-xs dark-text">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                    <span>Unlock higher transaction limits and premium features</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowKycForm(true)}
                    className="modern-button text-xs px-4 py-2"
                  >
                    <FileCheck className="h-3 w-3 mr-2" />
                    Start Verification
                  </button>
                  <button className="outline-button text-xs px-4 py-2">
                    <Calendar className="h-3 w-3 mr-2" />
                    Remind Me Later
                  </button>
                </div>
              </div>

              <div className="ml-4">
                <div className="text-right">
                  <div className="text-xs dark-text-muted mb-1">Current Limits</div>
                  <div className="text-xs font-medium dark-text">Daily: $500</div>
                  <div className="text-xs font-medium dark-text">Monthly: $2,000</div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-2">
                    After verification: Unlimited
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* KYC Form Modal */}
        {showKycForm && (
          <KYCVerificationForm 
            onClose={() => setShowKycForm(false)}
            onComplete={(verified) => {
              setKycVerified(verified);
              setShowKycForm(false);
            }}
          />
        )}

        {/* Account Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Checking Account */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-4 rounded-2xl bg-gradient-to-r from-banking-600/5 to-banking-700/5 hover:scale-105 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs text-gray-600">Checking Account</p>
                <p className="text-xs text-gray-400">{user.accountNumber}</p>
              </div>
              <div className="w-6 h-6 bg-gradient-to-r from-banking-600 to-banking-700 rounded-lg flex items-center justify-center">
                <DollarSign className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="text-lg font-bold dark-text mb-1">
              {isLoading ? (
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                formatCurrency(account.checking)
              )}
            </div>
            <div className="text-xs dark-text-muted">Available Balance</div>
          </motion.div>

          {/* Savings Account */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-4 rounded-2xl bg-gradient-to-r from-green-500/5 to-emerald-600/5 hover:scale-105 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs text-gray-600">Savings Account</p>
                <p className="text-xs text-gray-400">High Yield • 2.5% APY</p>
              </div>
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <PiggyBank className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="text-lg font-bold dark-text mb-1">
              {isLoading ? (
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                formatCurrency(account.savings)
              )}
            </div>
            <div className="text-xs text-green-600 dark:text-green-400">Interest Earning</div>
          </motion.div>

          {/* Credit Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-4 rounded-2xl bg-gradient-to-r from-purple-500/5 to-purple-600/5 hover:scale-105 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs text-gray-600">Credit Card</p>
                <p className="text-xs text-gray-400">Platinum Rewards</p>
              </div>
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <CreditCard className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="text-lg font-bold dark-text mb-1">
              {formatCurrency(account.creditAvailable)}
            </div>
            <div className="text-xs dark-text-muted">
              Available of {formatCurrency(account.creditLimit)}
            </div>
            <div className="mt-2 bg-gray-100 rounded-full h-1">
              <div className="bg-purple-600 h-1 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </motion.div>

          {/* Total Portfolio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-4 rounded-2xl bg-gradient-to-r from-blue-500/5 to-indigo-600/5 hover:scale-105 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs text-gray-600">Total Portfolio</p>
                <p className="text-xs text-gray-400">All Accounts</p>
              </div>
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="text-lg font-bold dark-text mb-1">
              {formatCurrency(account.totalBalance)}
            </div>
            <div className="text-xs dark-text-muted">Net Worth</div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold dark-text mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleQuickAction(action.action)}
                className="glass-card p-4 rounded-2xl hover:scale-105 transition-all duration-300 text-center group"
              >
                <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-xs font-medium dark-text">{action.label}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* New User Welcome Message */}
        {account.totalBalance === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 rounded-2xl text-center mb-6 bg-gradient-to-r from-banking-50/50 to-blue-50/50 border border-banking-200/30"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-banking-500 to-banking-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-base font-semibold dark-text mb-2">Your Account is Ready!</h3>
            <p className="text-xs dark-text-secondary mb-4 max-w-md mx-auto">
              Welcome to BankBroker! Make your first deposit to start earning interest, unlock premium features, and begin building your financial future.
            </p>
            <div className="flex justify-center space-x-3">
              <button 
                onClick={() => handleQuickAction('deposit')}
                className="modern-button text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                Make First Deposit
              </button>
              <button className="outline-button text-xs">
                Learn About Features
              </button>
            </div>
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Forms & Transactions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transaction Forms */}
            {activeTab !== 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 rounded-2xl"
              >
                {activeTab === 'deposit' && <DepositForm onSubmit={handleTransaction} />}
                {activeTab === 'withdraw' && <WithdrawForm onSubmit={handleTransaction} availableBalance={account.checking} />}
                {activeTab === 'transfer' && <TransferForm onSubmit={handleTransaction} availableBalance={account.checking} />}
                {activeTab === 'bills' && <BillPayForm onSubmit={handleTransaction} availableBalance={account.checking} />}
                
                <button
                  onClick={() => setActiveTab('overview')}
                  className="mt-4 text-banking-600 hover:text-banking-700 text-xs font-medium"
                >
                  ← Back to Overview
                </button>
              </motion.div>
            )}

            {/* Recent Transactions */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold dark-text flex items-center">
                  <History className="h-4 w-4 mr-2" />
                  Recent Activity
                </h3>
                <button className="text-banking-600 hover:text-banking-700 text-xs">
                  View All
                </button>
              </div>
              
              {transactions.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No transactions yet</p>
                  <p className="text-xs">Your transaction history will appear here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.amount > 0 ? 
                            <ArrowDownLeft className="h-4 w-4 text-green-600" /> : 
                            <ArrowUpRight className="h-4 w-4 text-red-600" />
                          }
                        </div>
                        <div>
                          <div className="text-xs font-medium dark-text">{transaction.description}</div>
                          <div className="text-xs text-gray-500">{transaction.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                        </div>
                        <div className="text-xs text-green-600">
                          {transaction.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Summary & Info */}
          <div className="space-y-6">
            {/* Account Summary */}
            <div className="glass-card p-5 rounded-2xl">
              <h3 className="text-sm font-semibold dark-text mb-4">Account Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Total Balance</span>
                  <span className="font-semibold">{formatCurrency(account.totalBalance)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Available Credit</span>
                  <span className="font-semibold">{formatCurrency(account.creditAvailable)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Monthly Spending</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Interest Earned</span>
                  <span className="font-semibold text-green-600">$0.00</span>
                </div>
              </div>
            </div>

            {/* Security & Support */}
            <div className="glass-card p-5 rounded-2xl bg-gradient-to-r from-green-50/50 to-emerald-50/50 border border-green-200/30">
              <div className="flex items-center mb-3">
                <Shield className="h-4 w-4 text-green-600 mr-2" />
                <h4 className="text-xs font-semibold text-green-800">Account Security</h4>
              </div>
              <p className="text-xs text-green-700 mb-3">
                Your account is secure and protected with 256-bit encryption
              </p>
              <button className="text-xs text-green-600 hover:text-green-700 font-medium">
                Manage Security Settings →
              </button>
            </div>

            {/* Customer Support */}
            <div className="glass-card p-5 rounded-2xl">
              <h4 className="text-xs font-semibold dark-text mb-3">Need Help?</h4>
              <div className="space-y-2">
                <button className="w-full text-left p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center text-xs dark-text">
                  <Phone className="h-3 w-3 mr-2 dark-text-muted" />
                  Call Support: 1-800-BANK-NOW
                </button>
                <button className="w-full text-left p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center text-xs dark-text">
                  <Mail className="h-3 w-3 mr-2 dark-text-muted" />
                  Email: support@bankbroker.com
                </button>
                <button className="w-full text-left p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center text-xs dark-text">
                  <User className="h-3 w-3 mr-2 dark-text-muted" />
                  Live Chat Available 24/7
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Form Components
function DepositForm({ onSubmit }: { onSubmit: (type: string, amount: number, description: string) => void }) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('mobile');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);
    if (amountNum > 0) {
      onSubmit('deposit', amountNum, `${method === 'mobile' ? 'Mobile Check' : method === 'transfer' ? 'Bank Transfer' : 'Wire Transfer'} Deposit`);
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
              <h3 className="text-base font-semibold dark-text mb-4">Make a Deposit</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Deposit Method</label>
          <select 
            value={method} 
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-banking-500 text-xs"
          >
            <option value="mobile">📱 Mobile Check Deposit</option>
            <option value="transfer">🏦 Bank Transfer</option>
            <option value="wire">⚡ Wire Transfer</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Amount</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-banking-500 text-xs"
              placeholder="0.00"
              step="0.01"
              min="0.01"
              required
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl text-xs font-semibold hover:from-green-700 hover:to-emerald-700 transition-all">
          Deposit {amount ? `$${parseFloat(amount).toFixed(2)}` : '$0.00'}
        </button>
      </div>
    </form>
  );
}

function WithdrawForm({ onSubmit, availableBalance }: { onSubmit: (type: string, amount: number, description: string) => void, availableBalance: number }) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('atm');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);
    if (amountNum > 0 && amountNum <= availableBalance) {
      onSubmit('withdrawal', amountNum, `${method === 'atm' ? 'ATM' : method === 'transfer' ? 'Bank Transfer' : 'Check'} Withdrawal`);
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
              <h3 className="text-base font-semibold dark-text mb-4">Withdraw Funds</h3>
      <div className="space-y-4">
        <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl">
          Available Balance: <span className="font-semibold">${availableBalance.toFixed(2)}</span>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Withdrawal Method</label>
          <select 
            value={method} 
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-banking-500 text-xs"
          >
            <option value="atm">🏧 ATM Withdrawal</option>
            <option value="transfer">🏦 Bank Transfer</option>
            <option value="check">📝 Request Check</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Amount</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-banking-500 text-xs"
              placeholder="0.00"
              step="0.01"
              min="0.01"
              max={availableBalance}
              required
            />
          </div>
        </div>
        <button 
          type="submit" 
          disabled={parseFloat(amount) > availableBalance}
          className="w-full bg-gradient-to-r from-red-600 to-red-600 text-white py-3 rounded-xl text-xs font-semibold hover:from-red-700 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Withdraw {amount ? `$${parseFloat(amount).toFixed(2)}` : '$0.00'}
        </button>
      </div>
    </form>
  );
}

function TransferForm({ onSubmit, availableBalance }: { onSubmit: (type: string, amount: number, description: string) => void, availableBalance: number }) {
  const [amount, setAmount] = useState('');
  const [toAccount, setToAccount] = useState('savings');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);
    if (amountNum > 0 && amountNum <= availableBalance) {
      onSubmit('transfer', amountNum, `Transfer to ${toAccount === 'savings' ? 'Savings' : toAccount === 'external' ? 'External Account' : 'Another Person'}`);
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
              <h3 className="text-base font-semibold dark-text mb-4">Transfer Funds</h3>
      <div className="space-y-4">
        <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl">
          Available Balance: <span className="font-semibold">${availableBalance.toFixed(2)}</span>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Transfer To</label>
          <select 
            value={toAccount} 
            onChange={(e) => setToAccount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-banking-500 text-xs"
          >
            <option value="savings">💰 My Savings Account</option>
            <option value="external">🏦 External Account</option>
            <option value="person">👤 Another Person</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Amount</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-banking-500 text-xs"
              placeholder="0.00"
              step="0.01"
              min="0.01"
              max={availableBalance}
              required
            />
          </div>
        </div>
        <button 
          type="submit"
          disabled={parseFloat(amount) > availableBalance}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl text-xs font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Transfer {amount ? `$${parseFloat(amount).toFixed(2)}` : '$0.00'}
        </button>
      </div>
    </form>
  );
}

function BillPayForm({ onSubmit, availableBalance }: { onSubmit: (type: string, amount: number, description: string) => void, availableBalance: number }) {
  const [amount, setAmount] = useState('');
  const [payee, setPayee] = useState('utility');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);
    if (amountNum > 0 && amountNum <= availableBalance) {
      const payeeNames = {
        utility: 'Electric Company',
        credit: 'Credit Card Payment',
        mortgage: 'Mortgage Payment',
        phone: 'Phone Bill',
        internet: 'Internet Bill'
      };
      onSubmit('payment', amountNum, `${payeeNames[payee as keyof typeof payeeNames]} Payment`);
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
              <h3 className="text-base font-semibold dark-text mb-4">Pay Bills</h3>
      <div className="space-y-4">
        <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl">
          Available Balance: <span className="font-semibold">${availableBalance.toFixed(2)}</span>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Select Payee</label>
          <select 
            value={payee} 
            onChange={(e) => setPayee(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-banking-500 text-xs"
          >
            <option value="utility">⚡ Electric Company</option>
            <option value="credit">💳 Credit Card Payment</option>
            <option value="mortgage">🏠 Mortgage Payment</option>
            <option value="phone">📱 Phone Bill</option>
            <option value="internet">🌐 Internet Bill</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Amount</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-banking-500 text-xs"
              placeholder="0.00"
              step="0.01"
              min="0.01"
              max={availableBalance}
              required
            />
          </div>
        </div>
        <button 
          type="submit"
          disabled={parseFloat(amount) > availableBalance}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-600 text-white py-3 rounded-xl text-xs font-semibold hover:from-purple-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Pay {amount ? `$${parseFloat(amount).toFixed(2)}` : '$0.00'}
        </button>
      </div>
    </form>
  );
}

// KYC Verification Form Component
function KYCVerificationForm({ onClose, onComplete }: { 
  onClose: () => void; 
  onComplete: (verified: boolean) => void; 
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    ssn: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    idType: 'drivers_license',
    idNumber: '',
    income: '',
    employment: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate KYC verification process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsLoading(false);
    onComplete(true);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                <FileCheck className="h-4 w-4 text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold dark-text">Identity Verification</h2>
                <p className="text-xs dark-text-secondary">Step {step} of 3</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    step >= i ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step > i ? <CheckCircle className="h-3 w-3" /> : i}
                  </div>
                  {i < 3 && <div className={`w-8 h-0.5 ${step > i ? 'bg-amber-500' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <div className="text-center mb-4">
                  <h3 className="text-sm font-semibold dark-text mb-1">Personal Information</h3>
                  <p className="text-xs text-gray-600">Please provide your personal details</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Social Security Number</label>
                  <input
                    type="password"
                    name="ssn"
                    value={formData.ssn}
                    onChange={handleInputChange}
                    placeholder="XXX-XX-XXXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">State</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-xs"
                      required
                    >
                      <option value="">Select</option>
                      <option value="CA">CA</option>
                      <option value="NY">NY</option>
                      <option value="TX">TX</option>
                      <option value="FL">FL</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="12345"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-xs"
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full modern-button text-xs py-3 mt-6"
                >
                  Continue
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="text-center mb-4">
                  <h3 className="text-sm font-semibold dark-text mb-1">Identity Document</h3>
                  <p className="text-xs text-gray-600">Upload your government-issued ID</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">ID Type</label>
                  <select
                    name="idType"
                    value={formData.idType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-xs"
                  >
                    <option value="drivers_license">Driver's License</option>
                    <option value="passport">Passport</option>
                    <option value="state_id">State ID</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">ID Number</label>
                  <input
                    type="text"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-xs"
                    required
                  />
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 mb-2">Take a photo or upload your ID</p>
                  <button
                    type="button"
                    className="outline-button text-xs px-4 py-2"
                  >
                    <UploadIcon className="h-3 w-3 mr-2" />
                    Upload Document
                  </button>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 outline-button text-xs py-3"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 modern-button text-xs py-3"
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="text-center mb-4">
                  <h3 className="text-sm font-semibold dark-text mb-1">Financial Information</h3>
                  <p className="text-xs text-gray-600">Help us understand your financial situation</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Annual Income</label>
                  <select
                    name="income"
                    value={formData.income}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-xs"
                    required
                  >
                    <option value="">Select Range</option>
                    <option value="under_25k">Under $25,000</option>
                    <option value="25k_50k">$25,000 - $50,000</option>
                    <option value="50k_100k">$50,000 - $100,000</option>
                    <option value="100k_200k">$100,000 - $200,000</option>
                    <option value="over_200k">Over $200,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Employment Status</label>
                  <select
                    name="employment"
                    value={formData.employment}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-xs"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="employed">Employed Full-time</option>
                    <option value="self_employed">Self-employed</option>
                    <option value="part_time">Part-time</option>
                    <option value="student">Student</option>
                    <option value="retired">Retired</option>
                    <option value="unemployed">Unemployed</option>
                  </select>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                  <div className="flex items-center text-xs text-amber-800">
                    <Shield className="h-4 w-4 mr-2" />
                    <span>Your information is encrypted and secure</span>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 outline-button text-xs py-3"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 modern-button text-xs py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-3 w-3 mr-2" />
                        Complete Verification
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
} 