const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  brand: String,
  price: Number,
  stock: Number,
   initialStock: {
  type: Number,
  required: true
}
,
  status: {
    type: String,
    enum: ['in-stock', 'out-of-stock'],
    default: 'in-stock'
  }
});

module.exports = mongoose.model('Product', productSchema);
