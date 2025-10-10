"use client";

import {
  CheckCircle,
  Calendar,
  ArrowDownCircle,
  ExternalLink,
} from "lucide-react";
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

export default function Body5() {
  return (
    <div className="container mx-auto px-4 py-12 relative bg-gradient-to-r text-black min-h-screen w-full">
      <div className="hidden lg:block w-20 xl:w-24 2xl:w-32 bg-gradient-to-b from-red-700 via-sky to-blue-800 fixed left-0 top-0 h-full -z-10"></div>

      <div className="relative lg:mx-48 bg-white text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 py-3 px-6 flex justify-between items-center">
          <div className="flex items-center text-white">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">2025-03-31</span>
          </div>
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-white/70"></div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-100 to-transparent"></div>
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-black text-indigo-900 leading-tight mb-6">
                MARKETING Y GESTIÓN DIGITAL
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-6"></div>
              <p className="text-lg text-justify text-gray-700 leading-relaxed">
                Digimedia es una empresa de marketing digital, que se enfoca en
                potenciar tu emprendimiento a nivel online. Además, te brinda
                diversas estrategias para que ayuden a cumplir tus objetivos de
                manera eficaz. Somos un grupo de personas comprometidas con el
                desarrollo de cada marca que nos contacta.
              </p>
              <button className="mt-6 inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                <span>Continuar leyendo</span>
                <ArrowDownCircle className="ml-2 w-5 h-5" />
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur"></div>
                <div className="relative">
                  <Image
                    src="/blog/blog-1.webp"
                    alt="Persona viendo estadísticas en su celular y computadora"
                    className="w-[22rem] h-[22rem] rounded-2xl shadow-lg object-cover relative z-10"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-indigo-100 rounded-full z-0"></div>
                <div className="absolute -top-3 -left-3 w-16 h-16 bg-purple-100 rounded-full z-0"></div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="content-details"
          className="p-8 md:p-12 bg-gradient-to-b from-white to-indigo-50"
        >
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-white font-bold mr-3">
                G
              </div>
              <h2 className="text-2xl font-bold text-indigo-900">Galería</h2>
              <div className="h-px flex-grow bg-indigo-200 ml-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {["/blog/blog-2.webp", "/blog/blog-9.webp"].map((src, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image
                    width={400}
                    height={400}
                    src={src}
                    alt={`Imagen ${index + 1} del artículo`}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg">
                      <ExternalLink className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-3">
                C
              </div>
              <h2 className="text-2xl font-bold text-green-600">
                Consejos para Maximizar el Impacto de tu Marketing Digital
              </h2>
              <div className="h-px flex-grow bg-green-200 ml-4"></div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-indigo-50 rounded-xl p-6 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Define claramente tu público objetivo antes de crear cualquier campaña para asegurar que tus esfuerzos de marketing estén dirigidos a las personas adecuadas.",
                  "Aprovecha el poder del contenido visual: las imágenes y videos atractivos aumentan significativamente el engagement y la tasa de conversión en las redes sociales.",
                  "Mantén la consistencia en tus mensajes de marca en todas las plataformas digitales para construir una identidad fuerte y reconocible.",
                  "Mide y analiza los resultados de cada campaña. Utiliza herramientas de análisis para ajustar y mejorar continuamente tu estrategia de marketing digital.",
                  "No olvides la optimización para dispositivos móviles. Asegúrate de que tu sitio web y campañas sean completamente funcionales y atractivos en teléfonos y tabletas.",
                ]

                  .filter((text) => text)
                  .map((text, index) => (
                    <div
                      key={`commend-${index}`}
                      className="flex items-start p-4  bg-white rounded-lg shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow"
                    >
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                      <p className="text-gray-700">{text}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
                I
              </div>
              <h2 className="text-2xl font-bold text-blue-600">
                Información Detallada
              </h2>
              <div className="h-px flex-grow bg-blue-200 ml-4"></div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-100 rounded-full opacity-70"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-100 rounded-full opacity-70"></div>

              <div className="relative z-10">
                {tarjetas.map((section, index) => {
                  const isEven = index % 2 === 0;

                  return (
                    <div
                      key={`tarjeta-${index}`}
                      className={`mb-8 flex flex-col ${
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      } bg-white rounded-xl overflow-hidden shadow-md`}
                    >
                      <div
                        className={`md:w-1/3 bg-gradient-to-br ${
                          isEven
                            ? "from-blue-600 to-indigo-700"
                            : "from-indigo-700 to-purple-800"
                        } p-6 flex items-center justify-center`}
                      >
                        <h3 className="text-2xl font-bold text-white text-center">
                          {section.titulo}
                        </h3>
                      </div>
                      <div className="md:w-2/3 p-6">
                        <p className="text-gray-700 leading-relaxed">
                          {section.descripcion}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
      </div>

      <div className="flex justify-center mt-6 mb-10">
        <Link
          href="/servicios/marketing-gestion"
          className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-colors"
        >
          Ver más información
        </Link>
      </div>
    </div>
  );
}
