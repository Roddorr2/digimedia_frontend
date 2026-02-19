'use client';

import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { QuienesSomos } from './components/QuienesSomos';
import { MisionVision } from './components/MisionVision';
import WhatsAppButton from '../components/WhatsAppButton';

const Nosotros = () => {
  const mensaje =
    'Hola, vengo de la pagina web de Digimedia, deseo mas información! 👌';
  const numeroWhatsApp = '51936910425';
  const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <QuienesSomos />
      <MisionVision />
      <WhatsAppButton />
      {/* Botón flotante de WhatsApp (no se está utilizando por el momento, lo dejo comentado por si acaso) */}
      {/* <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer">
        <div className="fixed bottom-4 right-4 bg-green-500 p-4 rounded-full shadow-lg cursor-pointer">
          <i className="fab fa-whatsapp text-white text-3xl"></i>
        </div>
      </a> */}
    </div>
  );
};

export default Nosotros;
