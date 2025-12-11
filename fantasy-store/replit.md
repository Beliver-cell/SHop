# Fantasy Store - E-commerce Application

## Overview
This project is a full-stack e-commerce application designed to run within the Replit environment. It features a customer-facing online store, an administrative panel for product and order management, and a robust backend API. The primary purpose is to provide a complete, production-ready e-commerce solution with integrated payment processing, email verification, and image management. The project aims to offer a seamless shopping and administration experience, leveraging modern web technologies for scalability and maintainability.

## User Preferences
- I prefer simple language and direct instructions.
- I want iterative development, with clear steps for configuration and deployment.
- Ask for confirmation before making significant architectural changes or adding new external dependencies.
- Provide detailed explanations for critical configuration steps, especially regarding environment variables and external service integration.
- Ensure that any changes or recommendations maintain the current production-ready configuration and automated workflows.
- Do not make changes to `.env` files directly; instead, provide instructions for manual updates.

## System Architecture
The application is structured into three distinct services:
- **Frontend**: A customer-facing online store built with React, Vite, and Tailwind CSS, running on port 5000.
- **Admin Panel**: A management dashboard for products and orders, also built with React, Vite, and Tailwind CSS, running on port 5173 at secret route: `/admin-fantasy-luxe-panel-working`
- **Backend**: An Express.js REST API server handling business logic and data persistence, running on port 8000.

**Technical Implementations & Design Choices:**
- **Proxy Configuration**: Both frontend and admin panels use Vite's proxy to route `/api/*` requests to the backend, simplifying development and ensuring seamless API communication within the Replit environment.
- **Environment Variables**: Critical configurations (database URIs, API keys, secrets) are managed via `.env` files for each service, promoting secure and flexible deployment.
- **CORS Management**: Production-ready CORS configurations are implemented in the backend to control access from specified domains.
- **Error Handling**: Graceful error handling is implemented for external services like MongoDB and Cloudinary to prevent application crashes and provide informative warnings.
- **Automated Workflows**: Replit's always-on workflows are utilized to automatically run and manage the frontend, admin panel, and backend services.
- **UI/UX**: The frontend and admin panel utilize Tailwind CSS for a utility-first approach to styling, ensuring a consistent and responsive design.
- **Security Headers**: Helmet middleware provides security headers for production environments.

**Folder Structure:**
- `frontendv3/`: Contains the customer-facing store with chatbot support.
- `admin/`: Contains the administrative panel behind secret URL.
- `backendv3/`: Houses the Express.js API server with dedicated folders for `config`, `controllers`, `models`, and `routes`.

## External Dependencies
- **MongoDB**: Used as the primary database for data storage. Configuration is flexible, supporting both MongoDB Atlas (recommended for production) and local MongoDB instances.
- **Cloudinary**: Integrated for image storage and management, particularly for product images. Requires Cloudinary API credentials for functionality.
- **Paystack**: Exclusive payment gateway for secure transactions. Requires Paystack API credentials.
- **Email Service**: Dual support for verification and password reset OTPs:
  - **Gmail/SMTP**: Standard email service for development and testing
  - **SendGrid**: Professional email service for production (optional, requires API key)

## Features Implemented

### 1. Payment Integration
✅ **Paystack Only** - No other payment options available
- Secure payment processing
- Payment verification system
- Order confirmation on successful payment
- Cart clearing after payment

### 2. User Authentication & Verification
✅ **Email OTP Verification** (6-digit codes, 10-minute expiry)
- Sign-up with automatic OTP email
- Resend OTP functionality
- Password reset with OTP verification
- Email-based account recovery

### 3. Email Services
✅ **Flexible Email Configuration**
- **Option 1**: Gmail/SMTP (development & testing)
- **Option 2**: SendGrid (production-recommended)
- Automatic fallback from SendGrid to Gmail if needed
- Professional HTML email templates

### 4. SEO Optimization
✅ Complete SEO implementation:
- Meta tags and descriptions on all pages
- Structured data (Schema.org) for products and business
- robots.txt for search engine guidance
- Open Graph tags for social sharing
- Product JSON-LD markup for Google visibility
- Helmet security headers

### 5. Customer Support Chatbot
✅ **24/7 AI FAQ Bot** with:
- Answers for payments, shipping, returns, sizing, authenticity, orders, account, support
- Quick reply buttons for common questions
- Professional UI with instant responses
- Available on all pages

### 6. Admin Panel Access
✅ **Secure Hidden Route**: `/admin-fantasy-luxe-panel-working`
- Secret URL prevents user discovery
- JWT authentication required
- Secure login system

### 7. Production Readiness
✅ Security & Performance:
- Helmet security headers
- CORS properly configured
- Environment variables management
- Error handling for production
- Code minification and optimization
- Console cleanup

## Configuration Guide

### Email Setup

**For Gmail/SMTP (Development):**
1. Enable 2-factor authentication on Gmail
2. Generate app password: https://myaccount.google.com/apppasswords
3. Set in `.env`:
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=app_password_here
   ```

**For SendGrid (Production):**
1. Create SendGrid account: https://sendgrid.com
2. Generate API key in Settings > API Keys
3. Set in `.env`:
   ```
   SENDGRID_API_KEY=your_api_key_here
   SENDGRID_FROM_EMAIL=noreply@fantasyluxe.com
   ```

### Paystack Setup
1. Create Paystack account: https://paystack.com
2. Get API keys from Dashboard > Settings > API Keys & Webhooks
3. Set in `.env`:
   ```
   PAYSTACK_SECRET_KEY=your_secret_key
   PAYSTACK_PUBLIC_KEY=your_public_key
   ```

## Testing Verification Flow
1. Sign up with email
2. Receive 6-digit OTP code
3. Enter code in verification page
4. Account activated, can now login
5. Use "Forgot Password" to reset password with OTP

## Production Deployment Checklist
- [ ] Configure Paystack API keys
- [ ] Set up MongoDB Atlas connection
- [ ] Configure Cloudinary credentials
- [ ] Set JWT_SECRET
- [ ] Configure email service (Gmail or SendGrid)
- [ ] Set CORS_ORIGIN to production domain
- [ ] Set NODE_ENV to 'production'
- [ ] Configure SSL/HTTPS
- [ ] Test complete payment flow
- [ ] Test email verification
- [ ] Verify admin panel security
- [ ] Set up monitoring and logging

## Notes
- Email configuration supports both Gmail and SendGrid for flexibility
- SendGrid is recommended for production for better deliverability
- All OTP codes expire after 10 minutes
- Payment verification is automatic via Paystack callbacks
- Admin panel secret URL should not be shared publicly
