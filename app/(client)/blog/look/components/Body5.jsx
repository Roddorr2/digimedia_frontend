"use client";

import { Calendar, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const tarjetas = [
  {
    titulo: "Estrategia Digital Personalizada",
    descripcion:
      "Cada negocio tiene necesidades únicas. Creamos estrategias de marketing digital personalizadas para maximizar tu visibilidad y asegurar que cada campaña esté alineada con tus objetivos específicos.",
  },
  {
    titulo: "Optimización de Conversiones",
    descripcion:
      "A través de un análisis detallado y ajustes continuos, optimizamos tus campañas digitales para mejorar la tasa de conversión, asegurando que cada clic cuente y tu inversión sea rentable.",
  },
  {
    titulo: "Gestión de Redes Sociales",
    descripcion:
      "La gestión efectiva de redes sociales es esencial para interactuar con tu audiencia. Creamos contenido atractivo y administramos tus perfiles para generar engagement y fidelizar clientes.",
  },
  {
    titulo: "SEO y Visibilidad Web",
    descripcion:
      "El SEO es fundamental para mejorar tu visibilidad en los motores de búsqueda. Trabajamos en la optimización de tu sitio web para que más usuarios encuentren tu negocio en línea, aumentando el tráfico de calidad.",
  },
];

const consejos = [
  "Define claramente tu público objetivo antes de crear cualquier campaña para asegurar que tus esfuerzos de marketing estén dirigidos a las personas adecuadas.",
  "Aprovecha el poder del contenido visual: las imágenes y videos atractivos aumentan significativamente el engagement y la tasa de conversión en las redes sociales.",
  "Mantén la consistencia en tus mensajes de marca en todas las plataformas digitales para construir una identidad fuerte y reconocible.",
  "Mide y analiza los resultados de cada campaña. Utiliza herramientas de análisis para ajustar y mejorar continuamente tu estrategia de marketing digital.",
  "No olvides la optimización para dispositivos móviles. Asegúrate de que tu sitio web y campañas sean completamente funcionales y atractivos en teléfonos y tabletas.",
];

export default function Body5() {
  return (
    <article className="relative mx-auto w-full max-w-[1180px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0A0140]/75 text-white shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-md">
      <section className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12 lg:p-12">
        <div className="relative min-h-[300px] overflow-hidden rounded-[24px] border border-white/10 shadow-2xl sm:min-h-[390px]">
          <Image
            src="/blog/blog-1.webp"
            alt="Persona viendo estadísticas en su celular y computadora"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060126]/45 to-transparent" />
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-300">
            <Calendar className="h-4 w-4 text-[#F2C230]" />
            <span>2025-03-31</span>
          </div>
          <h1 className="text-3xl font-black leading-tight text-[#F2C230] sm:text-4xl lg:text-5xl">
            MARKETING Y GESTIÓN DIGITAL
          </h1>
          <div className="my-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#F2A30F] to-[#F2C230]" />
          <p className="text-base leading-relaxed text-gray-200 sm:text-lg">
            Digimedia es una empresa de marketing digital, que se enfoca en
            potenciar tu emprendimiento a nivel online. Además, te brinda
            diversas estrategias para que ayuden a cumplir tus objetivos de
            manera eficaz. Somos un grupo de personas comprometidas con el
            desarrollo de cada marca que nos contacta.
          </p>
        </div>
      </section>

      <div className="space-y-12 px-5 pb-8 sm:px-8 sm:pb-10 lg:px-12 lg:pb-12">
        <section>
          <h2 className="mx-auto mb-8 max-w-4xl text-center text-2xl font-bold text-[#F2C230] sm:text-3xl">
            Consejos para Maximizar el Impacto de tu Marketing Digital
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {consejos.map((text, index) => (
              <article
                key={text}
                className="rounded-[22px] border border-white/10 bg-gradient-to-br from-[#060126] to-[#0A0140] p-6 text-center shadow-xl"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#F2A30F] to-[#F2C230] text-2xl font-black text-[#060126]">
                  {index + 1}
                </div>
                <p className="leading-relaxed text-gray-200">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[24px] border border-white/10 bg-[#060126]/55 p-5 sm:p-8">
          <h2 className="mb-7 text-center text-2xl font-bold text-[#F2C230] sm:text-3xl">
            Galería
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {["/blog/blog-2.webp", "/blog/blog-9.webp"].map((src, index) => (
              <div
                key={src}
                className="group relative min-h-[260px] overflow-hidden rounded-[22px] border border-white/10 shadow-xl sm:min-h-[330px]"
              >
                <Image
                  src={src}
                  alt={`Imagen ${index + 1} del artículo`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060126]/45 to-transparent" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-[#F2C230] sm:text-3xl">
              Información Detallada
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {tarjetas.map((section) => (
              <article
                key={section.titulo}
                className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#060126]/65 p-6 shadow-xl sm:p-7"
              >
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#F2A30F] to-[#F2C230]" />
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#F2C230]/10 text-[#F2C230]">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#F2C230]">
                  {section.titulo}
                </h3>
                <p className="leading-relaxed text-gray-200">
                  {section.descripcion}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="flex justify-center pt-2">
          <Link
            href="/servicios/marketing-gestion"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#F2A30F] to-[#F2C230] px-8 py-3 text-center font-bold text-[#060126] shadow-lg transition-transform hover:-translate-y-0.5 hover:brightness-110"
          >
            Ver más información
          </Link>
        </div>
      </div>
    </article>
  );
}
