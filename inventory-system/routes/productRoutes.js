const express = require('express');
const router = express.Router();
const Product = require('../models/product'); 


// @route   POST /api/products/add
router.post('/add', async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      initialStock: req.body.stock // ✅ set initialStock when product is created
    });
    await product.save();
    res.status(201).json({ message: 'Product added', product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// @route   GET /api/products/
// @desc    Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   PUT /api/products/:id/order
// @desc    Decrease stock (Order placed)
router.put('/:id/order', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.stock <= 0) {
      return res.status(400).json({ message: 'Product is out of stock' });
    }

    product.stock -= 1;
    await product.save();
    res.json({ message: 'Order placed', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// @route   PUT /api/products/:id/return
router.put('/:id/return', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // ✅ Only allow return if stock < initialStock
    if (product.stock >= product.initialStock) {
      return res.status(400).json({ message: 'Cannot return: stock already at original value' });
    }

    product.stock += 1;
    await product.save();
    res.json({ message: 'Product returned', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
