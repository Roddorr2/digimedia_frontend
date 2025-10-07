"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";

// Creeacion del contexto
const AuthContext = createContext();

// Hook para reutilizacion en cualquier componente
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = getCookie("token");
    setIsAuthenticated(!!token);
  }, [pathname]);

  const login = (token) => {
    document.cookie = `token=${token}; path=/;`;
    setIsAuthenticated(true);
    router.replace("/dashboard/main");
  };

  const logout = () => {
    deleteCookie("token");
    setIsAuthenticated(false);
    router.replace("/login");
  };

  if(isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
