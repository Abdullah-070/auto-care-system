# Auto Care — Restructured MERN E-Commerce App

This project has been reorganized into three independent apps, all talking to one
Express + MongoDB API. **No colors, images, or existing functionality were removed** —
the original server-rendered (EJS) shop and admin pages are preserved untouched in
`legacy-ejs-app/` for reference, they're just no longer wired into the live deployment.

```
project/
├── backend/           Express REST API + MongoDB (the single source of truth)
├── frontend/          NEW — React customer storefront (Home, Shop, Cart, Checkout, Login/Register)
├── admin/              React admin dashboard (was react-app/, unchanged except folder name)
└── legacy-ejs-app/     Archived original EJS views/routes — NOT deployed, kept for reference
```

## What changed and why

1. **`backend/`** — stripped down to a pure JSON API (no more EJS/sessions/flash).
   - Kept: `config/`, `middlewares/apiAuth.js`, `middlewares/verifyToken.js`, `models/`, `routes/api/*`, `seed.js`
   - Moved out (unused by the API): `middlewares/auth.js`, `middlewares/global.js`, `middlewares/logger.js` → now in `legacy-ejs-app/middlewares/`
   - **Bug fixed**: `middlewares/apiAuth.js` read `decoded.user.role`, but the JWT payload from `routes/api/auth.js` is flat (`{ user_id, role }`), so it would crash on every admin-authenticated request (creating/deleting products or categories). Fixed to read `decoded.role`.
   - **Added**: `POST /api/v1/auth/register` (didn't exist before — needed for the new customer-facing storefront to let people sign up)
   - **Added**: `GET /api/v1/products/slug/:slug` (needed for the product detail page)
   - Image uploads now live at `backend/uploads/products` (previously `public/uploads/products`), served at `/uploads/...`

2. **`frontend/` (new)** — a real customer storefront in React, replacing the old EJS
   pages (`views/shop/*.ejs`), which had bugs (categories not loading, "Shop Now" not wired to
   anything). Pages: Home, Shop (search/filter/pagination), Product Detail, Cart (persisted in
   localStorage), Checkout, Login, Register. **Colors, fonts, and spacing are copied 1:1** from
   your original `public/css/style.css` (`#dc143c` / `#8b0000` red, same font, same button styles),
   and it reuses your actual `logo.png` and `hero.png` — nothing was redesigned.

3. **`admin/`** — this is your existing `react-app/`, just renamed. No code changes.

4. **`legacy-ejs-app/`** — your original server-rendered shop + admin panel (EJS views,
   `routes/shop`, `routes/admin`, `routes/auth`, `public/css`, `public/js`). Kept intact,
   untouched, in case you want to reference it later. It is **not** wired into `backend/server.js`
   anymore, since `frontend/` and `admin/` now do that job.

## Running locally

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

## Deploying

- **`backend/`** → Render (same as before). Root directory: `backend`. Env vars: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`.
- **`frontend/`** → new Vercel project. Root directory: `frontend`. Env var: `VITE_API_URL=https://<your-render-backend>.onrender.com/api/v1`
- **`admin/`** → your existing Vercel project, just update root directory to `admin` (was `react-app`) and keep the same `VITE_API_URL` env var.

## Seeding data

```bash
cd backend
npm run seed
```
Make sure `MONGO_URI` is set correctly first (in `.env` locally, or Render's env vars in production) — this is what will finally get real categories/products showing up on both the storefront and admin panel.
