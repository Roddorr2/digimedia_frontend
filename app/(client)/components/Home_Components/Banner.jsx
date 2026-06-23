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
    <>
      <main className="relative h-[calc(100dvh-67px)] w-full overflow-hidden bg-black">
        <div className="absolute inset-0 w-full h-full">
          {desktopSlides.map((src, index) => (
            <img
              key={`desktop-${index}`}
              src={src}
              alt={`Banner desktop ${index + 1}`}
              className={`w-full h-full object-cover object-[70%] md:object-[30%] absolute inset-0 transition-opacity duration-1000 hidden md:block ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
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
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
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

        <div className="absolute inset-0 z-10 flex flex-col items-end justify-end pb-20 md:justify-end md:items-start md:mx-0 md:pb-0">
          <div className="bg-[#B326FF] text-white py-6 px-8 rounded-[30px] rounded-tr-[80px] md:rounded-t-none md:rounded-tr-[50px] md:px-24 w-[65%] mr-4 md:w-auto md:mr-0 md:max-w-none text-center md:text-left">
            <h1 className="text-white font-bold text-2xl md:text-4xl font-sans leading-tight">
              Creemos en las buenas ideas...
            </h1>
            <p className="text-white text-lg md:text-2xl mt-2">
              y sobre todo en sacar adelante tu negocio
            </p>
          </div>
          <Link
            href="/contactanos"
            className="relative inline-flex items-center justify-center text-white 
            font-bold px-12 py-3 rounded-2xl shadow-md bg-[#FFA000] hover:bg-[#FB8C00] 
            transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none
            mt-5 mb-8 md:translate-x-[5rem] md:mx-0"
          >
            <span className="relative z-10">¡Contáctanos!</span>
          </Link>
        </div>
      </main>
    </>
  );
}
