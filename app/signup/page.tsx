'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, Check, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          name: `${data.firstName} ${data.lastName}`,
          password: data.password,
          phone: data.phone,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Account created successfully! Please sign in.');
        window.location.href = '/signin';
      } else {
        alert(result.error || 'Account creation failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during account creation');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = async () => {
    const isValid = await trigger(['firstName', 'lastName', 'email', 'phone']);
    if (isValid) setStep(2);
  };

  const prevStep = () => setStep(1);

  return (
    <div className="min-h-screen dark-gradient-bg flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Modern office"
          fill
          className="object-cover opacity-10"
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-xs text-banking-600 dark:text-banking-400 hover:text-banking-700 dark:hover:text-banking-300 transition-colors">
            <ArrowLeft className="h-3 w-3 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Sign Up Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl shadow-xl p-6"
        >
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-banking-600 to-banking-700 rounded-lg shadow-lg mr-2">
              <Zap className="h-5 w-5 text-white absolute top-1.5 left-1.5" />
            </div>
            <span className="text-base font-bold gradient-text">BankBroker</span>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                step >= 1 ? 'bg-banking-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step > 1 ? <Check className="h-3 w-3" /> : '1'}
              </div>
              <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-banking-600' : 'bg-gray-200'}`} />
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                step >= 2 ? 'bg-banking-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-lg font-bold dark-text mb-2">Join BankBroker</h1>
            <p className="text-xs dark-text-secondary">
              {step === 1 ? 'Start with your basic information' : 'Secure your account with a password'}
            </p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {step === 1 && (
              <>
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-medium dark-text mb-1">
                      First Name
                    </label>
                    <input
                      {...register('firstName')}
                      type="text"
                      className="w-full px-3 py-2 dark-input rounded-xl text-xs"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      {...register('lastName')}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-banking-500 focus:border-banking-500 text-xs"
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-banking-500 focus:border-banking-500 text-xs"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-banking-500 focus:border-banking-500 text-xs"
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                {/* Next Button */}
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
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
                    Create Password
                  </label>
                  <div className="relative">
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-banking-500 focus:border-banking-500 text-xs"
                      placeholder="Minimum 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      {...register('confirmPassword')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-banking-500 focus:border-banking-500 text-xs"
                      placeholder="Re-enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Security Notice */}
                <div className="bg-banking-50/50 border border-banking-200/50 rounded-xl p-3 mb-4">
                  <div className="flex items-center text-xs text-banking-700">
                    <Shield className="h-3 w-3 mr-2" />
                    <span>KYC verification will be required to unlock all features</span>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2">
                  <input
                    {...register('terms')}
                    type="checkbox"
                    className="h-3 w-3 text-banking-600 focus:ring-banking-500 border-gray-300 rounded mt-0.5"
                  />
                  <div className="text-xs text-gray-700">
                    <span>I agree to the </span>
                    <Link href="/terms" className="text-banking-600 hover:text-banking-700">Terms of Service</Link>
                    <span> and </span>
                    <Link href="/privacy" className="text-banking-600 hover:text-banking-700">Privacy Policy</Link>
                  </div>
                </div>
                {errors.terms && (
                  <p className="text-xs text-red-600">{errors.terms.message}</p>
                )}

                {/* Buttons */}
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
                        Creating...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Sign In Link */}
          <div className="text-center text-xs mt-6">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/signin" className="text-banking-600 hover:text-banking-700 font-semibold">
              Sign in
            </Link>
          </div>
        </motion.div>

        {/* Security Notice */}
        <div className="mt-4 text-center text-xs text-gray-600">
          <p>🔒 Protected by 256-bit SSL encryption</p>
        </div>
      </div>
    </div>
  );
} 