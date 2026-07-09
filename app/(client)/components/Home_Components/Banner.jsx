"use client";
import { useState, useEffect, useRef } from "react";

const desktopSlides = [
  "/optimized_images/image-home/pc-1.webp",
  "/optimized_images/image-home/pc-2.webp",
  "/optimized_images/image-home/pc-3.webp",
  "/optimized_images/image-home/pc-4.webp",
];

const mobileSlides = [
  "/optimized_images/image-home/celular-1.webp",
  "/optimized_images/image-home/celular-2.webp",
  "/optimized_images/image-home/celular-3.webp",
  "/optimized_images/image-home/celular-4.webp",
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const [typedText, setTypedText] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [viewportReady, setViewportReady] = useState(false);

  const staticText = "MARKETING DIGITAL QUE MUEVE MARCAS ";
  const droppingWords = [
    "REALES",
    "INNOVADORAS",
    "AUTÉNTICAS",
    "IMPARABLES",
    "GANADORAS !",
  ];
  const subtitle =
    "Estrategia, contenido y gestión para negocios que quieren crecer en el mundo digital.";

  const slides = isMobile ? mobileSlides : desktopSlides;

  // Detecta el viewport una sola vez al montar y se suscribe a cambios de breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    setViewportReady(true);
    const handleChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // Precarga solo el resto del set activo (el slide 0 ya se resuelve vía <picture>)
  useEffect(() => {
    if (!viewportReady) return;
    slides.slice(1).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [viewportReady, isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % slides.length;
      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

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
          {/* Slide 0: presente desde el HTML inicial (sin esperar viewportReady).
              El navegador elige mobile/desktop vía <source media>, sin JS. */}
          <picture>
            <source media="(max-width: 767px)" srcSet={mobileSlides[0]} />
            <img
              key={`slide-0-${currentIndex}`}
              src={desktopSlides[0]}
              alt="Banner principal Digimedia"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className={`w-full h-full object-cover object-[70%] md:object-[30%] absolute inset-0 ${
                currentIndex === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                transform: currentIndex === 0 ? "scale(1)" : "scale(1.1)",
                animation:
                  currentIndex === 0
                    ? "slowZoomOut 5s ease-out forwards"
                    : "none",
              }}
            />
          </picture>

          {viewportReady &&
            slides.slice(1).map((src, i) => {
              const index = i + 1;
              return (
                <img
                  key={`${isMobile ? "mobile" : "desktop"}-${index}-${currentIndex}`}
                  src={src}
                  alt={`Banner ${isMobile ? "mobile" : "desktop"} ${index + 1}`}
                  className={`w-full h-full object-cover object-[70%] md:object-[30%] absolute inset-0 ${
                    index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                  loading="lazy"
                  decoding="async"
                  style={{
                    transform: index === currentIndex ? "scale(1)" : "scale(1.1)",
                    animation:
                      index === currentIndex
                        ? "slowZoomOut 5s ease-out forwards"
                        : "none",
                  }}
                />
              );
            })}
        </div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none gap-4">
          <h1 className="text-white font-bold text-2xl md:text-4xl font-sans leading-tight text-center px-4">
            <span className="inline-block">{typedText}</span>
            <span className="dropping-texts inline-block ml-4">
              <div className="dropping-word" key={currentIndex}>
                {activeWord}
              </div>
            </span>
            {typedText.length < staticText.length && (
              <span className="animate-blink">|</span>
            )}
          </h1>
          <p className="text-white text-lg md:text-2xl text-center max-w-2xl px-4">
            {subtitle}
          </p>
        </div>
      </main>
    </>
  );
}
