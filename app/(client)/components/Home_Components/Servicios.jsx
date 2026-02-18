'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './services.module.css';

export default function Servicios() {
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
    const swipeThreshold = 50; // Mínimo de píxeles para considerar un swipe
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe izquierda - siguiente slide
        setCurrentSlide((prev) => (prev + 1) % 4);
      } else {
        // Swipe derecha - slide anterior
        setCurrentSlide((prev) => (prev - 1 + 4) % 4);
      }
    }
  };

  return (
    <section className={styles.servicesMain} id="services">
      {/* Encabezado */}
      <div className="w-full max-w-[1200px] mx-auto self-stretch py-8 px-6">
        <div className="!text-left">
          <h2 className="text-[#B326FF] font-extrabold text-4xl md:text-5xl text-center md:text-left">
            NUESTROS SERVICIOS
          </h2>
          <p className="text-center md:text-left mt-3 mr-6 text-gray-500 text-lg  md:text-xl">
            Digimedia es una empresa de marketing digital que impulsa
            emprendimientos en línea mediante estrategias eficaces, enfocada en
            el crecimiento y desarrollo de cada marca.
          </p>
        </div>
      </div>
      {/* Layout Desktop - Original */}
      <div className={styles.servicesLayout}>
        {/* CARD MORADA IZQUIERDA */}
        <Link
          href="/servicios/desing-desarrollo"
          className={`${styles.serviceCard} ${styles.purple}`}
        >
          <Image
            src="/image-home/diseño.png"
            alt="Icono diseño"
            width={150}
            height={160}
            loading="lazy"
          />
          <h3>
            DISEÑO Y <br /> DESARROLLO WEB
          </h3>
          <p>
            Creamos sitios atractivos y <br /> funcionales que representan{' '}
            <br /> tu marca.
          </p>
        </Link>

        {/* COLUMNA CENTRAL NARANJA */}
        <div className={styles.middleColumn}>
          <Link
            href="/servicios/gestion-redes"
            className={`${styles.serviceCard} ${styles.orange}`}
          >
            <div className={styles.textContent}>
              <h3>
                GESTIÓN DE REDES <br /> SOCIALES
              </h3>
              <p>
                Aumenta tu presencia <br /> online y conectamos
                <br /> con tu audiencia.
              </p>
            </div>
            <Image
              src="/image-home/redessociales.png"
              alt="Redes"
              width={100}
              height={100}
              loading="lazy"
            />
          </Link>

          <Link
            href="/servicios/branding-desing"
            className={`${styles.serviceCard} ${styles.orange}`}
          >
            <div className={styles.textContent}>
              <h3>
                BRANDING Y <br /> DISEÑO
              </h3>
              <p>
                Construimos una <br />
                identidad fuerte y <br />
                memorable.
              </p>
            </div>
            <Image
              src="/image-home/branding.png"
              alt="Branding"
              width={80}
              height={80}
              loading="lazy"
            />
          </Link>
        </div>

        {/* CARD MORADA DERECHA */}
        <Link
          href="/servicios/marketing-gestion"
          className={`${styles.serviceCard} ${styles.purple}`}
        >
          <Image
            src="/image-home/marketingdigital.png"
            alt="Marketing"
            width={125}
            height={125}
            loading="lazy"
          />
          <h3>
            MARKETING Y <br /> GESTIÓN DIGITAL
          </h3>
          <p>
            Aumenta tu presencia en <br /> redes sociales con <br /> marketing
            digital.
          </p>
        </Link>
      </div>

      {/* Carrusel Mobile */}
      <div className={styles.carouselContainer}>
        <div
          className={styles.carouselWrapper}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {/* Slide 1 - Diseño y Desarrollo Web */}
            <div className={styles.carouselSlide}>
              <Link
                href="/servicios/desing-desarrollo"
                className={`${styles.serviceCard} ${styles.purple}`}
              >
                <Image
                  src="/image-home/diseño.png"
                  alt="Icono diseño"
                  width={150}
                  height={160}
                  loading="lazy"
                />
                <h3>
                  DISEÑO Y <br /> DESARROLLO WEB
                </h3>
                <p>
                  Creamos sitios atractivos y <br /> funcionales que representan{' '}
                  <br /> tu marca.
                </p>
              </Link>
            </div>

            {/* Slide 2 - Gestión de Redes Sociales */}
            <div className={styles.carouselSlide}>
              <Link
                href="/servicios/gestion-redes"
                className={`${styles.serviceCard} ${styles.orange}`}
              >
                <div className={styles.textContent}>
                  <h3>
                    GESTIÓN DE REDES <br /> SOCIALES
                  </h3>
                  <p>
                    Aumenta tu presencia <br /> online y conectamos
                    <br /> con tu audiencia.
                  </p>
                </div>
                <Image
                  src="/image-home/redessociales.png"
                  alt="Redes"
                  width={100}
                  height={100}
                  loading="lazy"
                />
              </Link>
            </div>

            {/* Slide 3 - Marketing y Gestión Digital */}
            <div className={styles.carouselSlide}>
              <Link
                href="/servicios/marketing-gestion"
                className={`${styles.serviceCard} ${styles.purple}`}
              >
                <Image
                  src="/image-home/marketingdigital.png"
                  alt="Marketing"
                  width={125}
                  height={125}
                  loading="lazy"
                />
                <h3>
                  MARKETING Y <br /> GESTIÓN DIGITAL
                </h3>
                <p>
                  Aumenta tu presencia en <br /> redes sociales con <br />{' '}
                  marketing digital.
                </p>
              </Link>
            </div>

            {/* Slide 4 - Branding y Diseño */}
            <div className={styles.carouselSlide}>
              <Link
                href="/servicios/branding-desing"
                className={`${styles.serviceCard} ${styles.orange}`}
              >
                <div className={styles.textContent}>
                  <h3>
                    BRANDING Y <br /> DISEÑO
                  </h3>
                  <p>
                    Construimos una <br />
                    identidad fuerte y <br />
                    memorable.
                  </p>
                </div>
                <Image
                  src="/image-home/branding.png"
                  alt="Branding"
                  width={120}
                  height={120}
                  loading="lazy"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Indicadores */}
        <div className={styles.carouselIndicators}>
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                currentSlide === index ? styles.indicatorActive : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
