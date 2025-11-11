"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import auth_service from "../dashboard/users/services/auth.service";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Usuario logueado con permisos
  const router = useRouter();
  const pathname = usePathname();

  // Verifica token al montar el provider
  useEffect(() => {
    const verifyToken = async () => {
      const token = getCookie("token");

      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      try {
        const res = await auth_service.me();

        if (res && res.user) {
          setIsAuthenticated(true);
          setUser(res.user);

          // Redirige a dashboard si estaba en login
          if (pathname === "/login/") {
            router.replace("/dashboard/main");
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
          auth_service.clearAuthCookies();
          router.replace("/login");
        }
      } catch (error) {
        console.error("Error al verificar el token:", error);
        setIsAuthenticated(false);
        setUser(null);
        deleteCookie("token");
      }
    };
    verifyToken();
  }, []);

  const login = async (formData) => {
    try {
      const data = await auth_service.login(formData);

      if (data.error) throw new Error(data.message);

      setCookie("token", data.token, { maxAge: 300 * 60, path: "/" });

      const userData = await auth_service.me();

      if (userData.error) throw new Error("Error al obtener información del usuario");

      setCookie("user", JSON.stringify(userData.user), { maxAge: 300 * 60, path: "/" });
      setUser(userData.user);

      if (userData.rol) {
        setCookie("rol", userData.rol, { maxAge: 300 * 60, path: "/" });
      }

      setIsAuthenticated(true);
      router.replace("/dashboard/main");

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Usuario o contraseña incorrectos.",
      };
    }
  };

  const logout = async () => {
    try {
      await auth_service.logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      auth_service.clearAuthCookies();
      setIsAuthenticated(false);
      setUser(null);
      setTimeout(() => router.replace("/login/"), 300);
    }
  };

  // Función para verificar permisos
  const hasPermission = (permiso) => {
    // Obtener rol desde user o cookie
    const rol = user?.rol || getCookie("rol");
    if (!rol) return false;

    // Admin tiene todos los permisos
    if (rol === "administrador") return true;

    // Verifica permisos específicos
    return Array.isArray(user?.permisos) && user.permisos.includes(permiso);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};
