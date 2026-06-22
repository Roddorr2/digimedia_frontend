'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, Search, TrendingUp, Palette } from 'lucide-react';

export default function Servicios() {
  // ==========================================
  // LÓGICA ORIGINAL DEL CARRUSEL MÓVIL
  // ==========================================
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % 4);
      } else {
        setCurrentSlide((prev) => (prev - 1 + 4) % 4);
      }
    }
  };

  const services = [
    {
      title: "Diseño y Desarrollo Web",
      desc: "Creamos sitios atractivos y funcionales que representan tu marca.",
      href: "/servicios/desing-desarrollo",
      imgSrc: "/image-home/diseno.webp",
      Icon: Globe
    },
    {
      title: "Gestión de redes sociales",
      desc: "Aumenta tu presencia online y conectamos con tu audiencia",
      href: "/servicios/gestion-redes",
      imgSrc: "/image-home/redessociales.png",
      Icon: Search
    },
    {
      title: "Marketing y Gestión Digital",
      desc: "Aumenta tu presencia en redes sociales con marketing digital.",
      href: "/servicios/marketing-gestion",
      imgSrc: "/image-home/marketingdigital.png",
      Icon: TrendingUp
    },
    {
      title: "Branding y Diseño",
      desc: "Construimos una identidad fuerte y memorable",
      href: "/servicios/branding-desing",
      imgSrc: "/image-home/branding.png",
      Icon: Palette
    }
  ];

  return (
    <section 
      className="w-full relative py-16 px-4 md:px-8 overflow-hidden" 
      id="services"
      style={{
        background: "linear-gradient(135deg, #100043 0%, #130049 40%, #410c89 100%)"
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        
        {/* ==========================================
            ENCABEZADO
            ========================================== */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-[#ffb800] font-extrabold text-3xl md:text-5xl mb-4 tracking-tight">
            Nuestros Servicios
          </h2>
          <p className="text-gray-200 text-[15px] md:text-lg leading-relaxed px-4 md:px-0">
            Digimedia es una empresa de marketing digital que impulsa{' '}
            <span className="text-[#ffb800] font-medium">emprendimientos en línea</span> mediante
            estrategias eficaces, enfocada en el{' '}
            <span className="text-[#ffb800] font-medium">crecimiento y desarrollo</span> de cada marca
          </p>
        </div>

        {/* ==========================================
            LAYOUT DESKTOP: Grid Asimétrico (7/12 y 5/12)
            ========================================== */}
        <div className="hidden md:grid grid-cols-12 gap-5 lg:gap-6">
          {services.map((service, index) => {
            // Evaluamos si es la tarjeta izquierda (larga) o la derecha (corta)
            const isWide = index % 2 === 0;

            return (
              <Link
                key={`desktop-${index}`}
                href={service.href}
                // Aquí aplicamos hover:border-[#ffb800] para el contorno amarillo
                className={`bg-[#000118] border border-transparent hover:border-[#ffb800] focus:border-[#ffb800] transition-all duration-300 rounded-2xl p-6 lg:p-8 flex flex-row items-center justify-between gap-4 group shadow-xl hover:-translate-y-1 ${
                  isWide ? 'md:col-span-7' : 'md:col-span-5'
                }`}
              >
                {/* Lado izquierdo (Textos) */}
                <div className="flex-1 flex flex-col justify-center text-left">
                  <div className="flex flex-row items-start lg:items-center gap-3 mb-2">
                    <div className="bg-[#ffffff10] p-1.5 rounded-md text-gray-300 group-hover:text-[#f4d534] transition-colors mt-1 lg:mt-0">
                      <service.Icon size={18} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-white font-bold text-lg lg:text-[22px] leading-tight">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm lg:text-[15px] leading-snug mt-1 w-[95%]">
                    {service.desc}
                  </p>
                </div>

                {/* Lado derecho (Imagen) - Ajusta el tamaño sutilmente si es la tarjeta corta */}
                <div className={`flex-shrink-0 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 ${
                  isWide ? 'w-24 h-24 lg:w-32 lg:h-32' : 'w-20 h-20 lg:w-28 lg:h-28'
                }`}>
                  <Image
                    src={service.imgSrc}
                    alt={service.title}
                    width={128}
                    height={128}
                    className="object-contain w-full h-full"
                    loading="lazy"
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* ==========================================
            CARRUSEL MOBILE
            ========================================== */}
        <div className="block md:hidden w-full relative">
          <div
            className="w-full overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {services.map((service, index) => (
                <div key={`mobile-${index}`} className="w-full flex-shrink-0 px-2">
                  <Link
                    href={service.href}
                    // Aplicamos el mismo contorno amarillo sutil al interactuar en móvil
                    className="bg-[#000118] border border-transparent active:border-[#ffb800] rounded-2xl p-6 flex flex-col items-center text-center gap-4 shadow-xl block h-full transition-colors"
                  >
                    <div className="flex flex-col items-center gap-2 w-full">
                      <div className="bg-[#ffffff10] p-2 rounded-lg text-gray-300 mb-1">
                        <service.Icon size={24} strokeWidth={2.5} />
                      </div>
                      <h3 className="text-white font-bold text-xl leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-[15px] leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    <div className="w-32 h-32 flex items-center justify-center mt-2">
                      <Image
                        src={service.imgSrc}
                        alt={service.title}
                        width={128}
                        height={128}
                        className="object-contain w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 mt-8">
            {services.map((_, index) => (
              <button
                key={`indicator-${index}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'w-6 bg-[#ffb800]' : 'w-2 bg-[#ffffff40]'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}