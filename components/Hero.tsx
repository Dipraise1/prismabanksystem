'use client';

import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern Background with Multiple Layers */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Modern financial district"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-banking-900/40 via-banking-800/30 to-blue-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-white/10" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-banking-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-banking-300/25 rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Modern Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full glass-card mb-8"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-xs font-medium dark-text-secondary">FDIC Insured • 256-bit SSL Encrypted</span>
        </motion.div>

        {/* Modern Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-title font-bold text-white mb-6 leading-tight"
        >
          Banking Reimagined for the
          <span className="block gradient-text bg-gradient-to-r from-blue-400 to-banking-300 bg-clip-text text-transparent">
            Digital Generation
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Experience next-generation banking with AI-powered insights, instant transfers, 
          and personalized financial guidance designed for modern life.
        </motion.p>
        
        {/* Modern Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-16"
        >
          <Link href="/signup" className="modern-button group">
            <span>Start Banking</span>
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/signin" className="outline-button backdrop-blur-sm bg-white/10 border-white/30 text-white hover:bg-white/20">
            Access Account
          </Link>
        </motion.div>

        {/* Modern Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">2.5M+</div>
            <div className="text-xs text-blue-200 uppercase tracking-wide">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">$12B+</div>
            <div className="text-xs text-blue-200 uppercase tracking-wide">Assets Secured</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">99.9%</div>
            <div className="text-xs text-blue-200 uppercase tracking-wide">Uptime</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 