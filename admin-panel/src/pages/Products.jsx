import { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext";

export default function Products() {
  const { products, setProducts } = useProducts();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    brand: "",
    category: "",
    StoreCode: "",
    Description: ""
  });
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: "",
    brand: "",
    category: "",
    StoreCode: "",
    Description: ""
  });

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://surpriselly.onrender.com/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  const handleAddProduct = async () => {
    const { name, price, brand, category, StoreCode, Description } = newProduct;
    if (!name || !price || !image || !category) {
      return alert("Please fill all fields and choose an image");
    }
    if (!allowedCategories.includes(category.trim())) {
      return alert("Invalid category selected");
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("price", price);
    formData.append("brand", brand.trim());
    formData.append("category", category.trim());
    formData.append("StoreCode", StoreCode.trim());
    formData.append("Description", Description.trim());
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Add failed response:", errorText);
        alert("Product creation failed. Check server route and logs.");
        return;
      }

      // const addedProduct = await res.json();
      await fetchProducts();
    setNewProduct({ name: "", price: "", brand: "", category: "", StoreCode: "", Description: "" });
    setImage(null);
    } catch (err) {
      console.error("Add failed:", err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const startEdit = (product) => {
    setEditId(product._id);
    setEditedProduct({
      name: product.name,
      price: product.price,
      brand: product.brand,
      category: product.category,
      StoreCode: product.StoreCode,
      Description: product.Description
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditedProduct({ name: "", price: "", brand: "", category: "", StoreCode: "", Description: "" });
  };

  const saveEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedProduct),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Update failed response:", errorText);
        return;
      }

      const updated = await res.json();
      setProducts(products.map((p) => (p._id === id ? updated : p)));
      cancelEdit();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="w-full px-4">
      <h2 className="text-2xl font-semibold mb-4">Product Management</h2>

      <div className="mb-4 flex flex-wrap gap-2 sm:items-center">
        {[
          { name: "name", placeholder: "Product Name" },
          { name: "price", placeholder: "Price", type: "number" },
          { name: "brand", placeholder: "Brand" },
          { name: "StoreCode", placeholder: "Store Code" },
          { name: "Description", placeholder: "Description" }
        ].map((field) => (
          <input
            key={field.name}
            type={field.type || "text"}
            placeholder={field.placeholder}
            value={newProduct[field.name] || ""}
            onChange={(e) => setNewProduct({ ...newProduct, [field.name]: e.target.value })}
            className="border p-2 rounded w-full sm:w-auto"
          />
        ))}

        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">-- Select Category --</option>
          {allowedCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded"
        />

        <button
          onClick={handleAddProduct}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      <div className="overflow-auto max-w-full max-h-[70vh] border rounded">
        <table className="min-w-full bg-white text-sm text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Image</th>
              <th className="p-2">Product</th>
              <th className="p-2">Price</th>
              <th className="p-2">Brand</th>
              <th className="p-2">Store Code</th>
              <th className="p-2">Description</th>
              <th className="p-2">Category</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-4 text-gray-500">
                  No products added yet.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-2">
                    {p.image ? (
                      <img
                        src={`http://localhost:5000/${p.image}`}
                        alt="Product"
                        className="h-10 mx-auto"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  {["name", "price", "brand", "StoreCode", "Description", "category"].map((key) => (
                    <td className="p-2" key={key}>
                      {editId === p._id ? (
                        <input
                          type={key === "price" ? "number" : "text"}
                         value={editedProduct[key] ?? ""}
                          onChange={(e) => setEditedProduct({ ...editedProduct, [key]: e.target.value })}
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        key === "price" ? `₹${p[key]}` : p[key]
                      )}
                    </td>
                  ))}
                  <td className="p-2 space-x-2">
                    {editId === p._id ? (
                      <>
                        <button onClick={() => saveEdit(p._id)} className="text-green-600">Save</button>
                        <button onClick={cancelEdit} className="text-gray-600">Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(p)} className="text-blue-600">Edit</button>
                        <button onClick={() => deleteProduct(p._id)} className="text-red-600">Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
