'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Clientes() {
  const [activeIndex, setActiveIndex] = useState(0); // Índice del indicador activo
  const [currentSlide, setCurrentSlide] = useState(0); // Posición real del carrusel
  const [isTransitioning, setIsTransitioning] = useState(false); // Control de animación
  const [itemsPerSlide, setItemsPerSlide] = useState(1); // Cantidad de items visibles
  const transitionDuration = 700;
  const intervalRef = useRef(null);

  // Aquí se verificarán las rutas de imágenes del home
  const clientes = [
    { src: '/image-home/contigo_voy.svg', alt: 'Contigo Voy logo' },
    { src: '/image-home/digimedia.svg', alt: 'Digimedia logo' },
    { src: '/image-home/nhl.svg', alt: 'NHL logo' },
    { src: '/image-home/tami.svg', alt: 'Tami logo' },
    { src: '/image-home/yuntas.svg', alt: 'Yuntas logo' },
    { src: '/image-home/prevemedic.svg', alt: 'prevemedic logo' },
    { src: '/image-home/mj-eventos.svg', alt: 'MJ eventos logo' },
    { src: '/image-home/asden.svg', alt: 'Asden logo' },
  ];

  // Crear array extendido con clones para efecto infinito
  const extendedClientes = [...clientes, ...clientes.slice(0, itemsPerSlide)];
  const totalSlides = clientes.length;

  // Ajusta el número de items por slide dependiendo del tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerSlide(4); // 4 items por slide en pantallas grandes
      } else if (width >= 768) {
        setItemsPerSlide(3); // 3 items por slide en pantallas medianas
      } else {
        setItemsPerSlide(1); // 1 item por slide en pantallas pequeñas
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToSlide = (index, immediate = false) => {
    if (isTransitioning) return;

    setIsTransitioning(!immediate);
    setCurrentSlide(index);

    // Actualizar el índice activo para los indicadores
    const normalizedIndex = index % totalSlides;
    setActiveIndex(normalizedIndex);

    // Si llegamos al clon del inicio, saltar instantáneamente al inicio real
    if (index >= totalSlides && !immediate) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, transitionDuration);
    } else if (!immediate) {
      setTimeout(() => {
        setIsTransitioning(false);
      }, transitionDuration);
    }
  };

  const nextSlide = () => {
    const nextIndex = currentSlide + 1;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      // Saltar instantáneamente al final del array extendido
      setIsTransitioning(false);
      setCurrentSlide(totalSlides);
      // Luego animar hacia atrás
      setTimeout(() => {
        goToSlide(totalSlides - 1);
      }, 50);
    } else {
      goToSlide(currentSlide - 1);
    }
  };

  const handleIndicatorClick = (index) => {
    clearInterval(intervalRef.current);

    // Si estamos en un clon, primero saltar al inicio real
    if (currentSlide >= totalSlides) {
      setIsTransitioning(false);
      setCurrentSlide(0);
      setTimeout(() => {
        goToSlide(index);
        startAutoSlide();
      }, 50);
    } else {
      goToSlide(index);
      startAutoSlide();
    }
  };

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 4000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [currentSlide]);

  return (
    <section className="my-6 mx-12">
      <h2 className="text-2xl text-[#b525fe]">NUESTROS CLIENTES</h2>

      <div className="relative w-full overflow-hidden" data-carousel="slide">
        <div
          className={`flex ${
            isTransitioning
              ? 'transition-transform duration-700 ease-in-out'
              : ''
          }`}
          style={{
            transform: `translateX(-${(currentSlide * 100) / itemsPerSlide}%)`,
          }}
        >
          {extendedClientes.map((cliente, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-56 px-2`}
            >
              {/* <a href={cliente.link} target="_blank" rel="noopener noreferrer"> */}
              <Image
                src={cliente.src}
                alt={cliente.alt}
                width={200}
                height={100}
                className="object-contain w-full h-full"
                loading="lazy"
                decoding="async"
                priority={false}
              />
              {/* </a> */}
            </div>
          ))}
        </div>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {clientes.map((_, index) => (
            <button
              key={index}
              className={`h-3 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? 'bg-[#b525fe] w-[1.25rem]'
                  : 'bg-gray-300 w-3'
              }`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Botones de navegación */}
        <button
          onClick={() => {
            clearInterval(intervalRef.current);
            prevSlide();
            startAutoSlide();
          }}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 px-0"
        >
          <span className="text-[#b525fe] text-3xl">&#10094;</span>
        </button>

        <button
          onClick={() => {
            clearInterval(intervalRef.current);
            nextSlide();
            startAutoSlide();
          }}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 px-0"
        >
          <span className="text-[#b525fe] text-3xl">&#10095;</span>
        </button>
      </div>
    </section>
  );
}
