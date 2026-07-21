"use client";

import { ArrowDownCircle, Calendar, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Body3() {
  const tarjetas = [
    {
      titulo: "Identidad Digital y Reconocimiento de Marca",
      descripcion:
        "Una gestión efectiva de redes sociales permite construir una imagen sólida y coherente de tu negocio. Tu marca se vuelve reconocible a través del contenido visual, el tono de comunicación y la interacción constante con la audiencia.",
    },
    {
      titulo: "Interacción y Fidelización de Clientes",
      descripcion:
        "Las redes sociales no solo son vitrinas, sino canales de diálogo. Escuchar, responder y generar contenido valioso crea una comunidad activa, lo que incrementa la fidelidad y la confianza del cliente.",
    },
    {
      titulo: "Monitoreo de Resultados y Optimización",
      descripcion:
        "El análisis de métricas como el alcance, la interacción y el crecimiento de seguidores permite ajustar las estrategias de contenido en tiempo real, maximizando el impacto de cada publicación.",
    },
    {
      titulo: "Aumento de Visibilidad y Oportunidades",
      descripcion:
        "Una presencia activa y bien gestionada en redes sociales puede llevar tu marca a nuevos públicos, generar leads y aumentar tus oportunidades de venta o colaboración.",
    },
  ];

  const consejos = [
    "Define claramente los objetivos de tu presencia digital.",
    "Planifica tu contenido con calendarios editoriales.",
    "Utiliza herramientas como Hootsuite o Meta Business Suite para automatizar.",
    "Analiza los resultados y ajusta tus estrategias regularmente.",
    "Mantén una identidad visual coherente en todas las plataformas.",
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
            GESTIÓN INTELIGENTE DE REDES
          </h1>

          <div className="my-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#F2A30F] to-[#F2C230]" />

          <p className="text-base leading-relaxed text-gray-200 sm:text-lg">
            Las redes sociales se han convertido en uno de los pilares de la
            estrategia digital moderna. Una buena gestión no solo mejora la
            presencia online, sino que potencia la conexión con los usuarios y
            la visibilidad de tu negocio.
          </p>

          <a
            href="#content-details"
            className="mt-6 inline-flex items-center font-semibold text-[#F2C230] transition-colors hover:text-white"
          >
            <span>Continuar leyendo</span>
            <ArrowDownCircle className="ml-2 h-5 w-5" />
          </a>
        </div>

        <div className="relative min-h-[300px] overflow-hidden rounded-[24px] border border-white/10 shadow-2xl sm:min-h-[390px]">
          <Image
            src="/blog/blog-11.webp"
            alt="Muchas interacciones en redes sociales"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060126]/45 to-transparent" />
        </div>
      </section>

      <div
        id="content-details"
        className="space-y-12 px-5 pb-8 sm:px-8 sm:pb-10 lg:px-12 lg:pb-12"
      >
        <section className="rounded-[24px] border border-white/10 bg-[#060126]/55 p-5 sm:p-8">
          <h2 className="mb-7 text-center text-2xl font-bold text-[#F2C230] sm:text-3xl">
            Galería
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {["/blog/blog-12.webp", "/blog/blog-1.webp"].map((src, index) => (
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
          <h2 className="mx-auto mb-8 max-w-3xl text-center text-2xl font-bold text-[#F2C230] sm:text-3xl">
            Consejos para una Gestión Efectiva
          </h2>

          <div className="flex flex-wrap justify-center gap-5">
            {consejos.map((text) => (
              <article
                key={text}
                className="flex min-h-[215px] w-full flex-col items-center justify-center rounded-[22px] border border-white/10 bg-gradient-to-br from-[#060126] to-[#0A0140] p-6 text-center shadow-xl md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.875rem)]"
              >
                <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#F2C230]/40 bg-[#F2C230]/10">
                  <CheckCircle className="h-6 w-6 text-[#F2C230]" />
                </div>

                <p className="max-w-[285px] leading-relaxed text-gray-200">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-8 text-center text-2xl font-bold text-[#F2C230] sm:text-3xl">
            Información Detallada
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {tarjetas.map((section, index) => (
              <article
                key={section.titulo}
                className={`rounded-[22px] border border-white/10 bg-[#060126]/65 p-6 shadow-xl sm:p-7 ${
                  index === 0 || index === tarjetas.length - 1
                    ? "md:col-span-2"
                    : ""
                }`}
              >
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

        <div className="flex justify-center border-t border-white/10 pt-2">
          <Link
            href="/servicios/gestion-redes"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#F2A30F] to-[#F2C230] px-8 py-3 text-center font-bold text-[#060126] shadow-lg transition-transform hover:-translate-y-0.5 hover:brightness-110"
          >
            Ver más información
          </Link>
        </div>
      </div>
    </article>
  );
}
