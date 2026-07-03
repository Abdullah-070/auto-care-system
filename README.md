## Auto Care - Auto Spare Parts Ecommerce Platform
A full-stack ecommerce platform for buying and selling auto spare parts with JWT authentication, admin dashboard, and React frontend.

## Features
- **Browse Products**: Browse auto spare parts organized by categories
- **Shopping Cart & Checkout**: Add items and securely place orders
- **User Authentication**: JWT-based secure login/register
- **Admin Dashboard**: Manage products, categories, and orders
- **RESTful API**: Clean API architecture under `/api/v1`

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB, JWT
- **Frontend**: React 18+, Vite, Context API, Axios

## Project Structure
```
├── backend/           Express REST API + MongoDB (the single source of truth)
├── frontend/          NEW — React customer storefront (Home, Shop, Cart, Checkout, Login/Register)
└── admin/              React admin dashboard (was react-app/, unchanged except folder name)
```

## Quick Setup

### Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- npm

### Running locally
```bash
# Backend (port 3000)
cd backend
npm install
npm run dev          # or: npm start

# Frontend storefront (port 5173)
cd frontend
npm install
npm run dev

# Admin dashboard
cd admin
npm install
npm run dev
```
Each of `frontend/.env` and `admin/.env` points to `http://localhost:3000/api/v1` by default.

### Seeding data
```bash
cd backend
npm run seed
```

## API Endpoints
**Auth**: `POST /api/v1/auth/login`, `POST /api/v1/auth/register`
**Products**: `GET /api/v1/products`, `POST /api/v1/products` (admin)
**Categories**: `GET /api/v1/categories`, `POST /api/v1/categories` (admin)
**Orders**: `POST /api/v1/orders`, `GET /api/v1/orders` (authenticated)
**User**: `GET /api/v1/user/profile` (authenticated)

## Default Credentials
(created by `npm run seed` — login is by **email**, not username)
- **Admin**: `admin@example.com` / `password123`
- **Customer**: `user@example.com` / `password123`
