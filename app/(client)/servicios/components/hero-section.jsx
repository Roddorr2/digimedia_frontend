'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export function HeroSection({
  category = 'Diseño y desarrollo web',
  title = 'DISEÑO UX Y UI',
  description,
  bulletPoints = [],
  imageUrl,
  imageAlt = '',
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-0 md:gap-4">
          {/* Card izquierda */}
          <div className="relative h-[450px] md:h-auto overflow-hidden rounded-tl-[60px]">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover -scale-x-100"
            />
          </div>

          {/* Card derecha */}
          <div className="bg-[#B326FF] text-white p-8 md:p-28 flex flex-col justify-center rounded-b-3xl md:rounded-b-none md:rounded-br-[60px]">
            <span className="hidden text-lg mb-4 opacity-90">‹ {category}</span>

            {/* TÍTULO (clickeable solo en mobile) */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-center md:justify-between text-center md:text-left md:pointer-events-none"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                {title}
              </h1>

              {/* Flecha solo en mobile */}
              {/* <ChevronDown
                className={`ml-4 md:hidden transition-transform ${
                  open ? 'rotate-180' : ''
                }`}
              /> */}
            </button>

            {/* CONTENIDO DESKTOP (siempre visible) */}
            <div className="hidden md:block">
              <p className="text-base md:text-lg mb-6 opacity-95">
                {description}
              </p>

              <ul className="space-y-3">
                {bulletPoints.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTENIDO MOBILE (acordeón) */}
            {open && (
              <div className="mt-6 md:hidden">
                <p className="text-base mb-6 opacity-95">{description}</p>

                <ul className="space-y-3">
                  {bulletPoints.map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
