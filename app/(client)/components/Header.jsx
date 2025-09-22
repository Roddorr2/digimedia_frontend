'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from "./Header.module.css"
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

import { useEffect } from 'react';

export default function Header2() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isActive = (path) => pathname === path || pathname === `${path}/`;

  const closeMenu = () => {
    setMenuOpen(false);
    setIsServiceOpen(false);
    setIsMoreOpen(false);

    const menucheckbox = document.getElementById("menucheckbox");
    if(menucheckbox){
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
              src="/headerFooter/logoblanco.webp"
              alt="Logo de digimedia color blanco con fondo oscuro"
              width={190}
              height={65}
              className="my-auto"
              loading='lazy'
              decoding='async'
            />
          </Link>
        </div>

        <div className={styles.seccionesHeader}>
          <input type="checkbox" id="menucheckbox" className={styles.menucheckbox} onChange={() => setMenuOpen(!menuOpen)} />
          <label htmlFor="menucheckbox">
            <img src="/headerFooter/menu.avif"  alt="Icono de menu de 3 lineas color blanco y fondo oscuro" width="25" height="25" />
          </label>
          <ul className={styles.menuHorizontal}>
            <li className={isActive('/') ? styles.active : ""} onClick={closeMenu}>
              <Link href="/">Inicio</Link>
            </li>
            <li className={`cursor-pointer ${isActive('/servicios') ? styles.active : ''}`} onClick={() => setIsServiceOpen(!isServiceOpen)}>
              <p className="flex justify-center items-center gap-1" style={{ display: 'flex !important', alignItems: 'center !important' }}>
                Servicios <ChevronDown className="w-4 h-4" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
              </p>
              {isServiceOpen && (
                <ul className={styles.menuVertical}>
                  <li className={isActive('/servicios/desing-desarrollo') ? styles["active-sub"] : ''} onClick={closeMenu}>
                    <Link href="/servicios/desing-desarrollo">Diseño y Desarrollo Web</Link>
                  </li>
                  <li className={isActive('/servicios/gestion-redes') ? styles["active-sub"] : ''} onClick={closeMenu}>
                    <Link href="/servicios/gestion-redes">Gestión de Redes Sociales</Link>
                  </li>
                  <li className={isActive('/servicios/marketing-gestion') ? styles["active-sub"] : ''} onClick={closeMenu}>
                    <Link href="/servicios/marketing-gestion">Marketing y Gestión Digital</Link>
                  </li>
                  <li className={isActive('/servicios/branding-desing') ? styles["active-sub"] : ''} onClick={closeMenu}>
                    <Link href="/servicios/branding-desing">Branding y Diseño</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={isActive('/nosotros') ? styles.active : ''} onClick={closeMenu}>
              <Link href="/nosotros">Nosotros</Link>
            </li>
            <li className={`cursor-pointer ${isActive('/blog') || isActive('/preguntas') || isActive('/contactanos') ? styles.active : ''}`} 
                onClick={() => setIsMoreOpen(!isMoreOpen)}>
              <p className="flex justify-center items-center gap-1" style={{ display: 'flex !important', alignItems: 'center !important' }}>
                Más <ChevronDown className="w-4 h-4" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
              </p>
              {isMoreOpen && (
                <ul className={styles.menuVertical}>
                  <li className={isActive('/blog') ? styles["active-sub"] : ''} onClick={closeMenu}>
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li className={isActive('/preguntas') ? styles["active-sub"] : ''} onClick={closeMenu}>
                    <Link href="/preguntas">Preguntas Frecuentes</Link>
                  </li>
                  <li className={isActive('/contactanos') ? styles["active-sub"] : ''} onClick={closeMenu}>
                    <Link href="/contactanos">Contacto</Link>
                  </li>
                </ul>
              )}
            </li>
            {!isMobile && (
                <li className={isActive('/login') ? styles.active : ''} onClick={closeMenu}>
              <Link href="/login">Ingresar</Link>
              </li>
              )} 
          </ul>
        </div>
      </div>
    </header>
  );
}
