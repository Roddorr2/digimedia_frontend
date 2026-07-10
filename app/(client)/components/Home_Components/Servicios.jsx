"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Servicios() {
  const services = [
    {
      category: "IDENTIDAD DE MARCA",
      title: "BRANDING Y DISEÑO",
      desc: "Construimos identidades de marca memorables, fuertes y con personalidad propia para posicionar tu negocio en el mercado de manera única.",
      href: "/servicios/branding-desing",
      imgSrc: "/image-home/branding-diseno-service.webp",
      btnText: "VER DETALLES",
    },
    {
      category: "INGENIERÍA DIGITAL",
      title: "DISEÑO Y DESARROLLO WEB",
      desc: "Creamos sitios web de alta velocidad, optimizados para buscadores y con un diseño de interfaz intuitivo que convierte visitas en clientes.",
      href: "/servicios/desing-desarrollo",
      imgSrc: "/image-home/diseno-desarrollo-web-service.webp",
      btnText: "EXPLORAR SOLUCIONES",
    },
    {
      category: "CRECIMIENTO ACELERADO",
      title: "MARKETING Y GESTIÓN DIGITAL",
      desc: "Diseñamos estrategias integrales de marketing en motores de búsqueda, pautas publicitarias efectivas y embudos enfocados en maximizar tus retornos.",
      href: "/servicios/marketing-gestion",
      imgSrc: "/image-home/marketing-digital-service.webp",
      btnText: "IMPULSAR NEGOCIO",
    },
    {
      category: "CONEXIÓN DE AUDIENCIAS",
      title: "GESTIÓN DE REDES SOCIALES",
      desc: "Potenciamos tu presencia digital, creando comunidades activas y contenido estratégico de valor que conecta emocionalmente con tu público objetivo.",
      href: "/servicios/gestion-redes",
      imgSrc: "/image-home/redes-sociales-service.webp",
      btnText: "CONECTAR AHORA",
    },
  ];

  return (
    <section
      className="w-full relative py-20 px-4 md:px-12 overflow-hidden bg-black"
      id="services"
      style={{
        background:
          "linear-gradient(135deg, #100043 0%, #130049 40%, #410c89 100%)",
      }}
    >
      {/* Background decorations for a premium look */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#ffb800]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#b525fe]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-[1450px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-[#ffb800] font-black text-3xl md:text-5xl mb-4 tracking-tight uppercase">
            Nuestros Servicios
          </h2>
          <div className="h-1.5 w-24 bg-[#ffb800] mx-auto mb-6 rounded-full shadow-[0_0_10px_rgba(255,184,0,0.6)]" />
          <p className="text-gray-200 text-[15px] md:text-lg leading-relaxed px-4 md:px-0">
            Digimedia es una empresa de marketing digital que impulsa{" "}
            <span className="text-[#ffb800] font-medium">
              emprendimientos en línea
            </span>{" "}
            mediante estrategias eficaces, enfocada en el{" "}
            <span className="text-[#ffb800] font-medium">
              crecimiento y desarrollo
            </span>{" "}
            de cada marca.
          </p>
        </div>

        {/* Swiper Slider Container */}
        <div className="relative px-2 md:px-12">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: ".services-swiper-pagination",
              bulletClass: "services-bullet",
              bulletActiveClass: "services-bullet-active",
            }}
            navigation={{
              nextEl: ".swiper-button-next-services",
              prevEl: ".swiper-button-prev-services",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="w-full pb-14"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index} className="h-auto py-2">
                <Link
                  href={service.href}
                  className="group relative block w-full h-[460px] sm:h-[540px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 border border-white/5 hover:border-[#ffb800]/50 hover:-translate-y-2 flex flex-col justify-end"
                >
                  {/* Background Image */}
                  <Image
                    src={service.imgSrc}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-500 z-10" />

                  {/* Glowing Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#410c89]/30 via-transparent to-[#ffb800]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                  {/* Glassmorphism Panel positioned at the bottom of the card to fully appreciate the background image */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] p-6 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-[8px] group-hover:bg-[#100043]/85 group-hover:border-[#ffb800]/60 transition-all duration-500 flex flex-col items-center justify-center text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] z-20">
                    {/* Category Subtitle */}
                    <span className="text-[#ffb800] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-1.5 block drop-shadow-sm">
                      {service.category}
                    </span>

                    {/* Main Title */}
                    <h3 className="text-white group-hover:text-[#ffb800] font-black text-base md:text-xl lg:text-2xl leading-tight uppercase transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Collapsible content area: expands smoothly on hover */}
                    <div className="max-h-0 opacity-0 group-hover:max-h-[220px] group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden flex flex-col items-center">
                      <div className="w-12 h-[1.5px] bg-[#ffb800] my-3" />

                      {/* Description Text */}
                      <p className="text-gray-200 text-xs md:text-sm leading-relaxed max-w-[280px] mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                        {service.desc}
                      </p>

                      {/* Styled Call to Action Button */}
                      <span className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-white/20 text-white text-xs font-bold tracking-wider uppercase transition-all duration-500 hover:bg-[#ffb800] hover:text-[#100043] hover:border-transparent">
                        {service.btnText}{" "}
                        <ArrowRight
                          size={12}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button
            className="swiper-button-prev-services absolute left-[-15px] md:left-[-25px] top-[45%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#100043]/85 hover:bg-[#ffb800] border border-[#ffb800]/30 hover:border-transparent text-white hover:text-[#100043] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-[#ffb800]/20 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Anterior servicio"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>
          <button
            className="swiper-button-next-services absolute right-[-15px] md:right-[-25px] top-[45%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#100043]/85 hover:bg-[#ffb800] border border-[#ffb800]/30 hover:border-transparent text-white hover:text-[#100043] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-[#ffb800]/20 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Siguiente servicio"
          >
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>

          {/* Custom Pagination Bullet Container */}
          <div className="services-swiper-pagination flex justify-center items-center gap-2 mt-4" />
        </div>
      </div>

      {/* Custom Styles Inject for Swiper pagination bullets */}
      <style>{`
        .services-bullet {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.35);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .services-bullet-active {
          width: 24px;
          background-color: #ffb800;
          box-shadow: 0 0 12px rgba(255, 184, 0, 0.6);
        }
        .services-bullet:hover {
          background-color: rgba(255, 184, 0, 0.8);
        }
      `}</style>
    </section>
  );
}
