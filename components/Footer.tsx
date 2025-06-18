'use client';

import { Building2, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8 text-banking-400" />
              <span className="text-xl font-bold">BankBroker</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted financial partner, providing comprehensive banking and investment 
              solutions across the United States.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-banking-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-banking-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-banking-400 transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-banking-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Personal Banking</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Investment Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Mortgage Solutions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Business Banking</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Insurance</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Press</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Investor Relations</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Security</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Accessibility</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 BankBroker. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">FDIC Insured</span>
              <span className="text-gray-400 text-sm">Equal Housing Lender</span>
              <span className="text-gray-400 text-sm">Member SIPC</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 