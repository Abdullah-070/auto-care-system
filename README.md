# Auto Care - Auto Spare Parts Ecommerce Platform

A full-stack ecommerce platform for buying and selling auto spare parts with JWT authentication, admin dashboard, and React frontend.

## Features
- **Browse Products**: Browse auto spare parts organized by categories
- **Shopping Cart & Checkout**: Add items and securely place orders
- **User Authentication**: JWT-based secure login/register
- **Admin Dashboard**: Manage products, categories, and orders
- **RESTful API**: Clean API architecture under `/api/v1`

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB, JWT, EJS
- **Frontend**: React 18+, Vite, Context API, Axios

## Quick Setup

### Prerequisites
- Node.js v14+
- MongoDB
- npm

### Installation
```bash
# Backend
npm install
npm i -g dotenv-cli  # optional

# Configure environment variables (.env)
# JWT_SECRET=your_secret_key
# MONGODB_URI=your_connection_string

# Seed database
node seed.js

# Start backend (port 3000)
node server.js

# Frontend (in another terminal)
cd react-app
npm install
npm run dev  # runs on port 5173
```

## API Endpoints

**Auth**: `POST /api/v1/auth/login`, `POST /api/v1/auth/register`

**Products**: `GET /api/v1/products`, `POST /api/v1/products` (admin)

**Categories**: `GET /api/v1/categories`, `POST /api/v1/categories` (admin)

**Orders**: `POST /api/v1/orders`, `GET /api/v1/orders` (authenticated)

**User**: `GET /api/v1/user/profile` (authenticated)

## Default Credentials
- **Admin**: `admin` / `admin123`
- **Customer**: `customer` / `customer123`

## Project Structure
```
├── models/              # MongoDB schemas
├── routes/              # Express routes (admin, api, auth, shop)
├── middlewares/         # Auth, logging, verification
├── views/               # EJS templates
├── public/              # Static assets
├── react-app/           # React frontend
└── server.js            # Main entry point
```
