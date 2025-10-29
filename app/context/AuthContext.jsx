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
    const verifyToken = async () => {
      const token = getCookie("token");

      // Si no existe un token - Usuario no autenticado
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        // Llama al endpoint protegido para verificar el token
        const res = await auth_service.me();

        if (res && res.user) {
          setIsAuthenticated(true);

          // Si el usuario esta en /login y ya esta autenticado, rederigir a dashboard
          if (pathname === "/login/") {
            router.replace("/dashboard/main");
          }
        } else {
          // Si el token no es valido, desauntenticar al usuario
          setIsAuthenticated(false);
          auth_service.clearAuthCookies();
          router.replace("/login");
        }
      } catch (error) {
        // Si el back devuelve un error, considerar al token invalido
        console.error("Error al verificar el token:", error);
        setIsAuthenticated(false);
        deleteCookie("token");
      }
    };
    verifyToken();
  }, []);

  const login = async (formData) => {
    try {
      // Llamada al servicio de login
      const data = await auth_service.login(formData);

      if (data.error) {
        throw new Error(data.message);
      }

      // Guardamos el token
      setCookie("token", data.token, {
        maxAge: 300 * 60, // 300 minutos - 5 horas (horas de trabajo/turno)
        path: "/",
      });

      // Obtner informacion del usuario
      const userData = await auth_service.me();

      if (userData.error) {
        throw new Error("Error al obtener información del usuario");
      }

      // Guardar info del usuario en cookies
      setCookie("user", JSON.stringify(userData.user), {
        maxAge: 300 * 60, // 300 minutos - 5 horas (horas de trabajo/turno)
        path: "/",
      });

      // Guardamos el rol en caso de existir
      if (userData.rol) {
        setCookie("rol", userData.rol, {
          maxAge: 300 * 60, // 300 minutos - 5 horas (horas de trabajo/turno)
          path: "/",
        });
      }

      // Actualizamos el estado
      setIsAuthenticated(true);

      // Redireccion al dashboard
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
      console.error("Error al cerrar sesion:", error);
    } finally {
      auth_service.clearAuthCookies();
      setIsAuthenticated(false);
      setTimeout(() => router.replace("/login/"), 300); // Pequeño retraso para mejorar UX
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
