const API_URL = 'https://surpriselly.onrender.com/api/products';

let updateMode = false;
let currentProductId = null;
let allProducts = [];

// Fetch and render all products
async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to load products");

    allProducts = await res.json();
    renderProducts(allProducts);
    populateFilterOptions(allProducts);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    alert("Backend is not running or endpoint is wrong!");
  }
}

// Render table rows
function renderProducts(products) {
  const tbody = document.querySelector("#productTable tbody");
  tbody.innerHTML = "";

  products.forEach(product => {
    const initial = product.initialStock ?? product.stock;
    const orderDisabled = product.stock <= 0 ? 'disabled' : '';
    const returnDisabled = product.stock >= initial ? 'disabled' : '';

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${product.name}</td>
      <td>${product.brand}</td>
      <td>${product.category}</td>
      <td>${product.price}</td>
      <td>${product.stock}</td>
      <td>
        <button onclick="orderProduct('${product._id}')" ${orderDisabled}>Order</button>
        <button onclick="returnProduct('${product._id}')" ${returnDisabled}>Return</button>
        <button onclick="editProduct('${product._id}')">Update</button>
        <button onclick="deleteProduct('${product._id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Populate brand/category filters
function populateFilterOptions(products) {
  const brandSelect = document.getElementById("filterBrand");
  const categorySelect = document.getElementById("filterCategory");

  const brands = [...new Set(products.map(p => p.brand))];
  const categories = [...new Set(products.map(p => p.category))];

  brandSelect.innerHTML = `<option value="">All Brands</option>` +
    brands.map(b => `<option value="${b}">${b}</option>`).join('');

  categorySelect.innerHTML = `<option value="">All Categories</option>` +
    categories.map(c => `<option value="${c}">${c}</option>`).join('');
}

// Add or update product
async function addProduct(e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    brand: document.getElementById("brand").value,
    price: parseFloat(document.getElementById("price").value),
    stock: parseInt(document.getElementById("stock").value)
  };

  const url = updateMode
    ? `${API_URL}/${currentProductId}`
    : `${API_URL}/add`;
  const method = updateMode ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    alert(result.message || "Failed to save product");
    return;
  }

  e.target.reset();
  updateMode = false;
  currentProductId = null;
  document.querySelector("button[type=submit]").innerText = "Add";
  fetchProducts();
}

// Delete product
async function deleteProduct(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchProducts();
}

// Order product (decrease stock)
async function orderProduct(id) {
  const res = await fetch(`${API_URL}/${id}/order`, { method: "PUT" });
  const data = await res.json();
  if (res.ok) {
    fetchProducts();
  } else {
    alert(data.message || "Could not place order");
  }
}

// Return product (increase stock)
async function returnProduct(id) {
  const res = await fetch(`${API_URL}/${id}/return`, { method: "PUT" });
  const data = await res.json();
  if (res.ok) {
    fetchProducts();
  } else {
    alert(data.message || "Could not return product");
  }
}

// Edit existing product
function editProduct(id) {
  updateMode = true;
  currentProductId = id;

  const product = allProducts.find(p => p._id === id);
  if (!product) return alert("Product not found");

  document.getElementById("name").value = product.name;
  document.getElementById("category").value = product.category;
  document.getElementById("brand").value = product.brand;
  document.getElementById("price").value = product.price;
  document.getElementById("stock").value = product.stock;

  document.querySelector("button[type=submit]").innerText = "Update Product";
}

// Filter products by brand, category, price
function applyFilters() {
  const brand = document.getElementById("filterBrand").value;
  const category = document.getElementById("filterCategory").value;
  const minPrice = parseFloat(document.getElementById("filterMinPrice").value) || 0;
  const maxPrice = parseFloat(document.getElementById("filterMaxPrice").value) || Infinity;

  const filtered = allProducts.filter(product => {
    return (
      (brand === "" || product.brand === brand) &&
      (category === "" || product.category === category) &&
      product.price >= minPrice &&
      product.price <= maxPrice
    );
  });

  renderProducts(filtered);
}

// Reset filters
function clearFilters() {
  document.getElementById("filterBrand").value = "";
  document.getElementById("filterCategory").value = "";
  document.getElementById("filterMinPrice").value = "";
  document.getElementById("filterMaxPrice").value = "";
  renderProducts(allProducts);
}

// Init
document.getElementById("addProductForm").addEventListener("submit", addProduct);
fetchProducts();
