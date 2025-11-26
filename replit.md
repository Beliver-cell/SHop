# Fantasy Store - E-commerce Application

## Overview
This is a full-stack e-commerce application imported from GitHub and configured to run in the Replit environment. The project consists of three main components:

1. **Frontend** (React + Vite + Tailwind CSS) - Customer-facing online store
2. **Admin Panel** (React + Vite + Tailwind CSS) - Product and order management
3. **Backend** (Express.js + MongoDB) - REST API server

## Current Status
✅ **Successfully Imported and Configured for Development**
- Node.js environment set up
- All dependencies installed for frontend, admin, and backend
- Frontend configured to run on port 5000 with Vite proxy
- Backend configured to run on port 8000
- Admin panel configured to run on port 5174 with Vite proxy  
- Both Frontend and Backend workflows are running automatically
- Proxy configuration routes all `/api/*` requests from frontend/admin to backend

⚠️ **Requires User Configuration Before Full Functionality**
- **MongoDB connection** (required for database functionality) - See section "MongoDB Database"
- **Cloudinary credentials** (required for image uploads) - See section "Cloudinary Setup"
- **Stripe API key** (required for payment processing) - See section "Stripe Setup"
- **Admin credentials** (required for admin panel login) - Update in backend .env file
- **Admin Panel** must be started manually (not included in automatic workflows)

## Project Structure
```
Fantasy Store/
├── frontendv3/          # Customer-facing store (Port 5000)
│   ├── src/
│   ├── .env            # Frontend environment variables
│   └── vite.config.js
├── admin/              # Admin panel (Not currently running)
│   ├── src/
│   ├── .env           # Admin environment variables
│   └── vite.config.js
└── backendv3/         # API server (Port 8000)
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── .env          # Backend environment variables
    └── server.js
```

## Configuration Required

### 1. MongoDB Database
The backend requires a MongoDB database. You have several options:

**Option A: MongoDB Atlas (Recommended for production)**
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string
4. Update the `mongodb_URI` in the backend `.env` file

**Option B: Local MongoDB**
1. Set up MongoDB locally
2. Update the connection string accordingly

### 2. Environment Variables Setup

#### Backend (.env file location: `Fantasy Store/backendv3/.env`)
Current placeholder values that need to be updated:

```env
PORT=8000                                    # ✅ Already configured
mongodb_URI=mongodb://localhost:27017/...   # ⚠️ REPLACE with your MongoDB connection string
jwtSecret=your_jwt_secret_key_change_this   # ⚠️ REPLACE with a secure random string
admin_Email=admin@fantasystore.com           # ⚠️ Set your admin email
admin_Password=admin123                      # ⚠️ Set a secure admin password
CLOUDINARY_NAME=your_cloudinary_name         # ⚠️ Get from Cloudinary dashboard
CLOUDINARY_API_KEY=your_cloudinary_api_key   # ⚠️ Get from Cloudinary dashboard
CLOUDINARY_SECRET_KEY=your_cloudinary_secret # ⚠️ Get from Cloudinary dashboard
stripeKey=your_stripe_secret_key             # ⚠️ Get from Stripe dashboard
```

#### Frontend (.env file location: `Fantasy Store/frontendv3/.env`)
```env
VITE_BACKEND_URL=""  # ✅ Already configured (uses Vite proxy)
```

#### Admin Panel (.env file location: `Fantasy Store/admin/.env`)
```env
VITE_BACKEND_URL=""  # ✅ Already configured (uses Vite proxy)
```

**Important Notes about Backend URL Configuration**:
- The `VITE_BACKEND_URL` is set to an empty string in development
- When empty, API calls like `backendUrl + "/api/user/login"` become `/api/user/login` (relative URLs)
- Vite's proxy intercepts all `/api/*` requests and forwards them to `http://localhost:8000`
- This configuration ensures the application works correctly in the Replit development environment
- For production deployment, you'll need to update this value to your deployed backend URL

### 3. Cloudinary Setup (For Image Uploads)
1. Create a free account at https://cloudinary.com
2. Go to your dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Update the backend `.env` file with these credentials

### 4. Stripe Setup (For Payment Processing)
1. Create an account at https://stripe.com
2. Get your API keys from the dashboard
3. Update the `stripeKey` in the backend `.env` file

## How to Run

### Current Setup
The application is already running with two workflows:
- **Frontend**: Running on port 5000 (customer store)
- **Backend**: Running on port 8000 (API server)

### Accessing the Admin Panel
The admin panel now runs as an automatic workflow on port 5173:
- **Admin Panel URL**: Available when you click "Webview" in the Replit sidebar (or use the Network tab URL with port 5173)
- The admin panel is configured with:
  - Host binding to `0.0.0.0` for external access in Replit
  - Vite proxy to forward `/api/*` requests to the backend on port 8000
  - Proper HMR (Hot Module Replacement) settings for Replit environment
  - Production-ready settings

### Accessing the Application
- **Frontend Store**: Click the "Webview" button or open the Replit preview
- **Backend API**: Available at `http://localhost:8000`
- **Admin Panel**: Will be available when you run it manually

## Recent Changes (Setup for Replit)

### Configuration Changes
1. **Frontend Vite Config**: 
   - Updated to bind to `0.0.0.0:5000` with proper HMR configuration for Replit
   - Added proxy configuration to forward `/api/*` requests to backend on localhost:8000
   - Configured with strictPort and WebSocket settings for Replit environment
2. **Admin Vite Config**: 
   - Updated to bind to `0.0.0.0:5174` with proper HMR configuration for Replit
   - Added proxy configuration to forward `/api/*` requests to backend on localhost:8000
   - Configured with strictPort and WebSocket settings for Replit environment
3. **Backend Server**: Updated to listen on `0.0.0.0:8000` (changed from port 4000 to use available Replit port)
4. **MongoDB Config**: Added graceful error handling to prevent crashes when MongoDB is not configured
5. **Cloudinary Config**: Added graceful error handling with informative warnings
6. **Environment Files**: 
   - Created .env files for all three components
   - Set `VITE_BACKEND_URL=""` to use relative paths with proxy
   - All API calls become relative URLs (e.g., `/api/user/login`) that are caught by Vite's proxy
7. **Workflows**: Set up automated workflows for Frontend and Backend

### Dependencies
All dependencies have been installed for:
- Backend (Express, Mongoose, Cloudinary, Stripe, etc.)
- Frontend (React, Vite, Tailwind CSS, Axios, etc.)
- Admin Panel (React, Vite, Tailwind CSS, Axios, etc.)

## Next Steps

1. **Set up MongoDB**:
   - Create a MongoDB Atlas account or use another MongoDB provider
   - Update the `mongodb_URI` in the backend .env file
   - Restart the Backend workflow

2. **Configure Cloudinary** (if you need image uploads):
   - Create a Cloudinary account
   - Update the Cloudinary credentials in the backend .env file
   - Restart the Backend workflow

3. **Set up Stripe** (if you need payment processing):
   - Create a Stripe account
   - Update the `stripeKey` in the backend .env file
   - Restart the Backend workflow

4. **Set Admin Credentials**:
   - Update `admin_Email` and `admin_Password` in the backend .env file
   - These will be used to log in to the admin panel

5. **Test the Application**:
   - Access the frontend store through the Webview
   - Test user registration and login
   - Run the admin panel and log in with your admin credentials
   - Test adding products through the admin panel
   - Test the shopping cart and checkout flow

## Deployment

### Deploying on Replit
Replit deployment configuration has been set up for this project:
1. The deployment is configured as a "vm" type (always-running server)
2. Build command compiles both frontend and admin: `cd 'Fantasy Store/frontendv3' && npm run build && cd '../admin' && npm run build`
3. Run command starts the backend: `cd 'Fantasy Store/backendv3' && npm start`

**Before deploying:**
1. Update the `VITE_BACKEND_URL` in frontend and admin .env files to point to your production backend URL
2. Ensure all production environment variables are set in Replit Secrets:
   - MongoDB connection string (production database)
   - Cloudinary credentials
   - Stripe production API keys
   - Admin credentials
3. Configure CORS in the backend to allow your production frontend domain
4. Click the "Publish" button in Replit

### Deploying to Other Platforms
The project includes deployment configurations for Vercel and Render (from original repository):
- `vercel.json` files in `Fantasy Store/frontend frontendv3/`, `Fantasy Store/admin/`, and `Fantasy Store/backendv3/` directories
- `render.yaml` in `Fantasy Store/backendv3/` directory

**⚠️ Important - These configs need updates for the new proxy setup:**

1. **Update Environment Variables**:
   - Set `VITE_BACKEND_URL` in frontend/admin to your deployed backend URL (e.g., `https://your-backend.vercel.app`)
   - DO NOT leave it as empty string in production
   
2. **Modify Vite Configuration** (for production builds):
   ```javascript
   // In vite.config.js, make proxy conditional:
   server: {
     proxy: process.env.NODE_ENV === 'development' ? {
       '/api': {
         target: 'http://localhost:8000',
         changeOrigin: true,
         secure: false
       }
     } : undefined
   }
   ```

3. **Configure Platform Environment Variables**:
   - Set all backend environment variables (MongoDB URI, Cloudinary, Stripe, etc.)
   - Set frontend/admin `VITE_BACKEND_URL` to deployed backend URL
   
4. **Update CORS Settings**:
   - In `Fantasy Store/backendv3/server.js`, update CORS to allow your frontend domains
   - Example: `app.use(cors({ origin: ['https://your-frontend.vercel.app', 'https://your-admin.vercel.app'] }))`

5. **Deploy Order**:
   - Deploy backend first and note its URL
   - Update `VITE_BACKEND_URL` in frontend/admin .env files
   - Build and deploy frontend and admin with the updated backend URL

## Troubleshooting

### Backend won't connect to MongoDB
- Check your MongoDB connection string is correct
- Ensure your IP is whitelisted in MongoDB Atlas (for MongoDB Atlas)
- Verify network connectivity
- **Note**: You may see "Operation `products.find()` buffering timed out" or similar errors in the logs when MongoDB is not configured. This is expected behavior - the backend will display warnings and continue running. These errors will stop once you configure MongoDB.

### Images not uploading
- Verify Cloudinary credentials are correct
- Check the Cloudinary dashboard for upload limits

### Frontend can't reach backend
- Ensure both workflows are running (Backend and Frontend)
- Check the workflow logs for errors
- Verify the Vite proxy is configured correctly in `vite.config.js`
- The `VITE_BACKEND_URL` should be empty string `""` in development (uses proxy)
- For production, set `VITE_BACKEND_URL` to your deployed backend URL

### After updating environment variables
When you update any .env files:
1. Restart the affected workflow (Frontend, Backend, or both)
2. In Replit, workflows should auto-restart when .env files change
3. If changes don't take effect, manually restart the workflow using the workflow panel

## Support
If you encounter issues, check the workflow logs for error messages and ensure all environment variables are properly configured.
