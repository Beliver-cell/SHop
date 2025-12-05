# Fantasy Store - E-commerce Application

## Overview
This project is a full-stack e-commerce application designed to run within the Replit environment. It features a customer-facing online store, an administrative panel for product and order management, and a robust backend API. The primary purpose is to provide a complete, production-ready e-commerce solution with integrated payment processing and image management. The project aims to offer a seamless shopping and administration experience, leveraging modern web technologies for scalability and maintainability.

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
- **Admin Panel**: A management dashboard for products and orders, also built with React, Vite, and Tailwind CSS, running on port 5173.
- **Backend**: An Express.js REST API server handling business logic and data persistence, running on port 8000.

**Technical Implementations & Design Choices:**
- **Proxy Configuration**: Both frontend and admin panels use Vite's proxy to route `/api/*` requests to the backend, simplifying development and ensuring seamless API communication within the Replit environment.
- **Environment Variables**: Critical configurations (database URIs, API keys, secrets) are managed via `.env` files for each service, promoting secure and flexible deployment.
- **CORS Management**: Production-ready CORS configurations are implemented in the backend to control access from specified domains.
- **Error Handling**: Graceful error handling is implemented for external services like MongoDB and Cloudinary to prevent application crashes and provide informative warnings.
- **Automated Workflows**: Replit's always-on workflows are utilized to automatically run and manage the frontend, admin panel, and backend services.
- **UI/UX**: The frontend and admin panel utilize Tailwind CSS for a utility-first approach to styling, ensuring a consistent and responsive design.
- **SEO Implementation**: Comprehensive search engine optimization including:
  - Meta tags with Open Graph and Twitter cards for all pages
  - JSON-LD schema markup (Organization, Product, ContactPage, BreadcrumbList)
  - Dynamic XML sitemap with proper escaping for special characters
  - robots.txt with permissions for AI crawlers (GPTBot, Claude-Web, etc.)
  - Page-specific canonical URLs and structured data
  - Product pages with rich snippets for enhanced search visibility

**Folder Structure:**
- `frontendv3/`: Contains the customer-facing store.
- `admin/`: Contains the administrative panel.
- `backendv3/`: Houses the Express.js API server with dedicated folders for `config`, `controllers`, `models`, and `routes`.

## External Dependencies
- **MongoDB**: Used as the primary database for data storage. Configuration is flexible, supporting both MongoDB Atlas (recommended for production) and local MongoDB instances.
- **Cloudinary**: Integrated for image storage and management, particularly for product images. Requires Cloudinary API credentials for functionality.
- **Stripe**: Utilized for payment processing, handling all secure transactions. Requires a Stripe API key.