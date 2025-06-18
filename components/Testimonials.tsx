'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Robert Thompson",
    role: "Small Business Owner",
    company: "Thompson Construction",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    content: "BankBroker has been instrumental in helping me grow my construction business. Their business banking solutions and personalized service have made managing my finances effortless.",
    rating: 5
  },
  {
    name: "Maria Garcia",
    role: "Marketing Director",
    company: "Tech Solutions Inc",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    content: "The investment advisory team at BankBroker helped me create a diversified portfolio that's grown 15% this year. Their expertise and dedication are unmatched.",
    rating: 5
  },
  {
    name: "David Chen",
    role: "Retired Teacher",
    company: "Personal Customer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    content: "After retiring, I needed a bank that understood my changing financial needs. BankBroker's retirement planning services have given me peace of mind for my golden years.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
                      className="text-3xl md:text-4xl font-bold dark-text mb-4"
        >
          What Our Customers Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-xl dark-text-secondary max-w-3xl mx-auto"
        >
          Don't just take our word for it. Here's what our satisfied customers 
          have to say about their experience with BankBroker.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-xl p-8 card-shadow hover-lift"
          >
            {/* Star Rating */}
            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Testimonial Content */}
            <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed">
              "{testimonial.content}"
            </blockquote>

            {/* Customer Info */}
            <div className="flex items-center">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-semibold dark-text">{testimonial.name}</div>
                <div className="text-sm dark-text-secondary">{testimonial.role}</div>
                <div className="text-sm text-banking-600">{testimonial.company}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center bg-banking-50 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold dark-text mb-4">
          Ready to Join Thousands of Satisfied Customers?
        </h3>
        <p className="dark-text-secondary mb-6 max-w-2xl mx-auto">
          Experience the BankBroker difference today. Our team is ready to help you 
          achieve your financial goals with personalized service and expert guidance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-banking-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-banking-700 transition-colors duration-200">
            Open Account Today
          </button>
          <button className="border-2 border-banking-600 text-banking-600 px-8 py-3 rounded-lg font-semibold hover:bg-banking-600 hover:text-white transition-colors duration-200">
            Schedule Consultation
          </button>
        </div>
      </motion.div>
    </section>
  );
} 