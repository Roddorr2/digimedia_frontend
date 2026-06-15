"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import Link from "next/link";
import Image from "next/image";
import styles from "./servicios.module.css";

import "swiper/css";
import "swiper/css/pagination";

export default function Servicios({ servicios, perRow }) {
  const isMultiRow = perRow >= 5;

  // Filas para desktop (perRow columnas)
  const rowsDesktop = perRow
    ? Array.from({ length: Math.ceil((servicios?.length || 0) / perRow) }, (_, i) =>
        servicios.slice(i * perRow, (i + 1) * perRow)
      )
    : null;

  // Filas para pantalla mediana: siempre 3 por fila cuando isMultiRow
  const rowsMedium = isMultiRow
    ? Array.from({ length: Math.ceil((servicios?.length || 0) / 3) }, (_, i) =>
        servicios.slice(i * 3, (i + 1) * 3)
      )
    : null;

  const renderCard = (servicio, index, fixedPerRow) => (
    <Servicio
      key={index}
      index={index}
      title={servicio.title}
      text={servicio.text}
      icon={servicio.icon}
      ruta={servicio.ruta}
      iconTitle={servicio.iconTitle}
      iconAlt={servicio.iconAlt}
      fixedPerRow={fixedPerRow}
    />
  );

  return (
    <section className={`p-4 m-auto md:py-16 my-16 ${isMultiRow ? "max-w-screen-2xl" : "max-w-6xl"}`}>
      {/* Título principal */}
      <h2 className="font-bold text-3xl md:text-4xl text-center mb-12 mt-10 md:mt-2 text-[#B326FF] font-title relative uppercase">
        Nuestros Subservicios
      </h2>

      {/* ── MOBILE: Swiper ── */}
      {/* Con perRow>=5 solo en móvil (<md); sin perRow, en tablet también (<lg) */}
      <div className={`${isMultiRow ? "md:hidden" : "lg:hidden"} ${styles.swiperClip} ${styles.paginationWrapper}`}>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true, el: ".servicios-pagination" }}
          spaceBetween={20}
          loop
          breakpoints={{
            0: { slidesPerView: 1, centeredSlides: true },
            768: { slidesPerView: 1, centeredSlides: false },
          }}
          className={styles.swiper}>
          {servicios?.map((servicio, index) => (
            <SwiperSlide key={index}>
              {renderCard(servicio, index, undefined)}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="servicios-pagination flex justify-center mt-4" />
      </div>

      {/* ── MEDIANO (md → xl): 3 arriba + 2 centrados abajo ── */}
      {isMultiRow && rowsMedium && (
        <div className="hidden md:flex xl:hidden flex-col gap-8 items-center">
          {rowsMedium.map((fila, rowIdx) => (
            <div key={rowIdx} className="flex gap-8 justify-center w-full">
              {fila.map((servicio, idx) =>
                renderCard(servicio, rowIdx * 3 + idx, 3)
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── DESKTOP (xl+): perRow columnas o flex-wrap estándar ── */}
      {rowsDesktop ? (
        <div className="hidden xl:flex flex-col gap-8 items-center">
          {rowsDesktop.map((fila, rowIdx) => (
            <div key={rowIdx} className="flex gap-8 justify-center w-full">
              {fila.map((servicio, idx) =>
                renderCard(servicio, rowIdx * perRow + idx, perRow)
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="hidden lg:flex flex-wrap justify-center gap-8">
          {servicios?.map((servicio, index) => renderCard(servicio, index, undefined))}
        </div>
      )}
    </section>
  );
}

function Servicio({ title, text, icon, iconTitle, iconAlt, ruta, index, fixedPerRow }) {
  const rutaValida = ruta ? `${ruta}` : "/";

  const colorClass =
    index % 2 === 0
      ? "bg-gradient-to-br from-[#FFA000] to-[#FFB300] text-white"
      : "bg-gradient-to-br from-[#B326FF] to-[#7B12B3] text-white";

  // Con perRow fijo, cada card ocupa exactamente 1/perRow del contenedor (descontando gaps)
  const gapRem = 2; // gap-8 = 2rem
  const widthStyle = fixedPerRow
    ? { width: `calc((100% - ${(fixedPerRow - 1) * gapRem}rem) / ${fixedPerRow})` }
    : undefined;

  return (
    <div
      style={widthStyle}
      className={`relative ${colorClass} rounded-3xl py-8 px-2 shadow-lg
      md:hover:shadow-2xl transition-all duration-500 transform md:hover:-translate-y-2
      w-[85%] max-w-[480px] md:w-auto ${fixedPerRow ? "shrink-0" : "basis-64 flex-1 shrink-0 min-[832px]:max-[1118px]:basis-96"}
      group overflow-hidden h-[450px]`}>
      <Link
        href={rutaValida}
        className="grid grid-cols-1 grid-rows-[120px_100px_1px_100%] items-center h-full w-full">
        {/* Efecto de brillo */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#FF037F]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Ícono */}
        <figure className="flex h-full justify-center align-middle py-3">
          <Image
            className={`max-w-36 w-24 h-24 object-contain ${styles["animate-bounce-slow"]}`}
            src={icon || "/placeholder.svg"}
            alt={iconAlt || title}
            title={iconTitle || ""}
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
          <p className="text-sm text-center leading-relaxed relative z-10">
            {text}
          </p>
        </div>
      </Link>
    </div>
  );
}
