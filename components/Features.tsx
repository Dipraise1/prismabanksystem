'use client';

import { Smartphone, Lock, Clock, Users, Award, Globe, Zap, Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    icon: Zap,
    title: 'Instant Everything',
    description: 'Lightning-fast transfers, real-time notifications, and instant account access.',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: Shield,
    title: 'Military-Grade Security',
    description: 'Biometric authentication, encrypted transactions, and AI fraud detection.',
    color: 'from-green-400 to-emerald-500'
  },
  {
    icon: TrendingUp,
    title: 'Smart Insights',
    description: 'AI-powered analytics to optimize your spending and maximize savings.',
    color: 'from-blue-400 to-indigo-500'
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Chat with certified advisors instantly or schedule video consultations.',
    color: 'from-purple-400 to-pink-500'
  },
  {
    icon: Smartphone,
    title: 'Mobile Native',
    description: 'Banking designed for your phone with intuitive gestures and shortcuts.',
    color: 'from-teal-400 to-cyan-500'
  },
  {
    icon: Globe,
    title: 'Global Access',
    description: 'Use your account worldwide with zero international fees.',
    color: 'from-red-400 to-pink-500'
  },
];

const team = [
  {
    name: "Sarah Chen",
    role: "Lead Financial Advisor",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    credentials: "CFA • CFP • 12 years",
    specialties: ["Wealth Management", "Tax Planning"]
  },
  {
    name: "Marcus Thompson",
    role: "Investment Strategist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    credentials: "MBA • CFA • 15 years",
    specialties: ["Portfolio Management", "ESG Investing"]
  },
  {
    name: "Elena Rodriguez",
    role: "Digital Banking Expert",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
    credentials: "NMLS • Fintech MBA • 8 years",
    specialties: ["Digital Solutions", "Crypto Banking"]
  }
];

export default function Features() {
  return (
    <section className="py-12 bg-gradient-to-br from-gray-50/30 via-white to-blue-50/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-banking-100 to-blue-100 text-banking-700 text-xs font-medium mb-4"
          >
            ⚡ Advanced Banking Technology
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl font-bold gradient-text mb-3"
          >
            Banking That Adapts to You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs dark-text-secondary max-w-2xl mx-auto"
          >
            Experience the future of banking with intelligent features designed for modern life.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group glass-card p-4 rounded-2xl hover:scale-105 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r ${feature.color} rounded-xl mb-3 shadow-lg`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                
                <h3 className="text-sm font-semibold dark-text mb-2">{feature.title}</h3>
                                  <p className="text-xs dark-text-secondary leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-10"
        >
          <div className="text-center mb-6">
            <h3 className="text-base font-bold dark-text mb-2">Expert Financial Advisors</h3>
                          <p className="text-xs dark-text-secondary">
                Certified professionals with decades of combined experience
              </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-4 rounded-2xl text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="relative w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                                  <h4 className="text-sm font-semibold dark-text mb-1">{member.name}</h4>
                <p className="text-xs text-banking-600 font-medium mb-1">{member.role}</p>
                <p className="text-xs text-gray-500 mb-2">{member.credentials}</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {member.specialties.map((specialty, i) => (
                    <span key={i} className="px-2 py-0.5 bg-banking-100 text-banking-700 text-xs rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-xs font-medium text-gray-700 mb-4">Trusted & Regulated</p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {[
              { label: "FDIC", desc: "Insured" },
              { label: "SIPC", desc: "Protected" },
              { label: "SOC 2", desc: "Certified" },
              { label: "BBB A+", desc: "Rated" },
              { label: "ISO 27001", desc: "Compliant" }
            ].map((cert, index) => (
              <div key={cert.label} className="flex items-center space-x-1 text-banking-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium">{cert.label}</span>
                <span className="text-xs text-gray-500">{cert.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 