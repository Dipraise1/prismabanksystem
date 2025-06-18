'use client';

import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Features', href: '#features', id: 'features' },
    { name: 'Dashboard', href: '#dashboard', id: 'dashboard' },
    { name: 'Reviews', href: '#testimonials', id: 'testimonials' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card dark-border border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Modern Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-6 h-6 bg-gradient-to-r from-banking-600 to-banking-700 rounded-lg shadow-lg group-hover:scale-110 transition-all duration-300">
                <Zap className="h-4 w-4 text-white absolute top-1 left-1" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-banking-600 to-banking-700 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <span className="text-sm font-bold gradient-text tracking-tight">BankBroker</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-banking-100/50 dark:bg-banking-900/30 text-banking-700 dark:text-banking-300 shadow-sm'
                    : 'dark-text-secondary hover:text-banking-600 dark:hover:text-banking-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Modern Auth Buttons & Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-2">
            <ThemeToggle />
            <Link href="/signin" className="text-banking-600 dark:text-banking-400 hover:text-banking-700 dark:hover:text-banking-300 px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-banking-50/50 dark:hover:bg-banking-900/20 transition-all duration-200">
              Sign In
            </Link>
            <Link href="/signup" className="modern-button">
              Start Banking
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg dark-text-secondary hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Modern Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden glass-card dark-border border-t m-2 rounded-2xl shadow-xl"
        >
          <div className="p-3 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-2 text-xs font-medium rounded-xl transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-banking-100/50 dark:bg-banking-900/30 text-banking-700 dark:text-banking-300'
                    : 'dark-text hover:text-banking-600 dark:hover:text-banking-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="p-3 dark-border border-t">
            <div className="flex space-x-2">
              <Link href="/signin" className="flex-1 text-banking-600 dark:text-banking-400 hover:text-banking-700 dark:hover:text-banking-300 px-3 py-2 text-xs font-medium text-center border border-banking-200 dark:border-banking-700 rounded-xl hover:bg-banking-50/50 dark:hover:bg-banking-900/20 transition-all duration-200">
                Sign In
              </Link>
              <Link href="/signup" className="flex-1 modern-button text-center">
                Start Banking
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
} 