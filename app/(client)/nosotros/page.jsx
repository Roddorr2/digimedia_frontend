'use client';

import React, { useState } from 'react';
import { MisionVision } from './components/MisionVision';
import WhatsAppButton from '../components/WhatsAppButton';
import MayaChatbot from '../components/MayaChatbot';
import { Hero } from '../components/page_components/Hero';
import { Information } from '../components/page_components/Information';
import Link from 'next/link';

const Nosotros = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero
        backgroundImage="/Img-nosotros/NOSOTROS_1680_1050.avif"
        title="NOSOTROS"
        position="center"
      />

      <Information
        subtitle="¿QUIÉNES SOMOS?"
        description="En Digimedia impulsamos marcas mediante estrategias digitales creativas, innovación y contenido enfocado en generar crecimiento y conexión con las audiencias. Combinamos creatividad, análisis y tecnología para desarrollar experiencias digitales modernas, auténticas y orientadas a resultados."
      />

      {/* --- NUEVA SECCIÓN: NUESTRA ESENCIA --- */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-extrabold text-center text-purple-600 mb-12 uppercase">
          Nuestra Esencia
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Innovación - Morado */}
          <div className="bg-white p-8 rounded-2xl border border-purple-100 shadow-[0_4px_20px_-4px_rgba(147,51,234,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(147,51,234,0.2)] transition-shadow text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.82 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.496 1.508 1.333 1.508 2.316V18" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-3 uppercase">Innovación</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Aplicamos tendencias y herramientas digitales para mantener marcas en constante evolución.
            </p>
          </div>

          {/* Creatividad - Naranja (Para contrastar, igual que su bloque de Misión) */}
          <div className="bg-white p-8 rounded-2xl border border-orange-100 shadow-[0_4px_20px_-4px_rgba(249,115,22,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(249,115,22,0.2)] transition-shadow text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.81.5.5 0 00.146-.334V5.25a.5.5 0 00-.5-.5h-2.25a.5.5 0 00-.5.5v8.728a.5.5 0 00.146.334l.035.024A16.03 16.03 0 009.53 16.12z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-3 uppercase">Creatividad</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Desarrollamos contenido visual y estrategias que fortalecen la identidad de cada marca.
            </p>
          </div>

          {/* Estrategia - Morado */}
          <div className="bg-white p-8 rounded-2xl border border-purple-100 shadow-[0_4px_20px_-4px_rgba(147,51,234,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(147,51,234,0.2)] transition-shadow text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-3 uppercase">Estrategia</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Creamos soluciones digitales enfocadas en posicionamiento, presencia y crecimiento sostenible.
            </p>
          </div>
        </div>
      </section>
      {/* -------------------------------------- */}

      <MisionVision />

      {/* --- BOTÓN CTA PEQUEÑO --- */}
      <div className="flex flex-col items-center justify-center py-10 pb-16">
       {/* se modifico la ruta correctamente ya que generaba error 404 con la ruta que tenia (/contacto) y la etiqueta <a> por link <Link> */ }
        <Link 
          href="/contactanos" 
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-transform hover:-translate-y-1 shadow-lg shadow-orange-500/30 uppercase text-sm"
        >
          Trabajemos juntos
        </Link>
      </div>
      {/* -------------------------------------- */}

      <WhatsAppButton />
      <MayaChatbot />

    </div>
  );
};

export default Nosotros;