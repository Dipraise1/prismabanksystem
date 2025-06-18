'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Target, PieChart as PieChartIcon, Eye, EyeOff, Plus, ArrowUpRight } from 'lucide-react';

interface DashboardData {
  totalBalance: number;
  checkingBalance: number;
  savingsBalance: number;
  creditAvailable: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlySavings: number;
}

const initialData: DashboardData = {
  totalBalance: 0,
  checkingBalance: 0,
  savingsBalance: 0,
  creditAvailable: 5000, // Credit limit available
  monthlyIncome: 0,
  monthlyExpenses: 0,
  monthlySavings: 0,
};

const portfolioData = [
  { month: 'Jan', value: 0 },
  { month: 'Feb', value: 0 },
  { month: 'Mar', value: 0 },
  { month: 'Apr', value: 0 },
  { month: 'May', value: 0 },
  { month: 'Jun', value: 0 },
];

const expenseData = [
  { category: 'No expenses yet', amount: 0, percentage: 100 },
];

const COLORS = ['#e5e7eb', '#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd', '#22c55e'];

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>(initialData);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (amount: number, showZero = true) => {
    if (!balanceVisible) return '••••';
    if (amount === 0 && !showZero) return '$0.00';
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const StatCard = ({ icon: Icon, title, amount, change, color, isCredit = false }: any) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-card p-4 rounded-2xl hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r ${color} rounded-lg shadow-sm`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        {amount > 0 && (
          <span className="text-xs text-green-600 font-medium flex items-center">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            {change}
          </span>
        )}
      </div>
                <h3 className="text-lg font-bold dark-text mb-1">
        {isLoading ? (
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          formatCurrency(amount)
        )}
      </h3>
                  <p className="text-xs dark-text-secondary">{title}</p>
      {isCredit && amount > 0 && (
        <div className="mt-2 bg-gray-100 rounded-full h-1">
          <div className="bg-banking-600 h-1 rounded-full" style={{ width: '30%' }}></div>
        </div>
      )}
    </motion.div>
  );

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50/30 via-white to-banking-50/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-banking-100 to-green-100 text-banking-700 text-xs font-medium mb-4"
          >
            📊 Financial Overview
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center space-x-3 mb-3"
          >
            <h2 className="text-lg md:text-xl font-bold gradient-text">
              Your Financial Dashboard
            </h2>
            <button
              onClick={() => setBalanceVisible(!balanceVisible)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {balanceVisible ? (
                <Eye className="h-4 w-4 dark-text-secondary" />
              ) : (
                <EyeOff className="h-4 w-4 dark-text-secondary" />
              )}
            </button>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs dark-text-secondary"
          >
            Start your financial journey - make your first deposit to see your wealth grow
          </motion.p>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center space-x-2 mb-8"
        >
          <button className="modern-button text-xs">
            <Plus className="h-3 w-3 mr-1" />
            Add Money
          </button>
          <button className="outline-button text-xs">
            Transfer
          </button>
          <button className="outline-button text-xs">
            Pay Bills
          </button>
        </motion.div>

        {/* Account Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard
            icon={DollarSign}
            title="Total Balance"
            amount={dashboardData.totalBalance}
            change="+0%"
            color="from-banking-500 to-banking-600"
          />
          <StatCard
            icon={TrendingUp}
            title="Checking Account"
            amount={dashboardData.checkingBalance}
            change="+0%"
            color="from-green-500 to-emerald-600"
          />
          <StatCard
            icon={Target}
            title="Savings Account"
            amount={dashboardData.savingsBalance}
            change="+0%"
            color="from-blue-500 to-indigo-600"
          />
          <StatCard
            icon={PieChartIcon}
            title="Credit Available"
            amount={dashboardData.creditAvailable}
            change="Available"
            color="from-purple-500 to-pink-600"
            isCredit={true}
          />
        </motion.div>

        {/* Welcome Message for New Users */}
        {dashboardData.totalBalance === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-6 rounded-2xl text-center mb-8 bg-gradient-to-r from-banking-50 to-blue-50"
          >
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-banking-500 to-banking-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-base font-semibold dark-text mb-2">Welcome to BankBroker!</h3>
                              <p className="text-xs dark-text-secondary mb-4">
                  Your account is ready. Make your first deposit to start building wealth and unlock powerful financial insights.
                </p>
            </div>
            <div className="flex justify-center space-x-3">
              <button className="modern-button text-xs">
                <Plus className="h-3 w-3 mr-1" />
                Make First Deposit
              </button>
              <button className="outline-button text-xs">
                Learn More
              </button>
            </div>
          </motion.div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Portfolio Growth Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-5 rounded-2xl"
          >
            <h3 className="text-sm font-semibold dark-text mb-4">Account Growth</h3>
            {dashboardData.totalBalance === 0 ? (
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Start depositing to see your growth chart</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={portfolioData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Balance']} />
                  <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </motion.div>

          {/* Spending Analysis */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card p-5 rounded-2xl"
          >
            <h3 className="text-sm font-semibold dark-text mb-4">Spending Overview</h3>
            {dashboardData.monthlyExpenses === 0 ? (
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <PieChartIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Start spending to see your breakdown</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center mb-4">
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={expenseData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="amount"
                      >
                        {expenseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {expenseData.map((item, index) => (
                    <div key={item.category} className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-gray-700">{item.category}</span>
                      </div>
                      <span className="font-medium dark-text">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Getting Started Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 glass-card p-5 rounded-2xl"
        >
          <h3 className="text-sm font-semibold dark-text mb-3">Quick Start Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <p className="text-xs text-gray-700">Make your first deposit</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <p className="text-xs text-gray-700">Set up automatic savings</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <p className="text-xs text-gray-700">Explore investment options</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 