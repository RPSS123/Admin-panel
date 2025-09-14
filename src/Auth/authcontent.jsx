import React, { createContext, useContext, useState } from "react";
import api from "../API/axios";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  async function login(email, password) {
    // Adjust to your real endpoint payload/shape
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <AuthCtx.Provider value={{ token, login, logout, isAuthed: !!token }}>
      {children}
    </AuthCtx.Provider>
  );
}