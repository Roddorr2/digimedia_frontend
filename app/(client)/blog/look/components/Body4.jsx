"use client";

import { ArrowDownCircle, ArrowRight, Calendar, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Body4() {
  const cards = [
    {
      titulo: "Diferenciación Digital para tu Negocio",
      descripcion:
        "Un branding digital bien diseñado hace que tu PYME destaque en el competitivo mercado peruano. Creamos identidades visuales memorables que comunican tu esencia y te hacen reconocible ante tu audiencia.",
    },
    {
      titulo: "Experiencia de Cliente Coherente",
      descripcion:
        "Cada punto de contacto (web, redes, físico) debe reflejar tu identidad. Diseñamos sistemas visuales que generan confianza y profesionalismo, clave para fidelizar clientes.",
    },
    {
      titulo: "Eficiencia en Comunicación Visual",
      descripcion:
        "Optimizamos tus recursos gráficos para que sean versátiles (desde tarjetas hasta banners digitales), asegurando coherencia y ahorro de tiempo en tu operación diaria.",
    },
    {
      titulo: "Branding que Atrae Inversiones",
      descripcion:
        "Una imagen corporativa sólida aumenta tu credibilidad ante socios y clientes. Desarrollamos activos visuales que comunican crecimiento y seriedad para escalar tu negocio.",
    },
  ];

  const consejosBranding = [
    "Desarrolla una identidad visual que funcione tanto digital como físicamente (responsive branding)",
    "Tu logo debe ser reconocible incluso como favicon (16x16px) o en dispositivos móviles",
    "Diseña un sistema de iconografía único para tus comunicaciones digitales",
    "Invierte en fotografía profesional que muestre tu producto/servicio en contexto real peruano",
    "Desarrolla plantillas unificadas para presentaciones, emails y redes sociales",
  ];

  const detailsImage = [
    "/servicios/branding/combinar_colores.webp",
    "/blog/blog-3.webp",
  ];

  return (
    <article className="relative mx-auto w-full max-w-[1180px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0A0140]/75 text-white shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-md">
      <section className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-12 lg:p-12">
        <div>
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-300">
            <Calendar className="h-4 w-4 text-[#F2C230]" />
            <span>2025-03-31</span>
          </div>

          <h1 className="text-3xl font-black leading-tight text-[#F2C230] sm:text-4xl lg:text-5xl">
            BRANDING Y DISEÑO
          </h1>

          <div className="my-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#F2A30F] to-[#F2C230]" />

          <p className="text-base leading-relaxed text-gray-200 sm:text-lg">
            Detrás de cada gran marca hay una historia que resuena. Tu PYME
            también merece una identidad que comunique su esencia y valores.
            Desde el logo hasta la paleta de colores, cada elemento es una
            oportunidad para destacar en el competitivo mercado digital
            peruano. Descubre cómo lograrlo sin necesidad de ser un experto en
            diseño.
          </p>

          <a
            href="#branding-content"
            className="mt-6 inline-flex items-center font-semibold text-[#F2C230] transition-colors hover:text-white"
          >
            <span>Continuar leyendo</span>
            <ArrowDownCircle className="ml-2 h-5 w-5" />
          </a>
        </div>

        <div className="relative min-h-[300px] overflow-hidden rounded-[24px] border border-white/10 shadow-2xl sm:min-h-[390px]">
          <Image
            src="/blog/blog-6.webp"
            alt="Mujer vestida formalmente sonriendo mientras habla por teléfono y sostiene una laptop"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060126]/45 to-transparent" />
        </div>
      </section>

      <div
        id="branding-content"
        className="space-y-12 px-5 pb-8 sm:px-8 sm:pb-10 lg:px-12 lg:pb-12"
      >
        <section>
          <h2 className="mx-auto mb-8 max-w-3xl text-center text-2xl font-bold text-[#F2C230] sm:text-3xl">
            Estrategias de Branding
          </h2>

          <div className="flex flex-wrap justify-center gap-5">
            {consejosBranding.map((text) => (
              <article
                key={text}
                className="flex min-h-[220px] w-full flex-col items-center justify-center rounded-[22px] border border-white/10 bg-gradient-to-br from-[#060126] to-[#0A0140] p-6 text-center shadow-xl md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.875rem)]"
              >
                <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#F2C230]/40 bg-[#F2C230]/10">
                  <CheckCircle className="h-6 w-6 text-[#F2C230]" />
                </div>

                <p className="max-w-[290px] leading-relaxed text-gray-200">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[24px] border border-white/10 bg-[#060126]/55 p-5 sm:p-8">
          <h2 className="mb-7 text-center text-2xl font-bold text-[#F2C230] sm:text-3xl">
            Galería
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {detailsImage.map((src, index) => (
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

                <div className="absolute inset-0 bg-gradient-to-t from-[#060126]/70 via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 z-10 flex translate-y-full items-center justify-center bg-[#060126]/75 p-4 text-white backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
                  <span className="text-sm font-medium">Ver detalle</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-8 text-center text-2xl font-bold text-[#F2C230] sm:text-3xl">
            Información Importante
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {cards.map((card, index) => (
              <article
                key={card.titulo}
                className={`rounded-[22px] border border-white/10 bg-[#060126]/65 p-6 shadow-xl sm:p-7 ${
                  index === 0 || index === cards.length - 1
                    ? "md:col-span-2"
                    : ""
                }`}
              >
                <h3 className="mb-3 text-xl font-bold text-[#F2C230]">
                  {card.titulo}
                </h3>

                <p className="leading-relaxed text-gray-200">
                  {card.descripcion}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="flex justify-center border-t border-white/10 pt-2">
          <Link
            href="/servicios/branding-desing"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#F2A30F] to-[#F2C230] px-8 py-3 text-center font-bold text-[#060126] shadow-lg transition-transform hover:-translate-y-0.5 hover:brightness-110"
          >
            Ver más información
          </Link>
        </div>
      </div>
    </article>
  );
}
