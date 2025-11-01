# 🛍️ Shopping-APA (Admin Product App)

A complete e-commerce shopping platform featuring user login, product listing, admin panel for product management, and secure backend functionality using MongoDB, Cloudinary, and JWT.

---

## 🚀 Features

- 🔐 User Authentication (Sign Up/Login)
- 📦 Product Listings
- 🛠️ Admin Panel for Product Management
- 🗃️ MongoDB Database Integration
- ☁️ Cloudinary Image Upload
- 🍪 JWT Authentication with Secure Cookies

---

## ⚙️ Initialization & Setup Guide

### 1. 📥 Clone the Repository

```bash
git clone https://github.com/yourusername/shopping-apa.git
cd shopping-apa
```

### 2. 🔧 Backend Setup (`backendv3/`)

Install Dependencies:

```bash
cd backendv3
npm install
```

### 📄 Create `.env` in `backendv3/` directory

```env
PORT=8080

# MongoDB URI
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
jwtSecret=your_jwt_secret_key

# Admin credentials
admin_Email=admin@example.com
admin_Password=your_admin_password

# Cloudinary Credentials
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret

```

To start the backend server:

```bash
npm run dev
```

---

### 3. 🌐 Frontend Setup (`frontend/`)

Install Dependencies:

```bash
cd ../frontend
npm install
```

To run the frontend app:

```bash
npm start
```

This will launch the user interface for shopping and login/signup functionality.

---

### 4. 🧑‍💼 Admin Panel Setup (`admin_panel/`)

Install Dependencies:

```bash
cd ../admin_panel
npm install
```

To run the admin dashboard:

```bash
npm start
```

Login to admin dashboard using credentials add .env:
- **Email**: `your adminEmail`
- **Password**: `your admin password`

---

## 🌍 Environment Overview

This project requires three `.env` files (currently only one used in `backendv3`):

### 🛠 Backend (.env)
Used for MongoDB connection, Cloudinary API credentials, JWT secret, and admin login credentials.

Make sure to never expose sensitive environment files in public repositories.

---

## 📂 Directory Structure

```
shopping-apa/
├── backendv3/      # Node.js backend API
├── frontendv3/       # React frontend for users
├── admin_panel/    # React admin dashboard
└── README.md       # Project instructions
```

---

## 📌 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT with HTTP-only Cookies
- **Image Hosting**: Cloudinary

---

## 🙌 Contributing

Contributions, issues, and feature requests are welcome. Feel free to fork the repo and submit a pull request.

---

## 📜 License

This project is for learning and demonstration purposes.
