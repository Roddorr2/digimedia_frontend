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

    // En caso de estar logeado y esta en /login -> redirigir a /dashboard/main
    if (token && pathname === "/login/") {
      router.replace("/dashboard/main");
    }
  }, [pathname]);

  // EN CASO DE SER NECESARIO, DESCOMENTAR ESTAS FUNCIONES

  // const login = (token) => {
  //   document.cookie = `token=${token}; path=/;`;
  //   setIsAuthenticated(true);
  //   router.replace("/dashboard/main");
  // };

  // const logout = () => {
  //   deleteCookie("token");
  //   setIsAuthenticated(false);
  //   router.replace("/login");
  // };

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
