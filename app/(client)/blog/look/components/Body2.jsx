"use client";

import { Bookmark, CheckCircle, Clock, Share2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Body2() {
  const [activeTab, setActiveTab] = useState("info");

  const tarjetas = [
    {
      titulo: "Tendencias de Diseño Web en 2025",
      descripcion:
        "Las últimas tendencias en diseño web están marcando la pauta. Desde el uso de gradientes y microinteracciones hasta el minimalismo y las tipografías personalizadas. Mantente actualizado para que tu sitio web no pase desapercibido",
    },
    {
      titulo: "Herramientas para Desarrolladores Web",
      descripcion:
        "El mundo del desarrollo web evoluciona rápidamente. Aprende sobre las mejores herramientas y frameworks para optimizar tu flujo de trabajo, desde React hasta Tailwind CSS y nuevas alternativas en el backend.",
    },
    {
      titulo: "Optimización para Móviles y UX/UI",
      descripcion:
        "La experiencia del usuario es clave. Diseñar sitios web que sean fáciles de usar y que se adapten a todos los dispositivos es fundamental para mejorar la accesibilidad y la satisfacción del usuario.",
    },
    {
      titulo: "SEO y Performance en Desarrollo Web",
      descripcion:
        "Para lograr visibilidad en la web, el SEO es crucial. Además, optimizar la velocidad de carga y la performance de tu sitio web tiene un impacto directo en la experiencia del usuario y en el ranking de los motores de búsqueda.",
    },
  ];

  const consejos = [
    "Asegúrate de que tu sitio sea responsivo y accesible en todos los dispositivos.",
    "Utiliza colores y tipografías que sean legibles y complementen la marca.",
    "Optimiza la velocidad de carga de tu sitio web para una mejor experiencia de usuario.",
    "Incorpora microinteracciones y animaciones para hacer tu sitio más dinámico.",
    "Haz que la navegación sea simple y clara para facilitar la experiencia del usuario.",
  ];

  const tabs = [
    { id: "info", label: "Información" },
    { id: "tips", label: "Consejos" },
    { id: "gallery", label: "Galería" },
  ];

  return (
    <article className="relative mx-auto w-full max-w-[1180px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0A0140]/75 text-white shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-md">
      <section className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-12 lg:p-12">
        <div className="relative min-h-[280px] overflow-hidden rounded-[24px] border border-white/10 shadow-2xl sm:min-h-[360px]">
          <Image
            src="/blog/body2_titulo.webp"
            alt="Trabajando en un proyecto de diseño web"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060126]/75 via-transparent to-transparent" />
        </div>

        <div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Clock className="h-4 w-4 text-[#F2C230]" />
              <span>2025-03-31</span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Guardar artículo"
                className="rounded-full border border-white/10 bg-white/5 p-2.5 transition-colors hover:bg-white/10"
              >
                <Bookmark className="h-5 w-5 text-[#F2C230]" />
              </button>
              <button
                type="button"
                aria-label="Compartir artículo"
                className="rounded-full border border-white/10 bg-white/5 p-2.5 transition-colors hover:bg-white/10"
              >
                <Share2 className="h-5 w-5 text-[#F2C230]" />
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold uppercase leading-tight text-[#F2C230] sm:text-4xl lg:text-5xl">
            DISEÑO Y DESARROLLO WEB EN 2025
          </h1>
          <div className="my-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#F2A30F] to-[#F2C230]" />
          <p className="text-base leading-relaxed text-gray-200 sm:text-lg">
            El diseño y desarrollo web están en constante evolución. Desde la
            importancia de una buena experiencia de usuario hasta el uso de las
            últimas tecnologías, este artículo te ayudará a mantenerte al día con
            las mejores prácticas de diseño web para 2025.
          </p>
        </div>
      </section>

      <section className="mx-5 mb-5 overflow-hidden rounded-[24px] border border-white/10 bg-[#060126]/60 sm:mx-8 sm:mb-8 lg:mx-12 lg:mb-12">
        <div className="flex overflow-x-auto border-b border-white/10 px-3 sm:px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`min-w-fit px-5 py-5 text-sm font-semibold transition-colors sm:text-base ${
                activeTab === tab.id
                  ? "border-b-2 border-[#F2C230] text-[#F2C230]"
                  : "border-b-2 border-transparent text-gray-300 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5 sm:p-8 lg:p-10">
          {activeTab === "info" && (
            <div className="grid gap-5 md:grid-cols-2">
              {tarjetas.map((section) => (
                <article
                  key={section.titulo}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0A0140] to-[#060126] shadow-xl"
                >
                  <div className="h-1.5 bg-gradient-to-r from-[#F2A30F] to-[#F2C230]" />
                  <div className="p-6 sm:p-7">
                    <h2 className="mb-3 text-xl font-bold text-[#F2C230]">
                      {section.titulo}
                    </h2>
                    <p className="leading-relaxed text-gray-200">
                      {section.descripcion}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeTab === "tips" && (
            <div>
              <h2 className="mb-8 text-center text-2xl font-bold text-[#F2C230] sm:text-3xl">
                Consejos para Mejorar el Diseño Web
              </h2>
              <ul className="space-y-4">
                {consejos.map((text) => (
                  <li
                    key={text}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#0A0140]/80 p-5 sm:p-6"
                  >
                    <span className="rounded-full bg-[#F2C230] p-2 text-[#060126]">
                      <CheckCircle className="h-5 w-5" />
                    </span>
                    <p className="pt-1 leading-relaxed text-gray-200">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="grid gap-6 md:grid-cols-2">
              {["/blog/body2_galeria1.webp", "/blog/body2_galeria2.webp"].map(
                (src, index) => (
                  <div
                    key={src}
                    className="group relative min-h-[260px] overflow-hidden rounded-[24px] border border-white/10 shadow-2xl sm:min-h-[330px]"
                  >
                    <Image
                      src={src}
                      alt={`Imagen ${index + 1} del artículo`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060126]/50 to-transparent" />
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-[#F2A30F] to-[#F2C230] px-6 py-3 text-center text-sm font-bold text-[#060126] sm:text-base">
          © {new Date().getFullYear()} - Todos los derechos reservados
        </div>
      </section>

      <div className="flex justify-center px-5 pb-8 sm:px-8 lg:px-12 lg:pb-12">
        <Link
          href="/servicios/desing-desarrollo"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#F2A30F] to-[#F2C230] px-8 py-3 text-center font-bold text-[#060126] shadow-lg transition-transform hover:-translate-y-0.5 hover:brightness-110"
        >
          Ver más información
        </Link>
      </div>
    </article>
  );
}
