'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';

export default function Clientes() {
  // Aquí se verificarán las rutas de imágenes del home
  const clientes = [
    {
      src: '/image-home/contigo_voy color.png',
      alt: 'Contigo Voy logo',
      width: 200,
      height: 100,
    },

    {
      src: '/image-home/digimedia+color.webp',
      alt: 'Digimedia logo',
      width: 180,
      height: 95,
    },

    {
      src: '/image-home/nhl color.webp',
      alt: 'NHL logo',
      width: 130,
      height: 75,
    },
    {
      src: '/image-home/tami color.png',
      alt: 'Tami logo',
      width: 190,
      height: 95,
    },
    {
      src: '/image-home/yuntas color.webp',
      alt: 'Yuntas logo',
      width: 150,
      height: 75,
    },
    {
      src: '/image-home/prevemedic color.webp',
      alt: 'prevemedic logo',
      width: 300,
      height: 100,
    },
    {
      src: '/image-home/mj-eventos color.png',
      alt: 'MJ eventos logo',
      width: 180,
      height: 95,
    },
    {
      src: '/image-home/asden color.png',
      alt: 'Asden logo',
      width: 100,
      height: 65,
    },
  ];

  return (
    <section className="my-6 mx-auto max-w-[1200px] px-6">
      <style>{`
        .clients-bullet {
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          background-color: #d1d5db;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .clients-bullet-active {
          width: 20px;
          background-color: #b525fe;
        }
      `}</style>

      <h2 className="text-4xl md:text-5xl text-[#b525fe] text-center md:text-left mb-0 mt-20">
        NUESTROS CLIENTES
      </h2>

      <div className="relative w-full overflow-hidden">
        {/* Flecha izquierda */}
        <button
          className="clients-prev absolute top-1/2 left-0 -translate-y-1/2 z-10 px-0
             transition-transform duration-200 ease-out hover:scale-110"
          aria-label="Anterior"
        >
          <span className="text-[#b525fe] text-3xl">&#10094;</span>
        </button>

        {/* Flecha derecha */}
        <button
          className="clients-next absolute top-1/2 right-0 -translate-y-1/2 z-10 px-0
             transition-transform duration-200 ease-out hover:scale-110"
          aria-label="Siguiente"
        >
          <span className="text-[#b525fe] text-3xl">&#10095;</span>
        </button>

        {/* Carrusel */}
        <Swiper
          modules={[Navigation, Pagination]}
          loop
          speed={700}
          spaceBetween={0}
          navigation={{
            prevEl: '.clients-prev',
            nextEl: '.clients-next',
          }}
          pagination={{
            clickable: true,
            el: '.clients-pagination',
            bulletClass: 'clients-bullet',
            bulletActiveClass: 'clients-bullet-active',
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {clientes.map((cliente, index) => (
            <SwiperSlide key={index}>
              {/* Item (idéntico a tu diseño) */}
              <div className="flex-shrink-0 w-full h-56 px-2">
                <div className="w-full h-full flex items-center justify-center">
                  {/* <a href={cliente.link} target="_blank" rel="noopener noreferrer"> */}
                  <Image
                    src={cliente.src}
                    alt={cliente.alt}
                    width={cliente.width}
                    height={cliente.height}
                    className="object-contain"
                    loading="lazy"
                    decoding="async"
                    priority={false}
                  />
                  {/* </a> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Indicadores dinamicos */}
        <div className="clients-pagination absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20" />
      </div>
    </section>
  );
}
