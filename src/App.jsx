import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import AppLayout from './components/AppLayout';
import Wishlist from './components/Wishlist';
import Store from './components/Store';
import Cart from './components/Cart';
import ProductDetailPage from './pages/ProductDetailPage';
import RedirectToStoreWithFilters from './components/RedirectToStoreWithFilters';
import OccasionShop from './pages/OccasionShop';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const location = useLocation();
  const isAuthPage = ["/signup", "/login"].includes(location.pathname);

  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Main App Routes with Layout */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="store" element={<Store />} />
        <Route path="cart" element={<Cart />} />
        <Route path="product/:slug" element={<ProductDetailPage />} />
        <Route path="store/:slug" element={<RedirectToStoreWithFilters />} />
        <Route path="shop/:name" element={<OccasionShop />} />
      </Route>
    </Routes>
  );
}

export default App;
