const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const slugify = require("slugify");
const fs = require("fs");

// ✅ Multer: Image Upload Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

// ✅ List of All Allowed Categories (sync with frontend)
const allowedCategories = [
  "Tech & Products",
  "Flowers",
  "Personalized Gifts",
  "Fashion & Accessories",
  "Toys & Games",
  "Jewellery",
  "Pet Gifts",
  "Electronics & Gadgets",
  "Foods & Beverages",
  "Wellness & Self-Care",
  "Pet Supplies",
  "Home & Decor"
];

// ✅ POST: Create new product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, brand, category, StoreCode, Description } = req.body;

     if (!name || !price ||  !category || !StoreCode) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const slug = slugify(name, { lower: true, strict: true });
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const newProduct = new Product({
      name,
      price,
      brand,
      category,
        StoreCode,
      Description,
        image: `/uploads/${req.file.filename}` , 
      slug,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Product POST error:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// ✅ GET: Fetch all products or filter by category
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    console.error("Product fetch error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ 🆕 GET: Fetch product by slug (for detail page)
router.get("/slug/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("Slug fetch error:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Update product
router.put("/:id", async (req, res) => {
  try {
    const { name, price, brand, category, StoreCode, Description } = req.body;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, brand, category, StoreCode, Description },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// ✅ DELETE: Remove a product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product?.image) {
      const imgPath = path.join("C://Users//hp//Desktop//Surpriselly-main", "..", product.image);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Delete failed:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
