"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ServiceCard } from "./Servicios";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Se monta solo cuando Servicios.jsx detecta que la sección está cerca del
// viewport (IntersectionObserver). Vive en un archivo aparte para que el
// import de "swiper/react" quede en un chunk separado que no se descarga
// durante la carga inicial del Home.
export default function ServiciosCarrusel({ services }) {
  return (
    <>
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
            <ServiceCard service={service} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        className="hidden sm:flex absolute swiper-button-prev-services left-[-15px] md:left-[-25px] top-[45%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#100043]/85 hover:bg-[#ffb800] border border-[#ffb800]/30 hover:border-transparent text-white hover:text-[#100043] items-center justify-center transition-all duration-300 shadow-lg hover:shadow-[#ffb800]/20 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Anterior servicio"
      >
        <ArrowLeft size={20} strokeWidth={2.5} />
      </button>
      <button
        className="hidden sm:flex absolute swiper-button-next-services right-[-15px] md:right-[-25px] top-[45%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#100043]/85 hover:bg-[#ffb800] border border-[#ffb800]/30 hover:border-transparent text-white hover:text-[#100043] items-center justify-center transition-all duration-300 shadow-lg hover:shadow-[#ffb800]/20 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Siguiente servicio"
      >
        <ArrowRight size={20} strokeWidth={2.5} />
      </button>

      {/* Custom Pagination Bullet Container */}
      <div className="services-swiper-pagination flex justify-center items-center gap-2 mt-4" />

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
    </>
  );
}
