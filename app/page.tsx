'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Features from '@/components/Features';
import Dashboard from '@/components/Dashboard';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <main className="min-h-screen dark-gradient-bg">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div id="home">
        <Hero />
      </div>
      
      <div id="services" className="py-20">
        <Services />
      </div>
      
      <div id="features" className="py-20 dark-bg">
        <Features />
      </div>
      
      <div id="dashboard" className="py-20">
        <Dashboard />
      </div>
      
      <div id="testimonials" className="py-20 dark-bg-secondary">
        <Testimonials />
      </div>
      
      <div id="contact" className="py-20 dark-bg">
        <Contact />
      </div>
      
      <Footer />
    </main>
  );
} 