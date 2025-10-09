"use client";
import Link from "next/link";
import AuthGuard from "./components/AuthGuard";
import auth_service from "./users/services/auth.service";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";

import { DisplayNameContext } from "./components/DisplayNameContext";
import AddIcon from "@mui/icons-material/Add";
import { dashboardLinks } from "./dashboardsLinks/dashboardsLinks";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // Info usuario y rol
  const userRole = getCookie("rol") || "Usuario";
  const userData = getCookie("user")
    ? JSON.parse(getCookie("user"))
    : { name: "Usuario" };
  const empleadoData = getCookie("empleado")
    ? JSON.parse(getCookie("empleado"))
    : null;

  const [displayName, setDisplayName] = useState(
    empleadoData?.nombre || userData?.name || "Usuario"
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Estado y lógica del Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await auth_service.logout();
      setTimeout(() => auth_service.logoutClient(router), 350);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setTimeout(() => auth_service.logoutClient(router), 1000);
    }
  };

  return (
    <DisplayNameContext.Provider
      value={{ displayName, updateDisplayName: setDisplayName }}
    >
      <AuthGuard>
        <div className="flex flex-col h-screen dark:bg-gray-900 dark:text-white">
          <header className="bg-[#8c52ff] dark:bg-[#6b3acb] h-16 flex items-center justify-between px-10 py-2">
            <img src="/dashboard/logo.webp" className="h-full" alt="Logo" />
            <h1 className="text-3xl text-white font-semibold">
              SECCIÓN:{" "}
              {pathname.slice(pathname.indexOf("/", 1) + 1, -1).toUpperCase()}
            </h1>
          </header>

          <div className="flex w-full overflow-hidden h-screen">
            <div className="flex flex-col shrink-0 p-2 bg-[#e8e8e8] dark:bg-gray-800 text-black dark:text-white justify-between">
              <nav className="flex-1 overflow-y-auto mt-3 pr-1">
                {/* Logica de links dinamicos en dashboards */}
                <ul className="flex flex-col gap-1">
                  {dashboardLinks.map((item, index) => {
                    const hasPermission =
                      !item.permission ||
                      auth_service.hasPermission(item.permission);

                    const hasRole =
                      !item.role || auth_service.hasRole(item.role);

                    if (hasPermission && hasRole) {
                      return (
                        <TableLink
                          key={index}
                          title={item.title}
                          href={item.href}
                        />
                      );
                    }
                  })}
                  {/* {auth_service.hasRole('administrador') && userData.email==process.env.NEXT_PUBLIC_ADMIN_WHASAPP &&(
                    <TableLink title="Autenticación WhatsApp" href="/dashboard/autenticacion-whasapp" />
                  )}  */}
                </ul>
              </nav>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg transition"
              >
                {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </button>

              <div>
                <div className="flex mt-auto gap-2 items-center">
                  <PersonIcon className="text-[#8c52ff] dark:text-[#6b3acb] w-[50px]" />
                  <p className="font-bold">
                    Bienvenido
                    <span className="font-normal block">
                      {displayName} ({userRole})
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="bg-[#ff037f] dark:bg-[#bf025f] text-white px-4 py-3 rounded-full my-3 transition-all duration-300 hover:bg-[#e0036f] dark:hover:bg-[#9c024d] disabled:opacity-70"
                  >
                    {isLoggingOut ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Cerrando sesión...
                      </span>
                    ) : (
                      "Cerrar sesión"
                    )}
                  </button>
                </div>
              </div>
            </div>

            {children}
          </div>
        </div>
      </AuthGuard>
    </DisplayNameContext.Provider>
  );
}

function TableLink({ href, title }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`flex gap-2 items-center rounded-lg px-4 py-3 
          hover:bg-gray-300 dark:hover:bg-gray-700 
          ${isActive ? "bg-gray-400 dark:bg-gray-600 font-bold" : ""}`}
      >
        <AddIcon className="text-[#8c52ff] dark:text-[#6b3acb] w-[50px]" />
        {title}
      </Link>
    </li>
  );
}
