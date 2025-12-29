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
    { src: '/image-home/contigo_voy color.png', alt: 'Contigo Voy logo' },
    { src: '/image-home/digimedia color.png', alt: 'Digimedia logo' },
    { src: '/image-home/nhl color.png', alt: 'NHL logo' },
    { src: '/image-home/tami color.png', alt: 'Tami logo' },
    { src: '/image-home/yuntas color.png', alt: 'Yuntas logo' },
    { src: '/image-home/prevemedic color.png', alt: 'prevemedic logo' },
    { src: '/image-home/mj-eventos color.png', alt: 'MJ eventos logo' },
    { src: '/image-home/asden color.png', alt: 'Asden logo' },
  ];

  return (
    <section className="my-6 mx-12">
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

      <h2 className="text-2xl text-[#b525fe] mb-4">NUESTROS CLIENTES</h2>

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
                    width={200}
                    height={100}
                    className="object-contain w-full h-full"
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
        <div className="clients-pagination absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" />
      </div>
    </section>
  );
}
