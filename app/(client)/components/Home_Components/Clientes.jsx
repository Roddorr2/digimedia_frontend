"use client";
import Image from "next/image";

export default function Clientes() {
  // Aquí se verificarán las rutas de imágenes del home
  const clientes = [
    {
      src: "/image-home/contigo_voy color.webp",
      alt: "Contigo Voy logo",
      width: 200,
      height: 100,
    },

    {
      src: "/image-home/digimedia color.webp",
      alt: "Digimedia logo",
      width: 180,
      height: 95,
    },

    {
      src: "/image-home/nhl color.webp",
      alt: "NHL logo",
      width: 130,
      height: 75,
    },
    {
      src: "/image-home/tami color.webp",
      alt: "Tami logo",
      width: 190,
      height: 95,
    },
    {
      src: "/image-home/yuntas color.webp",
      alt: "Yuntas logo",
      width: 150,
      height: 75,
    },
    {
      src: "/image-home/prevemedic color.webp",
      alt: "prevemedic logo",
      width: 300,
      height: 100,
    },
    {
      src: "/image-home/mj-eventos color.png",
      alt: "MJ eventos logo",
      width: 180,
      height: 95,
    },
    {
      src: "/image-home/asden color.png",
      alt: "Asden logo",
      width: 100,
      height: 65,
    },
  ];

  return (
    <section className="my-6 mx-auto max-w-[1200px] px-6">
      <h2 className="text-4xl md:text-5xl text-[#b525fe] text-center md:text-left mb-0 mt-20">
        NUESTROS CLIENTES
      </h2>

      {/* Carrusel */}
      <div className="relative overflow-hidden">
        <style>{`
          @keyframes scrollClients {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50%)); }
          }
          .clients-marquee-container {
            position: relative;
          }
          .clients-marquee-container::before,
          .clients-marquee-container::after {
            content: '';
            position: absolute;
            top: 0;
            width: 80px;
            height: 100%;
            z-index: 10;
            pointer-events: none;
          }
          .clients-marquee-container::before {
            left: 0;
            background: linear-gradient(to right, rgba(255,255,255,0.9) 0%, transparent 100%);
          }
          .clients-marquee-container::after {
            right: 0;
            background: linear-gradient(to left, rgba(255,255,255,0.9) 0%, transparent 100%);
          }
          .clients-marquee {
            display: flex;
            animation: scrollClients 20s linear infinite;
            width: max-content;
          }
        `}</style>
        <div className="clients-marquee-container">
          <div className="flex clients-marquee">
          {[...clientes, ...clientes].map((cliente, index) => (
            <div key={index} className="flex-shrink-0 w-48 h-56 px-2">
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={cliente.src}
                  alt={cliente.alt}
                  width={cliente.width}
                  height={cliente.height}
                  className="object-contain max-w-full max-h-full"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
