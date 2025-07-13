import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQty,
    incrementQty,
    decrementQty,
    clearCart,
  } = useCart();
  const [showModal, setShowModal] = useState(false);

  const total = cart.reduce(
  (sum, item) => sum + (item.price || 0) * (item.qty || 1),
  0
);

  const handleRemoveAll = () => {
    clearCart();           // ✅ Clears the cart
    setShowModal(false);   // ✅ Closes modal
  };

  const handleCheckout = async () => {
    window.location.href="http://razorpay.me/@socialoffer";
    try {
      const res = await fetch("https://surpriselly.onrender.com/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });

      const order = await res.json();

      const options = {
        key: "rzp_test_1DP5mmOlF5G5ag",
        amount: order.amount,
        currency: "INR",
        name: "Surpriselly",
        description: "Test Transaction",
        order_id: order.id,
        handler: function (response) {
          alert("Payment successful!");
          // Optional: save to MongoDB
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#7e22ce",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Checkout Error:", err);
    }
  };

  return (
     <div className="max-w-7xl mx-auto px-4 py-10 mt-[8rem] lg:mt-[8rem]">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto h-48"
          />
          <p className="mt-6 text-gray-500 text-lg">Your cart is empty.</p>
        </div>
      ) : (
       <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-8 relative">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">Items</h2>
              <button
                onClick={() => setShowModal(true)}
                className="text-red-600 text-sm hover:underline hover:cursor-pointer"
              >
                🗑 Remove All
              </button>
            </div>

            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.div
                  key={item.slug || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-row gap-10 lg:gap-10 bg-white border rounded-xl shadow hover:shadow-lg transition p-4"
                >
                  <img
                    src={item.img || item.image || "/placeholder.png"}
                    alt={item.title}
                    className="h-28 w-28 rounded-md object-cover border"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                   <p className="text-purple-600 mt-1">
  ₹{item.price} × {item.qty} = ₹{(item.price * item.qty).toFixed(2)}
</p>

  <div className="flex flex-row justify-between items-center ">
                    <div className="flex items-center mt-3 space-x-2">
                      <button
                        onClick={() => decrementQty(item.slug)}
                        className="h-6 w-6 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300 text-xl"
                      >
                        −
                      </button>
                      <span className="text-md font-medium">{item.qty}</span>
                      <button
                        onClick={() => incrementQty(item.slug)}
                        className="h-6 w-6 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300 text-xl"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.slug)}
                      className="text-red-500 text-sm mt-2 hover:underline"
                    >
                      Remove
                    </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary (Compact) */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
           className="bg-white backdrop-blur-md shadow-xl rounded-md p-5 sticky top-40 w-full h-fit max-w-xs lg:col-span-1 mx-auto lg:mx-0"
          >
            <h2 className="text-base font-semibold text-gray-800 mb-2">
              Order Summary
            </h2>

            <div className="flex justify-between text-lg text-gray-600 mb-1">
              <span>Total Items:</span>
              <span>{cart.reduce((sum, i) => sum + (i.qty || 1), 0)}</span>
            </div>

            <div className="flex justify-between text-lg font-bold text-purple-700">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              className="mt-3 w-full py-1 bg-purple-600 text-white rounded text-lg font-medium hover:bg-purple-700 transition"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </motion.div>
        </div>
      )}

      {/* Remove All Confirmation Modal */}

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-transparent backdrop-blur-xs bg-opacity-40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm"
            >
              <h3 className="text-lg font-semibold mb-4 text-center ">
                Remove All Items?
              </h3>
              <p className="text-sm text-gray-600 text-center mb-6">
                Are you sure you want to clear your cart?
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded hover:cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRemoveAll}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded hover:cursor-pointer"
                >
                  Yes, Remove All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
