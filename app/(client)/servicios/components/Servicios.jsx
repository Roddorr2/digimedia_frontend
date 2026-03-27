'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import Link from 'next/link';
import Image from 'next/image';
import styles from './servicios.module.css';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Servicios({ servicios }) {
  return (
    <section className="p-4 max-w-6xl m-auto md:py-16 my-16">
      {/* Título principal */}
      <h2 className="font-bold text-3xl md:text-4xl text-center mb-12 mt-10 md:mt-2 text-[#B326FF] font-title relative uppercase">
        Nuestros Subservicios
      </h2>

      {/* Contenedor Desktop */}
      <div className="hidden lg:flex flex-wrap justify-center gap-8">
        {servicios?.map((servicio, index) => (
          <Servicio
            key={index}
            index={index}
            title={servicio.title}
            text={servicio.text}
            icon={servicio.icon}
            ruta={servicio.ruta}
            iconTitle={servicio.iconTitle}
            iconAlt={servicio.iconAlt}
          />
        ))}
      </div>

      {/* Mobile / Tablet Carousel */}
      <div
        className={`lg:hidden ${styles.swiperClip} ${styles.paginationWrapper}`}
      >
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true, el: '.servicios-pagination' }}
          spaceBetween={20}
          loop
          breakpoints={{
            0: { slidesPerView: 1, centeredSlides: true },
            768: { slidesPerView: 1, centeredSlides: false },
          }}
          className={styles.swiper}
        >
          {servicios?.map((servicio, index) => (
            <SwiperSlide key={index}>
              <Servicio
                index={index}
                title={servicio.title}
                text={servicio.text}
                icon={servicio.icon}
                ruta={servicio.ruta}
                iconTitle={servicio.iconTitle}
                iconAlt={servicio.iconAlt}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Paginación Swiper */}
        <div className="servicios-pagination flex justify-center mt-4" />
      </div>
    </section>
  );
}

function Servicio({ title, text, icon, alt, titleAttr, ruta, index }) {
  const rutaValida = ruta ? `${ruta}` : '/';

  const colorClass =
    index % 2 === 0
      ? 'bg-gradient-to-br from-[#FFA000] to-[#FFB300] text-white'
      : 'bg-gradient-to-br from-[#B326FF] to-[#7B12B3] text-white';

  return (
    <div
      className={`relative ${colorClass} rounded-3xl py-8 px-2 shadow-lg
      md:hover:shadow-2xl transition-all duration-500 transform md:hover:-translate-y-2
      w-[85%] max-w-[480px] md:w-auto basis-64 flex-1 shrink-0
      min-[832px]:max-[1118px]:basis-96 group overflow-hidden h-[450px]`}
    >
      <Link
        href={rutaValida}
        className="grid grid-cols-1 grid-rows-[120px_100px_1px_100%] items-center h-full w-full"
      >
        {/* Efecto de brillo */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#FF037F]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Ícono */}
        <figure className="flex h-full justify-center align-middle py-3">
          <Image
            className={`max-w-36 w-24 h-24 object-contain ${styles['animate-bounce-slow']}`}
            src={icon || '/placeholder.svg'}
            alt={iconAlt || title}
            title={iconTitle || ''}
            width={96}
            height={96}
          />
        </figure>

        {/* Título */}
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h3 className="font-bold text-xl text-center font-title relative z-10 flex items-center justify-center">
            {title}
          </h3>
        </div>

        {/* Descripción */}
        <div className="h-full p-4 flex-grow w-full">
          <p className="text-sm text-center leading-relaxed relative z-10 p-4">
            {text}
          </p>
        </div>
      </Link>
    </div>
  );
}
