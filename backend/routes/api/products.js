const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const apiAuth = require('../../middlewares/apiAuth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer Config
const storage = multer.diskStorage({
  destination: './uploads/products',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    let products = await Product.find().populate('category', 'name');

    // Sort by the trailing number in the product name (e.g. "Automotive Product 9" -> 9),
    // falling back to createdAt then name for products without a numeric suffix.
    // This is more reliable than sorting by createdAt alone, since bulk-seeded
    // products can share the exact same millisecond timestamp.
    const extractNumber = (name) => {
      const match = name.match(/(\d+)\s*$/);
      return match ? parseInt(match[1], 10) : null;
    };

    products = products.sort((a, b) => {
      const numA = extractNumber(a.name);
      const numB = extractNumber(b.name);
      if (numA !== null && numB !== null) return numA - numB;
      if (numA !== null) return -1;
      if (numB !== null) return 1;
      if (a.createdAt && b.createdAt && a.createdAt.getTime() !== b.createdAt.getTime()) {
        return a.createdAt - b.createdAt;
      }
      return a.name.localeCompare(b.name);
    });

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/products/slug/:slug
// @desc    Get a single product by slug
// @access  Public
router.get('/slug/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('category', 'name slug');
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/products
// @desc    Create a product
// @access  Private/Admin
router.post('/', apiAuth, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file ? `/uploads/products/${req.file.filename}` : '/uploads/products/default.jpg';
    
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/:id', apiAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    await product.deleteOne();
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
