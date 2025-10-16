"user client";

import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const HeaderSection = () => (
  <div className="relative h-[400px] overflow-hidden">
    {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div> */}
    <Image
      src="/blog/blog-6.webp"
      alt="Mujer vestida formalmente sonriendo mientras habla por teléfono y sostiene una laptop"
      className="absolute inset-0 w-full h-full object-cover"
      width={400}
      height={400}
    />
    <div className="relative z-20 h-full flex flex-col justify-end p-8">
      <p className="select-none text-blue-400 mb-2 font-medium">
        {"2025-03-31"}
      </p>
      <h2 className="select-none text-4xl md:text-5xl  font-extrabold text-white mb-4 drop-shadow-lg">
        Branding <span className="text-blue-400">y</span> Diseño
      </h2>
    </div>
  </div>
);

const DescriptionSection = () => (
  <div className="relative mb-16 bg-white p-6 rounded-lg shadow-md -mt-12">
    <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 select-none"></span>

    <p className="text-lg leading-relaxed text-gray-700 ">
      Detrás de cada gran marca hay una historia que resuena. Tu PYME también
      merece una identidad que comunique su esencia y valores. Desde el logo
      hasta la paleta de colores, cada elemento es una oportunidad para destacar
      en el competitivo mercado digital peruano. Descubre cómo lograrlo sin
      necesidad de ser un experto en diseño.
    </p>
  </div>
);

const TipsList = ({ consejosBranding }) => (
  <div className="mb-16 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] text-center text-gray-100">
    <div className="flex items-center justify-center mb-4 select-none">
      <span className="h-0.5 w-12 bg-green-400 mr-4"></span>
      <h3 className="text-2xl font-bold text-green-400 ">
        Estrategias de Branding
      </h3>
      <span className="h-0.5 w-12 bg-green-400 ml-4"></span>
    </div>

    <ul className="list-none space-y-3 max-w-2xl mx-auto">
      {consejosBranding.map((text, index) => (
        <li
          key={`commend-${index}`}
          className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg"
        >
          <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
          <span className="text-left text-white/90">{text}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ImageGallery = ({ detailsImage }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
    {detailsImage.map((src, index) => (
      <div
        key={index}
        className="group relative overflow-hidden rounded-xl shadow-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <Image
          width={400}
          height={400}
          src={src}
          alt={`Imagen ${index + 1} del artículo`}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
          <div className="flex items-center justify-center">
            <span className="select-none cursor-pointer text-sm font-medium">
              Ver detalle
            </span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const BenefitCards = ({ cards, borderColors }) => (
  <div className="relative">
    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-center">
      <div className="select-none inline-block px-4 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
        Información Importante
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
      {cards.map((card, index) => (
        <div
          key={`benefit-${index}`}
          className={`p-6 rounded-lg shadow-md bg-gradient-to-t from-gray-900 to-gray-800 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
            borderColors[index % borderColors.length]
          }`}
        >
          <h3 className="text-xl  font-bold mb-3 text-blue-400">
            {card.titulo}
          </h3>
          <p className="text-gray-100">{card.descripcion}</p>
        </div>
      ))}
    </div>
  </div>
);

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

  const borderColors = [
    "border-l-4 border-blue-400",
    "border-r-4 border-red-400",
    "border-l-4 border-green-400",
    "border-r-4 border-purple-400",
  ];

  return (
    <div className="relative lg:mx-48 p-0 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] overflow-hidden">
      <HeaderSection />

      <div className="bg-black/5 p-8">
        <DescriptionSection />

        <TipsList consejosBranding={consejosBranding} />

        <ImageGallery detailsImage={detailsImage} />

        <BenefitCards cards={cards} borderColors={borderColors} />
      </div>

      <div className="flex justify-center mt-6 mb-10">
        <Link
          href="/servicios/branding-desing"
          className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-colors"
        >
          Ver más información
        </Link>
      </div>
    </div>
  );
}
