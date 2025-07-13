const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
 name: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String },
  category: { type: String, required: true },
  StoreCode:{ type: String, required: true},         // make sure these two exist!
  Description: {type: String},
  image: { type: String, required: true },
  slug: { type: String, unique: true }, // optional: for product route

});

module.exports = mongoose.model("Product", productSchema);

