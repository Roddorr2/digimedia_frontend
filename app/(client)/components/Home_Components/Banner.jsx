'use client';
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
  const [typedText, setTypedText] = useState('');

  const staticText = 'MARKETING DIGITAL QUE MUEVE MARCAS ';
  const droppingWords = ['REALES', 'INNOVADORAS', 'AUTÉNTICAS', 'IMPARABLES', 'GANADORAS !'];
  const subtitle = 'Estrategia, contenido y gestión para negocios que quieren crecer en el mundo digital.';

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

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= staticText.length) {
        setTypedText(staticText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const activeWord = droppingWords[currentIndex % droppingWords.length];

  return (
    <>
      <style>{`
        @keyframes slowZoomOut {
          0% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
      <main className="relative h-[calc(100dvh-125px)] w-full overflow-hidden bg-black">
        <div className="absolute inset-0 w-full h-full">
          {desktopSlides.map((src, index) => (
            <img
              key={`desktop-${index}-${currentIndex}`}
              src={src}
              alt={`Banner desktop ${index + 1}`}
              className={`w-full h-full object-cover object-[70%] md:object-[30%] absolute inset-0 hidden md:block ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              loading="eager"
              decoding="async"
              style={{
                transform: index === currentIndex ? 'scale(1)' : 'scale(1.1)',
                animation: index === currentIndex ? 'slowZoomOut 5s ease-out forwards' : 'none'
              }}
            />
          ))}
          {mobileSlides.map((src, index) => (
            <img
              key={`mobile-${index}-${currentIndex}`}
              src={src}
              alt={`Banner mobile ${index + 1}`}
              className={`w-full h-full object-cover object-[70%] md:object-[30%] absolute inset-0 md:hidden ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              loading="eager"
              decoding="async"
              style={{
                transform: index === currentIndex ? 'scale(1)' : 'scale(1.1)',
                animation: index === currentIndex ? 'slowZoomOut 5s ease-out forwards' : 'none'
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none gap-4">
          <h1 className="text-white font-bold text-2xl md:text-4xl font-sans leading-tight text-center px-4">
            <span className="inline-block">{typedText}</span>
            <span className="dropping-texts inline-block ml-4">
              <div className="dropping-word" key={currentIndex}>{activeWord}</div>
            </span>
            {typedText.length < staticText.length && <span className="animate-blink">|</span>}
          </h1>
          <p className="text-white text-lg md:text-2xl text-center max-w-2xl px-4">
            {subtitle}
          </p>
        </div>
      </main>
    </>
  );
}
