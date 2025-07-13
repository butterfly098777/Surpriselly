// components/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext(null);

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: "",
    avatar: "", // Can hold avatar URL
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
