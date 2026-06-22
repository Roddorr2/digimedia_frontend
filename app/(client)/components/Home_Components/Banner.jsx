'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const desktopSlides = [
  '/optimized_images/image-home/pc-1.png',
  '/optimized_images/image-home/pc-2.png',
  '/optimized_images/image-home/pc-3.png',
  '/optimized_images/image-home/pc-4.png',
];

const mobileSlides = [
  '/optimized_images/image-home/celular-1.png',
  '/optimized_images/image-home/celular-2.png',
  '/optimized_images/image-home/celular-3.png',
  '/optimized_images/image-home/celular-4.png',
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    [...desktopSlides, ...mobileSlides].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % desktopSlides.length;
      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="w-full" 
      style={{ 
        backgroundImage: "linear-gradient(90deg, #000118 0%, #100043 40%, #130049 75%, #410c89 100%)",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Se eliminaron las clases de "rounded" para que quede totalmente rectangular y en punta */}
      <main className="relative h-[calc(100dvh-67px)] w-full overflow-hidden bg-black">
        <div className="absolute inset-0 w-full h-full">
          {desktopSlides.map((src, index) => (
            <img
              key={`desktop-${index}`}
              src={src}
              alt={`Banner desktop ${index + 1}`}
              className={`w-full h-full object-cover object-[70%] md:object-[30%] absolute inset-0 transition-opacity duration-1000 hidden md:block ${
                index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'
              }`}
              loading="eager"
              decoding="async"
              style={{
                transform: index === currentIndex ? 'scale(1)' : 'scale(1.1)',
                transition: index === currentIndex 
                  ? 'transform 5000ms ease-out, opacity 1000ms ease-in-out' 
                  : 'none'
              }}
            />
          ))}
          {mobileSlides.map((src, index) => (
            <img
              key={`mobile-${index}`}
              src={src}
              alt={`Banner mobile ${index + 1}`}
              className={`w-full h-full object-cover object-[70%] md:object-[30%] absolute inset-0 transition-opacity duration-1000 md:hidden ${
                index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'
              }`}
              loading="eager"
              decoding="async"
              style={{
                transform: index === currentIndex ? 'scale(1)' : 'scale(1.1)',
                transition: index === currentIndex 
                  ? 'transform 5000ms ease-out, opacity 1000ms ease-in-out' 
                  : 'none'
              }}
            />
          ))}
        </div>

        {/* OVERLAY MORADO: Capa superpuesta para teñir la foto (z-[5] para que quede debajo de los textos) */}
        <div className="absolute inset-0 bg-[#410c89]/60 mix-blend-multiply z-[5] pointer-events-none"></div>

        {/* Nuevo diseño del contenedor de texto y botón */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-16 md:pb-24 items-start">
          
          <div className="flex items-stretch gap-3 mb-4 pl-0 md:pl-8">
            {/* Barras verticales decorativas */}
            <div className="flex gap-2 py-1 pl-4 md:pl-0">
              <div className="w-3 md:w-4 bg-[#FFC107] rounded-full"></div>
              <div className="w-3 md:w-4 bg-[#FFC107] rounded-full"></div>
              <div className="w-3 md:w-4 bg-[#FFC107] rounded-full"></div>
            </div>
            
            {/* Caja de texto principal */}
            <div className="bg-[#FFC107] py-5 px-6 md:px-8 rounded-2xl shadow-lg max-w-[85%] md:max-w-2xl">
              <h1 className="text-black font-extrabold text-xl md:text-3xl font-sans leading-tight">
                Creemos en las buenas ideas...
              </h1>
              <p className="text-black text-sm md:text-lg mt-1 font-medium">
                y sobre todo en sacar adelante tu negocio
              </p>
            </div>
          </div>

          {/* Botón */}
          <Link
            href="/contactanos"
            className="inline-flex items-center justify-center text-black 
            font-extrabold px-8 py-2 md:px-10 md:py-3 rounded-r-xl md:rounded-xl shadow-md bg-[#FFC107] hover:bg-[#e0a800] 
            transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none mt-2 md:ml-8"
          >
            <span>¡Contáctanos!</span>
          </Link>
        </div>
      </main>
    </div>
  );
}