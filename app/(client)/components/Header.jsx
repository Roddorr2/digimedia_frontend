'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Header.module.css';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

import { useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { dashboardLinks } from '@/app/dashboard/dashboardsLinks/dashboardsLinks';
import auth_service from '@/app/dashboard/users/services/auth.service';

export default function Header2() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  // Filtrar los links basados en permisos y roles
  const filterLinks = dashboardLinks.filter((item) => {
    const hasPermission =
      !item.permission || auth_service.hasPermission(item.permission);
    const hasRole = !item.role || auth_service.hasRole(item.role);
    return hasPermission && hasRole;
  });

  const isActive = (path) => pathname === path || pathname === `${path}/`;

  const closeMenu = () => {
    setMenuOpen(false);
    setIsServiceOpen(false);
    setIsMoreOpen(false);
    setIsPanelOpen(false);

    const menucheckbox = document.getElementById('menucheckbox');
    if (menucheckbox) {
      menucheckbox.checked = false;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.contenidoHeader}>
        <div className={`${styles.logoHeader} flex items-center`}>
          <Link href="/" onClick={closeMenu}>
            <Image
              src="/headerFooter/logoblanco1.webp"
              alt="Logo de digimedia color blanco con fondo oscuro"
              width={190}
              height={65}
              className="my-auto"
              decoding="async"
              priority={true}
            />
          </Link>
        </div>

        <div className={styles.seccionesHeader}>
          <input
            type="checkbox"
            id="menucheckbox"
            className={styles.menucheckbox}
            onChange={() => setMenuOpen(!menuOpen)}
          />
          <label htmlFor="menucheckbox">
            <Image
              src="/headerFooter/menu.avif"
              alt="Icono de menu de 3 lineas color blanco y fondo oscuro"
              width={25}
              height={25}
              priority
            />
          </label>
          <ul className={styles.menuHorizontal}>
            <li
              className={isActive('/') ? styles.active : ''}
              onClick={closeMenu}
            >
              <Link href="/">Inicio</Link>
            </li>
            <li
              className={`cursor-pointer ${
                isActive('/servicios') ? styles.active : ''
              }`}
              onClick={() => setIsServiceOpen(!isServiceOpen)}
            >
              <p
                className="flex justify-center items-center gap-1"
                style={{
                  display: 'flex !important',
                  alignItems: 'center !important',
                }}
              >
                Servicios{' '}
                <ChevronDown
                  className="w-4 h-4"
                  style={{ display: 'inline-block', verticalAlign: 'middle' }}
                />
              </p>
              {isServiceOpen && (
                <ul className={styles.menuVertical}>
                  <li
                    className={
                      isActive('/servicios/desing-desarrollo')
                        ? styles['active-sub']
                        : ''
                    }
                    onClick={closeMenu}
                  >
                    <Link href="/servicios/desing-desarrollo">
                      Diseño y Desarrollo Web
                    </Link>
                  </li>
                  <li
                    className={
                      isActive('/servicios/gestion-redes')
                        ? styles['active-sub']
                        : ''
                    }
                    onClick={closeMenu}
                  >
                    <Link href="/servicios/gestion-redes">
                      Gestión de Redes Sociales
                    </Link>
                  </li>
                  <li
                    className={
                      isActive('/servicios/marketing-gestion')
                        ? styles['active-sub']
                        : ''
                    }
                    onClick={closeMenu}
                  >
                    <Link href="/servicios/marketing-gestion">
                      Marketing y Gestión Digital
                    </Link>
                  </li>
                  <li
                    className={
                      isActive('/servicios/branding-desing')
                        ? styles['active-sub']
                        : ''
                    }
                    onClick={closeMenu}
                  >
                    <Link href="/servicios/branding-desing">
                      Branding y Diseño
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className={isActive('/nosotros') ? styles.active : ''}
              onClick={closeMenu}
            >
              <Link href="/nosotros">Nosotros</Link>
            </li>
            <li
              className={`cursor-pointer ${
                isActive('/blog') ||
                isActive('/preguntas') ||
                isActive('/contactanos')
                  ? styles.active
                  : ''
              }`}
              onClick={() => setIsMoreOpen(!isMoreOpen)}
            >
              <p
                className="flex justify-center items-center gap-1"
                style={{
                  display: 'flex !important',
                  alignItems: 'center !important',
                }}
              >
                Más{' '}
                <ChevronDown
                  className="w-4 h-4"
                  style={{ display: 'inline-block', verticalAlign: 'middle' }}
                />
              </p>
              {isMoreOpen && (
                <ul className={styles.menuVertical}>
                  <li
                    className={isActive('/blog') ? styles['active-sub'] : ''}
                    onClick={closeMenu}
                  >
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li
                    className={
                      isActive('/preguntas') ? styles['active-sub'] : ''
                    }
                    onClick={closeMenu}
                  >
                    <Link href="/preguntas">Preguntas Frecuentes</Link>
                  </li>
                  <li
                    className={
                      isActive('/contactanos') ? styles['active-sub'] : ''
                    }
                    onClick={closeMenu}
                  >
                    <Link href="/contactanos">Contacto</Link>
                  </li>
                </ul>
              )}
            </li>
            {/* ----- Panel options ----- */}

            <li
              className={`cursor-pointer${
                isActive('/login') || isActive('/dashboard/main')
                  ? styles.active
                  : ''
              }`}
              onClick={() => setIsPanelOpen(!isPanelOpen)}
            >
              {isAuthenticated ? (
                <>
                  <p className="flex items-center gap-1">
                    Panel{' '}
                    <ChevronDown
                      className="w-4 h-4"
                      style={{
                        display: 'inline-block',
                        verticalAlign: 'middle',
                      }}
                    />
                  </p>

                  {isPanelOpen && (
                    <ul className={styles.menuVertical}>
                      {filterLinks.map((link) => (
                        <li
                          key={link.href}
                          className={
                            isActive(link.href) ? styles['active-sub'] : ''
                          }
                          // onClick={closeMenu}
                        >
                          <Link href={link.href} onClick={closeMenu}>
                            {link.title}
                          </Link>
                        </li>
                      ))}
                      <li
                        className={
                          isActive('/login') ? styles['active-sub'] : ''
                        }
                      >
                        <Link
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            closeMenu();
                            logout(); // viene del useAuth()
                          }}
                        >
                          Cerrar sesión
                        </Link>
                      </li>
                    </ul>
                  )}
                </>
              ) : (
                <Link href="/login/">Ingresar</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
