"use client";

import React from "react";

export const MobileVersion = () => {
  return (
    <div className="lg:hidden bg-purple-400 p-8 md:p-16 text-center">
      <p className="text-lg sm:text-xl md:text-2xl text-black mb-5">
        Se organiza y estructura el contenido con un calendario estratégico,
        asegurando publicaciones consistentes y alineadas con tus objetivos.
      </p>
      <button className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold py-5 px-10 rounded-lg mb-5 mx-auto block">
        Asesoría Gratis
      </button>
      <div className="border-4 border-white rounded-lg overflow-hidden">
        <img
          src="/servicios/planificacion/planificacion_imagen2.webp"
          alt="Imagen con gradiente"
          className="object-cover w-full h-auto"
        />
      </div>
    </div>
  );
};
