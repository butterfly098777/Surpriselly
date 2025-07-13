import { Link, useLocation } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Users", path: "/users" },
  { name: "Products", path: "/products" },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="w-60 h-screen bg-gray-800 text-white p-4 space-y-4">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={`block px-4 py-2 rounded ${
            pathname === link.path ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
