const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();
const dirname="C://Users//hp//Desktop//Surpriselly-main"
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(dirname, 'uploads')));



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products",productRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb+srv://pallavipatel8080:Surpriselly8080@cluster0.o1x2lzf.mongodb.net/?\retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
