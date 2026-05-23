"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import { ChevronDown, UserRound } from "lucide-react";
import Image from "next/image";

import { useAuth } from "@/app/context/AuthContext";
import { dashboardLinks } from "@/app/dashboard/dashboardsLinks/dashboardsLinks";
import auth_service from "@/app/dashboard/users/services/auth.service";

export default function Header2() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);
  const { isAuthenticated, logout } = useAuth();

  const filterLinks = dashboardLinks.filter((item) => {
    const hasPermission =
      !item.permission || auth_service.hasPermission(item.permission);
    const hasRole = !item.role || auth_service.hasRole(item.role);
    return hasPermission && hasRole;
  });

  const isActive = (path) => pathname === path || pathname === `${path}/`;

  const toggleSubmenu = (name) => {
    setOpenSubmenu((prev) => (prev === name ? null : name));
  };

  // Detectar mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 10 || document.documentElement.scrollTop > 10,
      );
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  

  // Bloquear scroll del body con menú abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Cerrar al click fuera
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenSubmenu(null);
        if (menuOpen) closeMenu();
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenSubmenu(null);
    const menucheckbox = document.getElementById("menucheckbox");
    if (menucheckbox) menucheckbox.checked = false;
  };

  // Estilo inline para submenús en mobile (acordeón)
  const submenuStyle = (name) => {
    if (!isMobile) return {};
    return openSubmenu === name
      ? {
          position: "static",
          maxHeight: "400px",
          pointerEvents: "auto",
          padding: "4px 0",
        }
      : {
          position: "static",
          maxHeight: "0",
          pointerEvents: "none",
          padding: "0",
          overflow: "hidden",
        };
  };

  return (
    <header
      ref={menuRef}
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
    >
      <div className={styles.contenidoHeader}>
        <div className={`${styles.logoHeader} flex items-center`}>
          <Link href="/" onClick={closeMenu}>
            <Image
              src="/headerFooter/digimedia-marketing.svg"
              alt="Logo Digimedia Marketing"
              width={200}
              height={85}
              className="my-auto"
              sizes="200px"
            />
          </Link>
        </div>

        <div className={styles.seccionesHeader}>
          {isAuthenticated && (
            <Link href="/dashboard/main" className={styles.userButton}>
              <UserRound size={20} strokeWidth={2.5} />
            </Link>
          )}

          <input
            type="checkbox"
            id="menucheckbox"
            className={styles.menucheckbox}
            checked={menuOpen}
            onChange={() => {
              setMenuOpen((prev) => !prev);
              if (menuOpen) setOpenSubmenu(null);
            }}
          />
          <label htmlFor="menucheckbox">
            <Image
              src="/headerFooter/menu-principal.webp"
              alt="icono de menú principal"
              title="icono de menú principal"
              width={25}
              height={25}
              priority
            />
          </label>

          <ul
            className={`${styles.menuHorizontal} ${menuOpen ? styles.menuOpen : ""}`}
          >
            {/* Inicio */}
            <li
              className={isActive("/") ? styles.active : ""}
              onClick={closeMenu}
            >
              <Link href="/">Inicio</Link>
            </li>

            {/* Servicios */}
            <li
              className={`cursor-pointer ${isActive("/servicios") ? styles.active : ""}`}
              onClick={() => toggleSubmenu("services")}
            >
              <p className="flex justify-center items-center gap-1">
                Servicios{" "}
                <ChevronDown
                  className={`w-4 h-4 ${styles.chevron} ${openSubmenu === "services" ? styles.chevronOpen : ""}`}
                />
              </p>
              <ul
                className={`${styles.menuVertical} ${styles.menuVerticalDark} ${!isMobile && openSubmenu === "services" ? styles.submenuVisible : ""}`}
                style={submenuStyle("services")}
              >
                <li
                  className={
                    isActive("/servicios/desing-desarrollo")
                      ? styles["active-sub"]
                      : ""
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    closeMenu();
                  }}
                >
                  <Link href="/servicios/desing-desarrollo">
                    Diseño y Desarrollo Web
                  </Link>
                </li>
                <li
                  className={
                    isActive("/servicios/gestion-redes")
                      ? styles["active-sub"]
                      : ""
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    closeMenu();
                  }}
                >
                  <Link href="/servicios/gestion-redes">
                    Gestión de Redes Sociales
                  </Link>
                </li>
                <li
                  className={
                    isActive("/servicios/marketing-gestion")
                      ? styles["active-sub"]
                      : ""
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    closeMenu();
                  }}
                >
                  <Link href="/servicios/marketing-gestion">
                    Marketing y Gestión Digital
                  </Link>
                </li>
                <li
                  className={
                    isActive("/servicios/branding-desing")
                      ? styles["active-sub"]
                      : ""
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    closeMenu();
                  }}
                >
                  <Link href="/servicios/branding-desing">
                    Branding y Diseño
                  </Link>
                </li>
              </ul>
            </li>

            {/* Nosotros */}
            <li
              className={isActive("/nosotros") ? styles.active : ""}
              onClick={closeMenu}
            >
              <Link href="/nosotros">Nosotros</Link>
            </li>

            {/* Blog */}
            <li
              className={isActive("/blog") ? styles.active : ""}
              onClick={closeMenu}
            >
              <Link href="/blog">Blog</Link>
            </li>

            {/* Más */}
            <li
              className={`cursor-pointer ${
                isActive("/preguntas") ||
                isActive("/contactanos") ||
                (!isAuthenticated && isActive("/login"))
                  ? styles.active
                  : ""
              }`}
              onClick={() => toggleSubmenu("more")}
            >
              <p className="flex justify-center items-center gap-1">
                Más{" "}
                <ChevronDown
                  className={`w-4 h-4 ${styles.chevron} ${openSubmenu === "more" ? styles.chevronOpen : ""}`}
                />
              </p>
              <ul
                className={`${styles.menuVertical} ${styles.menuVerticalDark} ${styles.menuVerticalRight} ${!isMobile && openSubmenu === "more" ? styles.submenuVisible : ""}`}
                style={submenuStyle("more")}
              >
                <li
                  className={isActive("/preguntas") ? styles["active-sub"] : ""}
                  onClick={(e) => {
                    e.stopPropagation();
                    closeMenu();
                  }}
                >
                  <Link href="/preguntas">Preguntas Frecuentes</Link>
                </li>
                <li
                  className={
                    isActive("/contactanos") ? styles["active-sub"] : ""
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    closeMenu();
                  }}
                >
                  <Link href="/contactanos">Contacto</Link>
                </li>
                {!isAuthenticated && (
                  <li
                    className={isActive("/login") ? styles["active-sub"] : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      closeMenu();
                    }}
                  >
                    <Link href="/login">Ingresar</Link>
                  </li>
                )}
              </ul>
            </li>

            {/* Panel (solo autenticado) */}
            {isAuthenticated && (
              <li
                className={`cursor-pointer ${styles.panelItem} ${isActive("/login") || isActive("/dashboard/main") ? styles.active : ""}`}
                onClick={() => toggleSubmenu("panel")}
              >
                <p className="flex items-center gap-1">
                  Panel{" "}
                  <ChevronDown
                    className={`w-4 h-4 ${styles.chevron} ${openSubmenu === "panel" ? styles.chevronOpen : ""}`}
                  />
                </p>
                <ul
                  className={`${styles.menuVertical} ${styles.menuVerticalRight} ${!isMobile && openSubmenu === "panel" ? styles.submenuVisible : ""}`}
                  style={submenuStyle("panel")}
                >
                  {filterLinks.map((link) => (
                    <li
                      key={link.href}
                      className={
                        isActive(link.href) ? styles["active-sub"] : ""
                      }
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          e.stopPropagation();
                          closeMenu();
                        }}
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        closeMenu();
                        logout();
                      }}
                    >
                      Cerrar sesión
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
