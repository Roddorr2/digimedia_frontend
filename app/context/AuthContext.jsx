"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { setCookie } from "cookies-next/client";
import auth_service from "../dashboard/users/services/auth.service";

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

    // En caso de estar logeado y esta en /login -> redirigir a /dashboard/main
    if (token && pathname === "/login/") {
      router.replace("/dashboard/main");
    }
  }, [pathname]);

  const login = (token) => {
    setCookie("token", token, { maxAge: 30 * 24 * 60 * 60, path: "/" });
    setIsAuthenticated(true);
    router.replace("/dashboard/main");
  };

  const logout = async () => {
    try {
      await auth_service.logout();
    }catch(error){
      console.error("Error al cerrar sesión:", error);
    } finally {
      deleteCookie("token");
      setIsAuthenticated(false);
      setTimeout(() => router.replace("/login"), 300); // Pequeño retraso para mejorar UX
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
