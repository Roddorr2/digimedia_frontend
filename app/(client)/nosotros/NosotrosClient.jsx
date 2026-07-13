'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WhatsAppButton from '../components/WhatsAppButton';
import MayaChatbot from '../components/Chatbot';
import Testimonios2 from './components/Testimonios2';

const Nosotros = ({ reviews = [] }) => { 
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1D006F] to-[#0E0630] text-white relative overflow-hidden">
      
      {/* Círculo de luz decorativo amarillo a la derecha obtenido del SVG */}
      <div className="absolute top-[888px] -right-[100px] w-[462px] h-[324px] rounded-full bg-[#FFB800]/10 blur-[120px] pointer-events-none z-0" />

      {/* 1. HERO SECTION */}
      <section className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[650px] w-full flex items-center justify-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Img-nosotros/nosotros-hero.webp"
            alt="Nosotros - DigiMedia"
            title="Nosotros | DigiMedia"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Degradado superpuesto para lograr el tono morado oscuro */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-[#14083c]/50 via-[#14083c]/70 to-[#14083c]" /> */}
        </div>

        {/* Título centrado */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-widest uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
            NOSOTROS
          </h1>
        </div>
      </section>

      {/* 2. SECCIÓN ¿CÓMO FUNCIONA? */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10">
        <div className="bg-[#0e0735]/85 border border-[#7D29E8]/30 rounded-3xl p-8 md:p-12 text-center shadow-[0_0_40px_rgba(125,41,232,0.25)]">
          <h2 className="text-[#FFC500] text-2xl md:text-3xl font-black mb-4 tracking-wider uppercase">
            ¿CÓMO FUNCIONA?
          </h2>
          <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            En Digimedia impulsamos marcas mediante estrategias digitales creativas, innovación y contenido enfocado en generar crecimiento y conexión con las audiencias. Combinamos creatividad, análisis y tecnología para desarrollar experiencias digitales modernas, auténticas y orientadas a resultados.
          </p>
        </div>
      </section>

      {/* 3. NUESTRA ESENCIA SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-16 text-center">
        {/* Título con línea inferior amarilla */}
        <div className="inline-block mb-16">
          <h2 className="text-[#FFC500] text-3xl md:text-4xl font-extrabold uppercase tracking-widest">
            NUESTRA ESENCIA
          </h2>
          <div className="h-[4px] bg-[#FFC500] w-full mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Innovación */}
          <div className="min-h-[400px] h-auto bg-[#0f0430] border border-[#2C197B]/70 rounded-3xl px-8 py-14 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#7D29E8]/60 transition-all duration-300">
            <div className="w-28 h-28 bg-[#FFC500] rounded-full flex items-center justify-center mb-6 text-black shadow-[0_4px_12px_rgba(255,197,0,0.25)]">
              <Image src="/Img-nosotros/inovacion.png" alt="Innovation Icon" width={60} height={60} />
            </div>
            <h3 className="text-white text-3xl font-bold mb-3 uppercase tracking-wider">
              INOVACIÓN
            </h3>
            <p className="text-gray-300 text-base leading-relaxed px-2">
              Aplicamos tendencias y herramientas digitales para mantener marcas en constante evolución.
            </p>
          </div>

          {/* Card 2: Creatividad */}
          <div className="min-h-[400px] h-auto bg-[#0f0430] border border-[#2C197B]/70 rounded-3xl px-8 py-14 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#7D29E8]/60 transition-all duration-300">
            <div className="w-28 h-28 bg-[#FFC500] rounded-full flex items-center justify-center mb-6 text-black shadow-[0_4px_12px_rgba(255,197,0,0.25)]">
              <Image src="/Img-nosotros/creatividad.png" alt="Creativity Icon" width={60} height={60} />
            </div>
            <h3 className="text-white text-3xl font-bold mb-3 uppercase tracking-wider">
              CREATIVIDAD
            </h3>
            <p className="text-gray-300 text-base leading-relaxed px-2">
              Desarrollamos contenido visual y estrategias que fortalecen la identidad de cada marca.
            </p>
          </div>

          {/* Card 3: Estrategia */}
          <div className="min-h-[400px] h-auto bg-[#0f0430] border border-[#2C197B]/70 rounded-3xl px-8 py-14 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#7D29E8]/60 transition-all duration-300">
            <div className="w-28 h-28 bg-[#FFC500] rounded-full flex items-center justify-center mb-6 text-black shadow-[0_4px_12px_rgba(255,197,0,0.25)]">
              <Image src="/Img-nosotros/estrategia.png" alt="Strategy Icon" width={60} height={60} />
            </div>
            <h3 className="text-white text-3xl font-bold mb-3 uppercase tracking-wider">
              ESTRATEGIA
            </h3>
            <p className="text-gray-300 text-base leading-relaxed px-2">
              Creamos soluciones digitales enfocadas en posicionamiento, presencia y crecimiento sostenible.
            </p>
          </div>
        </div>
      </section>

      {/* 4. MISIÓN Y VISIÓN SECTION */}
      <section className="relative z-10 max-w-[1224px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[474fr_723fr] gap-[27px] items-stretch">
          {/* Imagen a la Izquierda (Esquinas izquierdas redondeadas en desktop de 37px, superiores en mobile) */}
          <div className="relative min-h-[350px] lg:min-h-[485px] rounded-t-[37px] lg:rounded-l-[37px] lg:rounded-tr-none lg:rounded-br-none overflow-hidden shadow-2xl">
            <Image
              src="/Img-nosotros/vision-mision-image-section.webp"
              alt="Misión y Visión - DigiMedia"
              title="Misión y Visión de Digimedia"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Tarjeta de Contenido a la Derecha (Esquinas derechas redondeadas en desktop de 37px, inferiores en mobile, fondo con degradado del SVG) */}
          <div className="bg-gradient-to-r from-[#01011A] to-[#120048] rounded-b-[37px] lg:rounded-r-[37px] lg:rounded-tl-none lg:rounded-bl-none p-8 md:p-12 lg:p-16 flex flex-col justify-center gap-8 shadow-2xl">
            <div>
              <h3 className="text-[#FFC500] text-3xl md:text-4xl font-extrabold mb-3 tracking-wider uppercase">
                MISIÓN
              </h3>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed font-normal">
                "Impulsar el crecimiento digital de marcas y emprendimientos mediante estrategias creativas, innovación y soluciones digitales enfocadas en generar posicionamiento, conexión y resultados sostenibles."
              </p>
            </div>

            <div>
              <h3 className="text-[#FFC500] text-3xl md:text-4xl font-extrabold mb-3 tracking-wider uppercase">
                VISIÓN
              </h3>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed font-normal">
                "Buscamos impulsar la transformación digital de empresas y emprendimientos mediante estrategias innovadoras que conecten marcas con personas."
              </p>
            </div>
          </div>
        </div>
      </section>

      <Testimonios2 reviews={reviews} />    

      {/* 5. CTA BUTTON */}
      <div className="relative z-10 flex justify-center pb-24 pt-8">
        <Link
          href="/contactanos"
          className="bg-[#FFC500] hover:bg-[#FFB800] text-black font-extrabold py-4 px-16 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_25px_rgba(255,197,0,0.35)] uppercase text-sm sm:text-base tracking-widest"
        >
          Trabajemos juntos
        </Link>
      </div>

      <WhatsAppButton />
      <MayaChatbot />

      {/* Transición oscura al final de la página (cercano al footer) obtenida del SVG */}
      <div className="absolute bottom-0 left-0 right-0 h-[648px] bg-gradient-to-b from-transparent to-[#05011A] pointer-events-none z-0" />
    </div>
  );
};

export default Nosotros;