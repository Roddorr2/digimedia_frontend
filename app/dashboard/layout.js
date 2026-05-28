"use client";
import Link from "next/link";
import AuthGuard from "./components/AuthGuard";
import auth_service from "./users/services/auth.service";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { DisplayNameContext } from "./components/DisplayNameContext";
import { dashboardLinks } from "./dashboardsLinks/dashboardsLinks";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import { LogOut } from "lucide-react";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  // Estado para el sidebar (inicia cerrado)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Info usuario y rol
  const userRole = getCookie("rol") || "Usuario";
  const userData = getCookie("user")
    ? JSON.parse(getCookie("user"))
    : { name: "Usuario" };
  const empleadoData = getCookie("empleado")
    ? JSON.parse(getCookie("empleado"))
    : null;

  const [displayName, setDisplayName] = useState(
    empleadoData?.nombre || userData?.name || "Usuario",
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Estado y lógica del Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) {
        return saved === "true";
      }
      // Si no hay guardado, usar preferencia del navegador
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
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

  return (
    <DisplayNameContext.Provider
      value={{ displayName, updateDisplayName: setDisplayName }}
    >
      <AuthGuard>
        <div className="flex flex-col h-screen dark:bg-gray-900 dark:text-white">
          {/* HEADER */}
          <header className="relative bg-[#8c52ff] dark:bg-[#6b3acb] h-16 flex items-center px-3 sm:px-6 lg:px-10 py-2 z-10">
            <Link
              href="/"
              className="flex items-center flex-shrink-0 h-full z-10"
            >
              <Image
                src="/dashboard/logo.webp"
                alt="Logo"
                width={160}
                height={80}
                className="w-auto h-10 sm:h-12"
              />
            </Link>

            <h1 className="flex-1 text-center text-white font-semibold text-sm sm:text-xl lg:text-3xl truncate px-4">
              <span className="hidden sm:inline">SECCIÓN: </span>
              {pathname.slice(pathname.indexOf("/", 1) + 1).replace("/", "").toUpperCase()}
            </h1>
          </header>

          <div className="flex w-full overflow-hidden h-screen">
            {/* SIDEBAR CON AUTO-EXPANSIÓN */}
            <div
              onMouseEnter={() => setIsSidebarOpen(true)}
              onMouseLeave={() => setIsSidebarOpen(false)}
              className={`relative min-h-screen flex flex-col shrink-0 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 pt-5 ${
                isSidebarOpen ? "w-64" : "w-20"
              }`}
            >
              {/* Navegación principal */}
              <nav className="mb-auto overflow-y-auto">
                <ul className="flex flex-col">
                  {dashboardLinks.map((item, index) => {
                    const hasPermission =
                      !item.permission ||
                      auth_service.hasPermission(item.permission);

                    const hasRole =
                      !item.role || auth_service.hasRole(item.role);

                    if (hasPermission && hasRole) {
                      return (
                        <SidebarLink
                          key={index}
                          title={item.title}
                          href={item.href}
                          icon={item.icon}
                          isSidebarOpen={isSidebarOpen}
                        />
                      );
                    }
                  })}
                </ul>
              </nav>

              {/* Divider */}
              <div className="h-px w-full bg-gray-300 dark:bg-gray-700 my-2"></div>

              {/* Sección de usuario */}
              <div className="px-[15%]">
                <div className="flex items-center py-2 px-0 cursor-default">
                  <div className="p-2 flex flex-shrink-0">
                    <PersonIcon className="text-[#8c52ff] dark:text-[#6b3acb] !text-[25px]" />
                  </div>
                  <span
                    className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${
                      isSidebarOpen
                        ? "opacity-100 max-w-[190px] ml-0"
                        : "opacity-0 max-w-0"
                    }`}
                  >
                    <span className="block font-normal text-sm">
                      {displayName}
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                      ({userRole})
                    </span>
                  </span>
                </div>

                {/* Botón logout */}
                <div
                  onClick={async () => { setIsLoggingOut(true); await logout(); }}
                  className="flex items-center py-2 px-0 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  <div className="p-2 flex flex-shrink-0">
                    <LogOut className="text-[#ff037f] dark:text-[#bf025f] text-[25px]" />
                  </div>
                  <span
                    className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${
                      isSidebarOpen
                        ? "opacity-100 max-w-[190px] ml-0"
                        : "opacity-0 max-w-0"
                    }`}
                  >
                    {isLoggingOut ? "Cerrando..." : "Cerrar Sesión"}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gray-300 dark:bg-gray-700 my-6"></div>

              {/* Selector de tema */}
              <div className="flex items-center flex-col pb-24">
                <span
                  className={`block py-2 font-bold transition-all duration-300 whitespace-nowrap overflow-hidden ${
                    isSidebarOpen ? "opacity-100 max-h-10" : "opacity-0 max-h-0"
                  }`}
                >
                  Dark Mode
                </span>
                <div
                  className={`transition-all duration-300 ${
                    isSidebarOpen ? "mx-10" : "mx-4"
                  }`}
                >
                  <label className="relative inline-block w-[60px] h-[34px]">
                    <input
                      type="checkbox"
                      className="opacity-0 w-0 h-0 peer"
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                    />
                    <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 dark:bg-[#6b3acb] transition-all duration-400 rounded-[34px] before:content-['☀️'] before:absolute before:h-0 before:w-0 before:left-[-0px] before:top-[17px] before:leading-[0px] before:transition-all before:duration-400 peer-checked:before:content-['🌑'] peer-checked:before:translate-x-[26px] peer-checked:before:left-1"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* CONTENIDO PRINCIPAL */}
            {children}
          </div>
        </div>
      </AuthGuard>
    </DisplayNameContext.Provider>
  );
}

function SidebarLink({ href, title, icon: Icon, isSidebarOpen }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <li
      className={`my-2 px-[15%] transition-colors ${
        isActive
          ? "bg-purple-100 dark:bg-purple-900/30"
          : "hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
    >
      <Link href={href} className="flex items-center py-2 no-underline">
        <div className="p-2 flex relative flex-shrink-0">
          {Icon && (
            <Icon
              className={`text-[25px] ${
                isActive
                  ? "text-[#8c52ff] dark:text-[#a78bfa]"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            />
          )}
        </div>
        <span
          className={`whitespace-nowrap transition-all duration-300 inline-block overflow-hidden ${
            isSidebarOpen
              ? "opacity-100 max-w-[190px] ml-0"
              : "opacity-0 max-w-0"
          } ${
            isActive
              ? "font-semibold text-[#8c52ff] dark:text-[#a78bfa]"
              : "text-gray-800 dark:text-white"
          }`}
        >
          {title}
        </span>
      </Link>
    </li>
  );
}
