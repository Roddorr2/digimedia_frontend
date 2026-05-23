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
  const [touchedItem, setTouchedItem] = useState(null);
  const menuRef = useRef(null);
  const { isAuthenticated, logout } = useAuth();

  const filterLinks = dashboardLinks.filter((item) => {
    const hasPermission =
      !item.permission || auth_service.hasPermission(item.permission);
    const hasRole = !item.role || auth_service.hasRole(item.role);
    return hasPermission && hasRole;
  });

  const isActive = (path) => pathname === path || pathname === `${path}/`;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
    const cb = document.getElementById("menucheckbox");
    if (cb) cb.checked = false;
  };

  const handleSubmenuClick = (name) => {
    setOpenSubmenu((prev) => (prev === name ? null : name));
  };

  const handleMouseLeave = () => {
    if (!isMobile) setOpenSubmenu(null);
  };

  // Inline style — maneja desktop Y mobile sin depender de clase CSS
  const submenuStyle = (name) => {
    if (isMobile) {
      return openSubmenu === name
        ? {
            position: "static",
            maxHeight: "400px",
            pointerEvents: "auto",
            padding: "4px 0",
            overflow: "visible",
          }
        : {
            position: "static",
            maxHeight: "0",
            pointerEvents: "none",
            padding: "0",
            overflow: "hidden",
          };
    } else {
      return openSubmenu === name
        ? {
            opacity: "1",
            visibility: "visible",
            transform: "translateY(0)",
            pointerEvents: "auto",
          }
        : {};
    }
  };

  // Feedback táctil en mobile
  const touchStyle = (id) => ({
    backgroundColor: touchedItem === id ? "rgba(255,255,255,0.18)" : "",
    transition: "background-color 0.15s ease",
  });

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
              style={touchStyle("inicio")}
              onTouchStart={() => setTouchedItem("inicio")}
              onTouchEnd={() => {
                setTouchedItem(null);
                closeMenu();
              }}
              onClick={closeMenu}
            >
              <Link href="/">Inicio</Link>
            </li>

            {/* Servicios */}
            <li
              className={`cursor-pointer ${isActive("/servicios") ? styles.active : ""}`}
              style={touchStyle("services")}
              onTouchStart={() => setTouchedItem("services")}
              onTouchEnd={() => setTouchedItem(null)}
              onClick={() => handleSubmenuClick("services")}
              onMouseLeave={handleMouseLeave}
            >
              <p className="flex justify-center items-center gap-1">
                Servicios{" "}
                <ChevronDown
                  className={`w-4 h-4 ${styles.chevron} ${openSubmenu === "services" ? styles.chevronOpen : ""}`}
                />
              </p>
              <ul
                className={`${styles.menuVertical} ${styles.menuVerticalDark}`}
                style={submenuStyle("services")}
              >
                <li
                  className={
                    isActive("/servicios/desing-desarrollo")
                      ? styles["active-sub"]
                      : ""
                  }
                  style={touchStyle("s1")}
                  onTouchStart={() => setTouchedItem("s1")}
                  onTouchEnd={() => setTouchedItem(null)}
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
                  style={touchStyle("s2")}
                  onTouchStart={() => setTouchedItem("s2")}
                  onTouchEnd={() => setTouchedItem(null)}
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
                  style={touchStyle("s3")}
                  onTouchStart={() => setTouchedItem("s3")}
                  onTouchEnd={() => setTouchedItem(null)}
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
                  style={touchStyle("s4")}
                  onTouchStart={() => setTouchedItem("s4")}
                  onTouchEnd={() => setTouchedItem(null)}
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
              style={touchStyle("nosotros")}
              onTouchStart={() => setTouchedItem("nosotros")}
              onTouchEnd={() => {
                setTouchedItem(null);
                closeMenu();
              }}
              onClick={closeMenu}
            >
              <Link href="/nosotros">Nosotros</Link>
            </li>

            {/* Blog */}
            <li
              className={isActive("/blog") ? styles.active : ""}
              style={touchStyle("blog")}
              onTouchStart={() => setTouchedItem("blog")}
              onTouchEnd={() => {
                setTouchedItem(null);
                closeMenu();
              }}
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
              style={touchStyle("more")}
              onTouchStart={() => setTouchedItem("more")}
              onTouchEnd={() => setTouchedItem(null)}
              onClick={() => handleSubmenuClick("more")}
              onMouseLeave={handleMouseLeave}
            >
              <p className="flex justify-center items-center gap-1">
                Más{" "}
                <ChevronDown
                  className={`w-4 h-4 ${styles.chevron} ${openSubmenu === "more" ? styles.chevronOpen : ""}`}
                />
              </p>
              <ul
                className={`${styles.menuVertical} ${styles.menuVerticalDark} ${styles.menuVerticalRight}`}
                style={submenuStyle("more")}
              >
                <li
                  className={isActive("/preguntas") ? styles["active-sub"] : ""}
                  style={touchStyle("m1")}
                  onTouchStart={() => setTouchedItem("m1")}
                  onTouchEnd={() => setTouchedItem(null)}
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
                  style={touchStyle("m2")}
                  onTouchStart={() => setTouchedItem("m2")}
                  onTouchEnd={() => setTouchedItem(null)}
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
                    style={touchStyle("m3")}
                    onTouchStart={() => setTouchedItem("m3")}
                    onTouchEnd={() => setTouchedItem(null)}
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
                style={touchStyle("panel")}
                onTouchStart={() => setTouchedItem("panel")}
                onTouchEnd={() => setTouchedItem(null)}
                onClick={() => handleSubmenuClick("panel")}
                onMouseLeave={handleMouseLeave}
              >
                <p className="flex items-center gap-1">
                  Panel{" "}
                  <ChevronDown
                    className={`w-4 h-4 ${styles.chevron} ${openSubmenu === "panel" ? styles.chevronOpen : ""}`}
                  />
                </p>
                <ul
                  className={`${styles.menuVertical} ${styles.menuVerticalRight}`}
                  style={submenuStyle("panel")}
                >
                  {filterLinks.map((link) => (
                    <li
                      key={link.href}
                      className={
                        isActive(link.href) ? styles["active-sub"] : ""
                      }
                      style={touchStyle(link.href)}
                      onTouchStart={() => setTouchedItem(link.href)}
                      onTouchEnd={() => setTouchedItem(null)}
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
                  <li
                    style={touchStyle("logout")}
                    onTouchStart={() => setTouchedItem("logout")}
                    onTouchEnd={() => setTouchedItem(null)}
                  >
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
