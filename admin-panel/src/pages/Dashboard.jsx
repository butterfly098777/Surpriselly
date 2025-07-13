import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";

export default function Dashboard() {
  const { products } = useProducts();
  const [userCount, setUserCount] = useState(0);

  const totalRevenue = products.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    // Fetch user count from server
    fetch("https://surpriselly.onrender.com/api/auth/count")
      .then((res) => res.json())
      .then((data) => setUserCount(data.count))
      .catch((err) => console.error("Failed to load user count:", err));
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between mb-4">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">
          📊 Users: {userCount}
        </div>
        <div className="bg-white p-4 shadow rounded">
          📦 Products: {products.length}
        </div>
        <div className="bg-white p-4 shadow rounded">
          💰 Revenue: ₹{totalRevenue.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
