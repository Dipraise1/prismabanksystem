# BankBroker - Modern Banking Frontend

A modern, responsive banking and brokerage frontend application built with Next.js, TypeScript, and Tailwind CSS. Designed specifically for the US market with professional banking features and a contemporary user interface.

## 🚀 Features

- **Modern Design**: Clean, professional interface with banking-focused color schemes
- **Responsive Layout**: Fully responsive design that works on all devices
- **Interactive Components**: Smooth animations and transitions with Framer Motion
- **Financial Dashboard**: Interactive charts and data visualization with Recharts
- **Contact Forms**: Validated contact forms with React Hook Form and Zod
- **Accessibility**: WCAG compliant with proper semantic HTML
- **Performance**: Optimized with Next.js 14 and modern best practices

## 🛠 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom banking theme
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Deployment**: Optimized for Vercel, Netlify, or any Node.js hosting

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd bankbroker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## 🎨 Design System

The application uses a custom banking-focused design system with:

- **Primary Colors**: Banking blue palette (#0ea5e9 to #0c4a6e)
- **Success Colors**: Green palette for positive financial indicators
- **Typography**: Inter font family for modern, readable text
- **Components**: Reusable components with consistent styling
- **Animations**: Subtle animations for enhanced user experience

## 📱 Sections

1. **Header**: Responsive navigation with smooth scrolling
2. **Hero**: Compelling headline with key statistics
3. **Services**: Comprehensive banking and brokerage services
4. **Features**: Key benefits and unique selling points
5. **Dashboard**: Interactive financial data visualization
6. **Contact**: Professional contact form with validation
7. **Footer**: Company information and useful links

## 🔧 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript type checking

## 🚀 Deployment Guide

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (for production)
- Git installed
- Vercel account (recommended) or any Node.js hosting

### 1. Environment Setup

Create a `.env` file in the root directory with the following variables:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/bankbroker"

# Authentication
JWT_SECRET="your-secure-random-string"

# Admin Account
ADMIN_EMAIL="admin@bankbroker.com"
ADMIN_PASSWORD="your-secure-admin-password"
```

### 2. Database Setup

1. **Create PostgreSQL Database**:
   ```sql
   CREATE DATABASE bankbroker;
   ```

2. **Update DATABASE_URL** in `.env` with your PostgreSQL credentials

3. **Run Migrations**:
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

4. **Seed Initial Data**:
   ```bash
   npx prisma db seed
   ```

### 3. Production Build

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start production server
npm start
```

### 4. Deployment Options

#### A. Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### B. Deploy to Other Platforms

1. **Traditional Hosting**:
   - Upload built files
   - Set environment variables
   - Run with PM2:
     ```bash
     npm install -g pm2
     pm2 start npm --name "bankbroker" -- start
     ```

2. **Docker Deployment**:
   ```bash
   # Build Docker image
   docker build -t bankbroker .
   
   # Run container
   docker run -p 3000:3000 bankbroker
   ```

### 5. Post-Deployment

1. **Update Admin Password**:
   - Login with default admin credentials
   - Change password immediately
   - Update admin email if needed

2. **SSL Setup**:
   - Ensure SSL is enabled
   - Force HTTPS redirects
   - Update CSP headers if needed

3. **Monitoring Setup**:
   - Set up error tracking (e.g., Sentry)
   - Configure performance monitoring
   - Set up uptime monitoring

### 6. Security Checklist

- [ ] Changed default admin password
- [ ] Enabled SSL/HTTPS
- [ ] Set secure JWT secret
- [ ] Configured proper CORS settings
- [ ] Set up rate limiting
- [ ] Enabled database encryption
- [ ] Configured backup system
- [ ] Set up logging system

### 7. Maintenance

1. **Regular Updates**:
   ```bash
   # Update dependencies
   npm update

   # Check for vulnerabilities
   npm audit
   ```

2. **Database Maintenance**:
   ```bash
   # Backup database
   pg_dump bankbroker > backup.sql

   # Run migrations
   npx prisma migrate deploy
   ```

3. **Monitoring**:
   - Check error logs regularly
   - Monitor system resources
   - Review security alerts



- Built with Next.js and React
- Styled with Tailwind CSS
- Icons by Lucide
- Charts by Recharts
- Animations by Framer Motion # prismabanksystem
