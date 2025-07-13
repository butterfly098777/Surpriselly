// Footer.jsx
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "../assets/logo.png"; // replace with your actual logo

const Footer = () => {
  return (
    <footer className="bg-[#e6dcfa] mt-[7rem] text-gray-800 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <img src={logo} alt="Logo" className="w-24 mb-4" />
          <p className="text-sm text-gray-700">
            Your one-stop gifting destination – surprises delivered with love.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-purple-700">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><a href="/store" className="hover:text-purple-800">Shop</a></li>
            <li><a href="/wishlist" className="hover:text-purple-800">Wishlist</a></li>
            <li><a href="/cart" className="hover:text-purple-800">Cart</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-purple-700">Contact</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-center gap-2"><FaMapMarkerAlt className="text-purple-600" /> Jhansi, UP, India</li>
            <li className="flex items-center gap-2"><FaPhoneAlt className="text-purple-600" /> +91-9236553585</li>
            <li className="flex items-center gap-2"><FaEnvelope className="text-purple-600" /> yourmail@example.com</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-purple-700">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-purple-600 hover:text-purple-900"><FaFacebookF /></a>
            <a href="#" className="text-purple-600 hover:text-purple-900"><FaInstagram /></a>
            <a href="#" className="text-purple-600 hover:text-purple-900"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-10 text-sm border-t border-purple-200 pt-6 text-purple-800">
        © {new Date().getFullYear()} <span className="font-semibold">Surpriselly</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
