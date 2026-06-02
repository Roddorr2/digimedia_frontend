import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function Body1() {
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
    <div className="relative lg:mx-48 p-0 text-white rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-[0px_20px_40px_rgba(0,0,0,0.45)]">
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
        <Image
          src="/blog/blog-4.webp"
          alt="Reunion de un equipo de trabajo"
          className="absolute inset-0 w-full h-full object-cover"
          width={800}
          height={400}
        />
        <div className="relative z-20 h-full flex flex-col justify-end p-8">
          <p className="text-[#F2C230] mb-2 font-medium">2025-03-31</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            TU BAR EN LA MIRA
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#F2A30F] to-[#F2C230] rounded-full"></div>
        </div>
      </div>

      <div className="p-8">
        <div className="relative mb-16 bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl -mt-12">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#F2A30F] to-[#F2C230]"></div>
          <p className="text-lg leading-relaxed text-gray-200">
            Las luces neón LED se han convertido en un elemento diferenciador en
            el mundo de la hospitalidad. No solo son visualmente atractivos,
            sino que también refuerzan la identidad de tu negocio. En este
            artículo, exploraremos cómo las letras luminosas pueden marcar la
            diferencia en la experiencia de tus clientes.
          </p>
        </div>

        <div className="mb-16 p-6 bg-gradient-to-br from-[#060126] to-[#0A0140] rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] text-center text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="h-0.5 w-12 bg-[#F2A30F] mr-4"></div>
            <h3 className="text-2xl font-bold text-[#F2C230]">
              Consejos para Elegir el Letrero Perfecto
            </h3>
            <div className="h-0.5 w-12 bg-[#F2A30F] ml-4"></div>
          </div>
          <ul className="list-none space-y-3 max-w-2xl mx-auto">
            {[
              "Opta por colores que reflejen la personalidad de tu bar.",
              "Elige un diseño legible y atractivo.",
              "Considera el lugar de instalación para maximizar su impacto.",
              "Asegúrate de que la iluminación sea adecuada para resaltar el letrero.",
              "Utiliza materiales de alta calidad para garantizar la durabilidad.",
            ].map((text, index) => (
              <li
                key={`commend-${index}`}
                className="flex items-center gap-3 bg-white/10 p-3 rounded-lg"
              >
                <CheckCircle className="w-6 h-6 text-[#F2C230] flex-shrink-0" />
                <span className="text-left">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {[
            { src: "/blog/blog-10.webp", alt: "Imagen 1 del artículo" },
            { src: "/blog/blog-1.webp", alt: "Imagen 2 del artículo" },
          ].map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-white/10 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#060126]/95 via-[#0A0140]/70 to-transparent z-10"></div>
              <Image
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                width={400}
                height={256}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                <div className="flex items-center justify-center">
                  <span className="text-sm font-medium">Ver detalle</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-center">
            <div className="inline-block px-4 py-1 bg-[#F2A30F] text-[#060126] text-sm font-medium rounded-full">
              Información Importante
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
            {tarjetas.map((section, index) => {
              const styles = [
                "bg-white/10 backdrop-blur-md border-l-4 border-[#F2A30F]",
                "bg-white/10 backdrop-blur-md border-r-4 border-[#F2C230]",
                "bg-white/10 backdrop-blur-md border-l-4 border-[#F2A30F]",
                "bg-white/10 backdrop-blur-md border-r-4 border-[#F2C230]",
              ];
              return (
                <div
                  key={`tarjeta-${index}`}
                  className={`p-5 rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${styles[index % styles.length]}`}
                >
                  <h3 className="text-xl font-bold mb-3 text-[#F2C230]">
                    {section.titulo}
                  </h3>
                  <p className="text-gray-100">{section.descripcion}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
