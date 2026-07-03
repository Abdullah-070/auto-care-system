require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const cors = require('cors');

// API Routes
const apiAuthRoutes = require('./routes/api/auth');
const apiProductRoutes = require('./routes/api/products');
const apiCategoryRoutes = require('./routes/api/categories');
const apiOrderRoutes = require('./routes/api/orders');
const apiUserRoutes = require('./routes/api/user');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded product images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuration
const PORT = process.env.PORT || (config.has('port') ? config.get('port') : 3000);
const MONGO_URI = config.get('mongoURI');

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Health check
app.get('/', (req, res) => {
  res.json({ ok: true, service: 'Auto Care API', version: 'v1' });
});

// API Route Registration
app.use('/api/v1/auth', apiAuthRoutes);
app.use('/api/v1/products', apiProductRoutes);
app.use('/api/v1/categories', apiCategoryRoutes);
app.use('/api/v1/orders', apiOrderRoutes);
app.use('/api/v1/user', apiUserRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ msg: 'Route not found' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: 'Internal server error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Auto Care API running on port ${PORT}`);
});
