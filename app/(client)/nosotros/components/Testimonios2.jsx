"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { X } from "lucide-react";
import { getTestimonials } from "@/lib/testimonials";

import "swiper/css";
import "swiper/css/pagination";


// Avatar con fallback: si la imagen no carga, muestra las iniciales
// en vez de dejar el ícono de imagen rota (que descoloca el layout).

function Avatar({ src, name, size = 14 }) {
  const [failed, setFailed] = useState(false);
  // extrae las dos primeras iniciales del nombre
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const sizeClass = size === 14 ? "h-14 w-14" : "h-16 w-16";
  // si la img se rompe se muestra circulo con iniciales
  if (failed || !src) {
    return (
      <div
        className={`flex ${sizeClass} flex-shrink-0 items-center justify-center rounded-full bg-[#ffb800]/15 text-base font-semibold text-[#ffb800] ring-1 ring-[#ffb800]/30`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={56}
      height={56}
      onError={() => setFailed(true)}
      className={`${sizeClass} flex-shrink-0 rounded-full bg-white/10 object-cover ring-1 ring-white/10`}
    />
  );
}

// Umbral de caracteres a partir del cual mostramos "Leer más".
// Aproximadamente lo que entra en 5 líneas dentro de la card.
const TRUNCATE_LIMIT = 220;
const GOOGLE_MAPS_REVIEWS_URL = "https://www.google.com/maps/place/Agencia+de+Marketing+Digital+en+Lima+Per%C3%BA+-+DigiMedia/@-12.057454,-77.0277795,1103m/data=!3m1!1e3!4m8!3m7!1s0x9105c981108188a1:0x2bce3907b5bcb3ec!8m2!3d-12.0574593!4d-77.0252046!9m1!1b1!16s%2Fg%2F11fml3rlc6?entry=ttu&g_ep=EgoyMDI2MDcxMi4wIKXMDSoASAFQAw%3D%3D";

// testimonios de respaldo
const fallbackTestimonials  = [
  {
    id: 1,
    name: "Geraldine",
    date: "Hace 3 meses",
    rating: 5,
    text: "Desde mi experiencia, DigiMedia Marketing es una agencia que realmente aporta valor, destacando por su enfoque estratégico y su capacidad para proponer soluciones creativas y adaptadas a cada necesidad. Se nota un equipo con conocimiento del entorno digital, orientado a resultados y con una ejecución eficiente en cada acción. Además, mantienen una comunicación clara y constante, lo que facilita el trabajo y genera confianza. Gracias a su gestión, se logra fortalecer la presencia online y la conexión con la audiencia, convirtiéndose en una excelente opción para quienes buscan crecer en el mundo digital.",
  },
  {
    id: 2,
    name: "Paola Jibaja",
    date: "Hace 2 meses",
    rating: 4,
    text: "Trabajar con DigMedia Marketing ha sido una muy buena decisión. Destacan por su conocimiento actualizado en estrategias digitales y por saber adaptar cada acción a los objetivos del negocio. Me gustó especialmente su enfoque práctico y orientado a resultados, sin complicaciones innecesarias. El trato del equipo es cercano y profesional, y se nota el compromiso que tienen con cada proyecto. Totalmente recomendables para quienes buscan crecer en el entorno digital.",
  },
{
    id: 3,
    name: "Renzo Aquino",
    date: "Hace 1 mes",
    rating: 5,
    text: "El equipo de DigiMedia entendió rápido lo que necesitábamos y propuso una estrategia clara desde la primera reunión. La comunicación fue constante durante todo el proyecto y los resultados en redes se notaron desde el primer mes. Muy recomendados para negocios que recién empiezan a invertir en digital.",
  },
{
    id: 4,
    name: "Lucía Fernández",
    date: "Hace 5 meses",
    rating: 5,
    text: "Contratamos a DigiMedia para reordenar nuestra presencia digital y superaron las expectativas. Son organizados, cumplen los tiempos acordados y siempre están abiertos a explicar el porqué de cada decisión. Se siente que realmente les importa el crecimiento del cliente y no solo entregar un reporte mensual.",
  },
{
    id: 5,
    name: "Miguel Torres",
    date: "Hace 4 meses",
    rating: 4,
    text: "Buena experiencia en general con el equipo de DigiMedia. Destaco su capacidad de adaptarse cuando cambiamos el enfoque de campaña a mitad de camino y su disposición para explicar las métricas en términos simples. Sería ideal que la entrega de reportes fuera un poco más rápida, pero el resultado final valió la pena.",
  },
{
    id: 6,
    name: "Andrea Salazar",
    date: "Hace 3 meses",
    rating: 5,
    text: "Desde que trabajamos con DigiMedia notamos un antes y un después en cómo se percibe nuestra marca en redes. El equipo propone contenido creativo pero siempre alineado a los objetivos del negocio, y el soporte ante cualquier duda es rápido. Totalmente recomendados para quienes buscan una agencia comprometida.",
  }];

export default function Testimonials() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeReview, setActiveReview] = useState(null);
  const [reviews, setReviews] = useState(null); // null = aún cargando

  useEffect(() => {
    let cancelled = false;

    getTestimonials().then((data) => {
      if (!cancelled) setReviews(data);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (reviews === null) return null; // esperando la respuesta de la API

  const testimonialsData = reviews.length > 0 ? reviews : fallbackTestimonials;

  if (testimonialsData.length === 0) return null; // no renderiza nada si no hay testimonios de bd ni del fallbackk

  return (
    <section
      className="w-full relative pt-20 pb-8 md:pb-20 px-4 md:px-12 overflow-hidden"
    >
      {/* Background decorations para mantener consistencia con Servicios */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#ffb800]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#b525fe]/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Título */}
        <div className="mb-14 text-center max-w-4xl mx-auto">
          <span className="text-[#ffb800] font-black text-sm uppercase tracking-[0.25em]">
            Testimonios
          </span>

          <h2 className="mt-3 text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
            Lo que opinan nuestros clientes
          </h2>

          <div className="h-1.5 w-24 bg-[#ffb800] mx-auto my-6 rounded-full shadow-[0_0_10px_rgba(255,184,0,0.6)]" />

          <p className="mx-auto max-w-2xl text-gray-300 text-[15px] md:text-lg leading-relaxed">
            Empresas y emprendedores que confiaron en{" "}
            <span className="text-[#ffb800] font-medium">Digimedia</span>{" "}
            para potenciar su imagen.
          </p>
        </div>

        <div className="relative px-2 md:px-14">
          {/* Flechas de navegación */}
          <button
            ref={prevRef}
            type="button"
            aria-label="Testimonio anterior"
            className="hidden absolute left-0 top-1/2 z-30 sm:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#100043]/85 border border-[#ffb800]/30 text-white shadow-lg transition-all duration-300 hover:bg-[#ffb800] hover:text-[#100043] hover:border-transparent hover:shadow-[#ffb800]/20 md:-left-3"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            ref={nextRef}
            type="button"
            aria-label="Siguiente testimonio"
            className="hidden absolute right-0 top-1/2 z-30 sm:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#100043]/85 border border-[#ffb800]/30 text-white shadow-lg transition-all duration-300 hover:bg-[#ffb800] hover:text-[#100043] hover:border-transparent hover:shadow-[#ffb800]/20 md:-right-3"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {/* Carrusel principal de Swiper */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{
              clickable: true,
              bulletClass: "testimonials-bullet",
              bulletActiveClass: "testimonials-bullet-active",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop
            spaceBetween={24}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
            className="!pb-8 md:!pb-14"
          >
            {/* Renderiza una card por cada testimonio */}
            {testimonialsData.map((review) => {
              const isLong = review.text.length > TRUNCATE_LIMIT;

              return (
                <SwiperSlide key={review.id} className="h-auto py-2">
                  <div className="flex h-[340px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-[8px] p-7 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#ffb800]/50 hover:bg-[#100043]/60">
                    {/* Header */}
                    <div className="mb-5 flex flex-col-reverse sm:flex-row items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-4">
                        <Avatar src={review.avatar} name={review.name} />

                        <div className="min-w-0">
                          <h3 className="truncate font-semibold text-white">
                            {review.name}
                          </h3>

                          <p className="text-sm text-gray-400">
                            {review.date}
                          </p>
                        </div>
                      </div>

                      <a
                        href={GOOGLE_MAPS_REVIEWS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Ver reseñas en Google Maps"
                        className="flex-shrink-0"
                      >
                        <img
                          src="/Img-nosotros/logo_google1.webp"
                          alt="Google"
                          width={28}
                          height={28}
                          className="h-7 w-auto opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                        />
                      </a>
                    </div>
                    {/* Estrellas */}
                    <div className="mb-5 flex flex-shrink-0">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={`h-5 w-5 ${
                            index < review.rating
                              ? "text-[#ffb800] drop-shadow-[0_0_4px_rgba(255,184,0,0.5)]"
                              : "text-white/15"
                          }`}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Comentario */}
                    <p className="flex-grow overflow-hidden whitespace-pre-line leading-7 text-gray-300 line-clamp-5">
                      &quot;{review.text}&quot;
                    </p>

                    {/* Botón "Leer más" solo si el texto no cabe */}
                    {isLong && (
                      <button
                        type="button"
                        onClick={() => setActiveReview(review)}
                        className="mt-3 self-start text-sm font-semibold text-[#ffb800] transition-colors hover:text-white"
                      >
                        Leer más
                      </button>
                    )}
                  </div>
                </SwiperSlide>
              
              );
              
            })}
            
          </Swiper>

          {/* Paginación custom */}
          <div className="flex justify-center items-center gap-2 mt-2 md:mt-4 testimonials-pagination" />
        </div>
      </div>

      {/* Modal con el testimonio completo */}
      {activeReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={() => setActiveReview(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-[#ffb800]/30 bg-[#100043] p-8 shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, #100043 0%, #130049 50%, #2a0866 100%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setActiveReview(null)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-[#ffb800]/50 hover:text-[#ffb800]"
            >
              <X size={18} />
            </button>

            <div className="mb-5 flex items-center gap-4">
              <Avatar src={activeReview.avatar} name={activeReview.name} size={16} />
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-white">
                  {activeReview.name}
                </h3>
                <p className="text-sm text-gray-400">{activeReview.date}</p>
              </div>
            </div>

            <div className="mb-4 flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`h-5 w-5 ${
                    index < activeReview.rating
                      ? "text-[#ffb800] drop-shadow-[0_0_4px_rgba(255,184,0,0.5)]"
                      : "text-white/15"
                  }`}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="max-h-[50vh] overflow-y-auto whitespace-pre-line leading-7 text-gray-200 pr-2">
              &quot;{activeReview.text}&quot;
            </p>
          </div>
        </div>
      )}

      {/* Estilos custom para los bullets */}
      <style>{`
        .testimonials-bullet {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.35);
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
          margin: 0 4px;
        }
        .testimonials-bullet-active {
          width: 24px;
          background-color: #ffb800;
          box-shadow: 0 0 12px rgba(255, 184, 0, 0.6);
        }
        .testimonials-bullet:hover {
          background-color: rgba(255, 184, 0, 0.8);
        }
      `}</style>
    </section>
  );
}