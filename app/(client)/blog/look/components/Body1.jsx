import {
  ArrowDownCircle,
  ArrowRight,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

export default function Body1() {
  const consejos = [
    "Opta por colores que reflejen la personalidad de tu bar.",
    "Elige un diseño legible y atractivo.",
    "Considera el lugar de instalación para maximizar su impacto.",
    "Asegúrate de que la iluminación sea adecuada para resaltar el letrero.",
    "Utiliza materiales de alta calidad para garantizar la durabilidad.",
  ];

  const tarjetas = [
    {
      titulo: "El Factor Sorpresa y Distinción",
      descripcion:
        "Las letras de neón LED permiten personalizar la imagen de tu local, haciendo que el nombre de tu bar sea visible desde lejos. Un diseño llamativo puede convertirse en un sello distintivo y en un punto de referencia para los clientes.",
    },
    {
      titulo: "Ambiente y Experiencia Visual",
      descripcion:
        "La iluminación juega un papel crucial en la atmósfera de un bar. Los colores vibrantes y cálidos del neón LED pueden transformar un espacio ordinario en un entorno acogedor e instagrameable.",
    },
    {
      titulo: "Eficiencia Energética y Durabilidad",
      descripcion:
        "A diferencia del neón tradicional, las luces LED son más eficientes, consumen menos energía y tienen una vida útil más prolongada.",
    },
    {
      titulo: "Marketing y Atracción de Clientes",
      descripcion:
        "Un letrero de neón LED bien diseñado es una herramienta de marketing poderosa, capaz de captar la atención y aumentar la visibilidad de tu local.",
    },
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
            TU BAR EN LA MIRA
          </h1>

          <div className="my-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#F2A30F] to-[#F2C230]" />

          <p className="text-base leading-relaxed text-gray-200 sm:text-lg">
            Las luces neón LED se han convertido en un elemento diferenciador en
            el mundo de la hospitalidad. No solo son visualmente atractivos,
            sino que también refuerzan la identidad de tu negocio. En este
            artículo, exploraremos cómo las letras luminosas pueden marcar la
            diferencia en la experiencia de tus clientes.
          </p>

          <a
            href="#contenido-tu-bar"
            className="mt-6 inline-flex items-center font-semibold text-[#F2C230] transition-colors hover:text-white"
          >
            <span>Continuar leyendo</span>
            <ArrowDownCircle className="ml-2 h-5 w-5" />
          </a>
        </div>

        <div className="relative min-h-[300px] overflow-hidden rounded-[24px] border border-white/10 shadow-2xl sm:min-h-[390px]">
          <Image
            src="/blog/blog-4.webp"
            alt="Reunion de un equipo de trabajo"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060126]/45 to-transparent" />
        </div>
      </section>

      <div
        id="contenido-tu-bar"
        className="space-y-12 px-5 pb-8 sm:px-8 sm:pb-10 lg:px-12 lg:pb-12"
      >
        <section className="rounded-[24px] border border-white/10 bg-[#060126]/55 p-5 sm:p-8">
          <h2 className="mb-7 text-center text-2xl font-bold text-[#F2C230] sm:text-3xl">
            Galería
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              { src: "/blog/blog-10.webp", alt: "Imagen 1 del artículo" },
              { src: "/blog/blog-1.webp", alt: "Imagen 2 del artículo" },
            ].map((image) => (
              <div
                key={image.src}
                className="group relative min-h-[260px] overflow-hidden rounded-[22px] border border-white/10 shadow-xl sm:min-h-[330px]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
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
          <h2 className="mx-auto mb-8 max-w-3xl text-center text-2xl font-bold text-[#F2C230] sm:text-3xl">
            Consejos para Elegir el Letrero Perfecto
          </h2>

          <div className="flex flex-wrap justify-center gap-5">
            {consejos.map((consejo) => (
              <article
                key={consejo}
                className="flex min-h-[210px] w-full flex-col items-center justify-center rounded-[22px] border border-white/10 bg-gradient-to-br from-[#060126] to-[#0A0140] p-6 text-center shadow-xl md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.875rem)]"
              >
                <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#F2C230]/40 bg-[#F2C230]/10">
                  <CheckCircle className="h-6 w-6 text-[#F2C230]" />
                </div>

                <p className="max-w-[280px] leading-relaxed text-gray-200">
                  {consejo}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-8 text-center text-2xl font-bold text-[#F2C230] sm:text-3xl">
            Información Importante
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {tarjetas.map((tarjeta, index) => (
              <article
                key={tarjeta.titulo}
                className={`rounded-[22px] border border-white/10 bg-[#060126]/65 p-6 shadow-xl sm:p-7 ${
                  index === 0 || index === tarjetas.length - 1
                    ? "md:col-span-2"
                    : ""
                }`}
              >
                <h3 className="mb-3 text-xl font-bold text-[#F2C230]">
                  {tarjeta.titulo}
                </h3>

                <p className="leading-relaxed text-gray-200">
                  {tarjeta.descripcion}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
