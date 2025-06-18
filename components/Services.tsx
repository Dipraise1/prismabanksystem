'use client';

import { CreditCard, PiggyBank, TrendingUp, Home, Shield, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const services = [
  {
    icon: PiggyBank,
    title: 'Smart Banking',
    description: 'AI-powered personal banking with instant insights and automated savings.',
    features: ['Zero fees', 'Real-time alerts', 'Smart budgeting', 'Instant transfers'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    gradient: 'from-blue-500 to-banking-600'
  },
  {
    icon: TrendingUp,
    title: 'Wealth Management',
    description: 'Intelligent investment strategies powered by advanced analytics.',
    features: ['Robo-advisor', 'ESG investing', 'Tax optimization', '24/7 monitoring'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    icon: Home,
    title: 'Digital Mortgages',
    description: 'Streamlined home financing with instant pre-approval.',
    features: ['5-min pre-approval', 'Digital closing', 'Rate alerts', 'Mobile app'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80',
    gradient: 'from-purple-500 to-indigo-600'
  },
  {
    icon: CreditCard,
    title: 'Credit Solutions',
    description: 'Next-gen credit products with dynamic rewards and spending insights.',
    features: ['Dynamic rewards', 'Credit score boost', 'Spending insights', 'Virtual cards'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    icon: Shield,
    title: 'Protection Suite',
    description: 'Comprehensive insurance with AI-powered risk assessment.',
    features: ['Instant quotes', 'Claims automation', 'Risk monitoring', 'Bundled savings'],
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    gradient: 'from-teal-500 to-cyan-600'
  },
  {
    icon: Calculator,
    title: 'Business Banking',
    description: 'Modern business solutions with automated accounting integration.',
    features: ['API integration', 'Automated invoicing', 'Cash flow insights', 'Team cards'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    gradient: 'from-pink-500 to-rose-600'
  },
];

export default function Services() {
  return (
    <section className="py-12 bg-gradient-to-br from-gray-50/50 via-white to-banking-50/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-banking-100 to-blue-100 text-banking-700 text-xs font-medium mb-4"
          >
            🚀 Next-Generation Banking
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl font-bold gradient-text mb-3"
          >
            Financial Services Redefined
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs dark-text-secondary max-w-2xl mx-auto"
          >
            Cutting-edge financial technology meets personalized service for the modern economy.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300"
              >
                {/* Modern Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Image Header */}
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className={`absolute top-3 left-3 inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r ${service.gradient} rounded-lg shadow-lg`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-sm font-semibold dark-text mb-2">{service.title}</h3>
                                      <p className="text-xs dark-text-secondary mb-3 leading-relaxed">{service.description}</p>
                  
                  <div className="grid grid-cols-2 gap-1 mb-4">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-xs text-gray-700">
                        <div className={`w-1 h-1 bg-gradient-to-r ${service.gradient} rounded-full mr-1.5`} />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className={`text-xs font-medium bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}>
                    Learn More →
                  </button>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 