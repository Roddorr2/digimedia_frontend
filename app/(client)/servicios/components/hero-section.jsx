'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function HeroSection({
  category = 'Diseño y desarrollo web',
  title = 'DISEÑO UX Y UI',
  description,
  bulletPoints = [],
  imageUrl,
  imageAlt = '',
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-0 md:gap-4">
          {/* MOBILE: CATEGORY ARRIBA */}
          <button
            onClick={() => router.back()}
            className="md:hidden mb-6 text-3xl font-bold text-[#B326FF] tracking-wide text-left self-start hover:opacity-100 transition"
          >
            ‹ {category}
          </button>

          {/* Card izquierda */}
          <div className="relative h-[450px] md:h-auto overflow-hidden rounded-tl-[60px]">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* Card derecha */}
          <div className="text-white rounded-b-3xl md:rounded-b-none md:rounded-br-[60px] overflow-hidden">
            {/* MOBILE: TÍTULO */}
            <div className="bg-[#B326FF] p-8 md:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="w-full text-center"
              >
                <h1 className="text-4xl font-extrabold leading-tight">
                  {title}
                </h1>
              </button>
            </div>

            {/* DESKTOP: TODO JUNTO */}
            <div className="hidden md:block bg-[#B326FF] p-20">
              <button
                onClick={() => router.back()}
                className="block text-lg mb-4 opacity-90 hover:opacity-100 transition cursor-pointer"
              >
                ‹ {category}
              </button>

              <h1 className="text-5xl font-extrabold leading-tight mb-6">
                {title}
              </h1>

              <p className="text-lg mb-6 opacity-95">{description}</p>

              <ul className="space-y-3">
                {bulletPoints.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* MOBILE: CONTENIDO DESPLEGABLE */}
            {open && (
              <div className="md:hidden bg-[#8E1FD1] p-6">
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
