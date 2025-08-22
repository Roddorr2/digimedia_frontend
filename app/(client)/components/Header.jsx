'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import Image from 'next/image';
import { useEffect } from 'react'; // ya lo tienes, pero si no, importa useEffect también.

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
    <header className="header">
      <div className="contenidoHeader">
        <div className="logoHeader flex items-center">
          <Link href="/" onClick={closeMenu}>
            <img
              src="/headerFooter/logoblanco.webp"
              alt="Logo de digimedia color blanco con fondo oscuro"
              width="190px"
              height="65px"
              className="my-auto"
            />
          </Link>
        </div>

        <div className="seccionesHeader">
          <input type="checkbox" id="menucheckbox" checked={menuOpen} onChange={() => setMenuOpen(!menuOpen)} />
          <label htmlFor="menucheckbox">
            <img src="/headerFooter/menu.webp" alt="menú" className="Icono de menu de 3 lineas color blanco y fondo oscuro" width="25" height="25" />
          </label>
          <ul className="menuHorizontal">
            <li className={isActive('/') ? 'active' : ''} onClick={closeMenu}>
              <Link href="/">Inicio</Link>
            </li>
            <li className={isActive('/servicios') ? 'active' : ''} onClick={() => setIsServiceOpen(!isServiceOpen)}>
              <p className="flex items-center gap-1" style={{ display: 'flex !important', alignItems: 'center !important' }}>
                Servicios <ChevronDown className="w-4 h-4" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
              </p>
              {isServiceOpen && (
                <ul className="menuVertical">
                  <li className={isActive('/servicios/desing-desarrollo') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/servicios/desing-desarrollo">Diseño y Desarrollo Web</Link>
                  </li>
                  <li className={isActive('/servicios/gestion-redes') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/servicios/gestion-redes">Gestión de Redes Sociales</Link>
                  </li>
                  <li className={isActive('/servicios/marketing-gestion') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/servicios/marketing-gestion">Marketing y Gestión Digital</Link>
                  </li>
                  <li className={isActive('/servicios/branding-desing') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/servicios/branding-desing">Branding y Diseño</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={isActive('/nosotros') ? 'active' : ''} onClick={closeMenu}>
              <Link href="/nosotros">Nosotros</Link>
            </li>
            <li className={isActive('/blog') || isActive('/preguntas') || isActive('/contactanos') ? 'active' : ''} 
                onClick={() => setIsMoreOpen(!isMoreOpen)}>
              <p className="flex items-center gap-1" style={{ display: 'flex !important', alignItems: 'center !important' }}>
                Más <ChevronDown className="w-4 h-4" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
              </p>
              {isMoreOpen && (
                <ul className="menuVertical">
                  <li className={isActive('/blog') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li className={isActive('/preguntas') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/preguntas">Preguntas Frecuentes</Link>
                  </li>
                  <li className={isActive('/contactanos') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/contactanos">Contacto</Link>
                  </li>
                </ul>
              )}
            </li>
            {!isMobile && (
                <li className={isActive('/login') ? 'active' : ''} onClick={closeMenu}>
              <Link href="/login">Ingresar</Link>
              </li>
               )} 
          </ul>
        </div>
      </div>
    </header>
  );
}
