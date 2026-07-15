"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Loader2, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import Fetch from "../services/fetch";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const getBackgroundStyle = (bgColor = "#000118", bgType = "solid", bgColors = "") => {
  if (bgType === "gradient" && bgColors) {
    const parts = bgColors.split(",").map(c => c.trim()).filter(Boolean);
    let direction = "";
    let colorParts = parts;
    if (parts[0]?.startsWith("to ")) {
      direction = parts[0];
      colorParts = parts.slice(1);
    }
    if (colorParts.length >= 3) {
      return { backgroundImage: `linear-gradient(${direction || "135deg"}, ${colorParts[0]}, ${colorParts[1]}, ${colorParts[2]})` };
    }
    if (colorParts.length >= 2) {
      return { backgroundImage: `linear-gradient(${direction || "to right"}, ${colorParts[0]}, ${colorParts[1]})` };
    }
  }
  return { backgroundColor: bgColor };
};

export default function Body1({ id_blog_body, fecha, bg_color, bg_type, bg_colors }) {
  const [data, setDataResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function renderDescripcion(texto, palabraClave, enlace) {
    if (!palabraClave || !enlace) return texto;
    const regex = new RegExp(`(${palabraClave})`, "gi");
    const partes = texto.split(regex);
    return partes.map((parte, i) => {
      if (parte.toLowerCase() === palabraClave.toLowerCase()) {
        return (
          <a key={i} href={enlace} target="_blank" rel="noopener noreferrer" className="text-[#FFB800] font-bold underline hover:opacity-80">
            {parte}
          </a>
        );
      }
      return <span key={i}>{parte}</span>;
    });
  }

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await Fetch.fetchBlogBodyById(id_blog_body);
        setDataResponse(response);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setError("Ocurrió un error al cargar el contenido");
        Swal.fire({ title: "Error", text: "Ocurrió un error inesperado.", icon: "error", confirmButtonText: "OK" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogData();
  }, [id_blog_body]);

  const getImageUrl = (previewImageUrl) => {
    if (!previewImageUrl) return null;
    if (previewImageUrl.startsWith("blob:")) return previewImageUrl;
    return `${previewImageUrl}?v=${Date.now()}`;
  };

  if (isLoading) {
    return (
      <div className="w-full rounded-[20px] overflow-hidden animate-pulse" style={{ background: "linear-gradient(143.3deg, #000118 0%, #410C89 50%, #000118 100%)" }}>
        <div className="flex flex-col lg:flex-row gap-8 px-6 lg:px-[100px] pt-12 pb-8">
          <div className="w-full lg:w-[564px] h-[280px] lg:h-[383px] rounded-[32px] bg-white/10" />
          <div className="flex-1 flex flex-col gap-4 justify-center">
            <div className="h-4 w-24 rounded bg-[#FFB800]/30" />
            <div className="h-12 w-3/4 rounded-lg bg-[#FFB800]/20" />
            <div className="h-24 w-full rounded-lg bg-white/10" />
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-10 w-10 text-[#FFB800] animate-spin" />
            <p className="text-[#CCC3D4] text-sm">Cargando contenido...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full rounded-[20px] overflow-hidden flex flex-col items-center justify-center py-20 gap-4" style={{ background: "linear-gradient(143.3deg, #000118 0%, #410C89 50%, #000118 100%)" }}>
        <div className="text-4xl">⚠️</div>
        <h2 className="text-2xl font-bold text-[#FFB800]">{error ? "No se pudo cargar el contenido" : "No hay contenido disponible"}</h2>
        {error && (
          <button onClick={() => window.location.reload()} className="px-6 py-2 rounded-full font-semibold text-[#100043]" style={{ background: "linear-gradient(90deg, #FFCA3A 0%, #FFAC00 100%)" }}>
            Reintentar
          </button>
        )}
      </div>
    );
  }


  return (
    <div className="w-full overflow-hidden rounded-[20px]">
      {/* ── SECCIÓN 1: Imagen izquierda + texto derecha ── */}
      <div className="flex flex-col lg:flex-row gap-8 px-6 lg:px-[100px] pt-12 pb-8 items-start">
        <div className="w-full lg:w-[564px] flex-shrink-0">
          <Image
            src={getImageUrl(data.public_image1) || "/blog/blog-4.webp"}
            alt={data.alt_image1 || data.titulo}
            title={data.title_image1 || ""}
            width={564}
            height={383}
            className="w-full h-[260px] lg:h-[383px] rounded-[20px] lg:rounded-[32px] object-cover"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <p className="text-[#FFB800] font-semibold text-sm lg:text-base mb-3">{fecha}</p>
          <h2 className="font-extrabold text-[#FFB800] text-3xl lg:text-[50px] leading-tight lg:leading-[56px] tracking-[-0.48px] mb-4 lg:mb-6">
            {data.titulo}
          </h2>
          <p className="text-[#CCC3D4] text-base lg:text-[20px] leading-[24px]">
            {data.descripcion}
          </p>
        </div>
      </div>

      {/* ── SECCIÓN 2: Consejos ── */}
      {data.flag_consejos !== 0 && (() => {
        const consejosItems = [
          data.commend_tarjeta?.texto1,
          data.commend_tarjeta?.texto2,
          data.commend_tarjeta?.texto3,
          data.commend_tarjeta?.texto4,
          data.commend_tarjeta?.texto5,
        ].filter(Boolean);

        const ConsejoCard = ({ text, index }) => (
          <div
            className="relative flex flex-col items-center rounded-[12px] overflow-hidden min-h-[260px] lg:min-h-[329px]"
            style={{
              background: "linear-gradient(180deg, rgba(16,0,67,0.8) 0%, rgba(8,1,46,0.8) 50%, rgba(19,0,73,0.8) 100%)",
              boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[5px]"
              style={{ background: "linear-gradient(90deg, rgba(65,12,137,0) 0%, #5F00DF 50%, rgba(65,12,137,0) 100%)" }}
            />
            <p className="text-white font-extrabold text-[60px] lg:text-[80px] leading-none mt-8 text-center tracking-[-0.48px]">
              {index + 1}
            </p>
            <p className="text-[#CCC3D4] text-base lg:text-[20px] leading-[24px] text-center mt-6 px-4 pb-6">
              {text}
            </p>
          </div>
        );

        return (
          <div className="px-6 lg:px-[100px] py-10">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
              <div className="w-full lg:w-[388px] flex-shrink-0">
                <p className="text-[#FFB800] font-semibold text-lg lg:text-[24px] leading-[40px] mb-2">
                  Consejos importantes
                </p>
                <h3 className="text-[#FFB800] font-extrabold text-3xl lg:text-[50px] leading-tight lg:leading-[56px] tracking-[-0.48px]">
                  {data.commend_tarjeta?.titulo || "Consejos"}
                </h3>
              </div>

              {/* Carrusel solo en mobile/tablet */}
              <div className="block lg:hidden flex-1 w-full relative">
                <Swiper
                  modules={[Pagination, Navigation]}
                  spaceBetween={16}
                  slidesPerView={1}
                  pagination={{
                    clickable: true,
                    el: ".consejos-pagination",
                    bulletClass: "consejos-bullet",
                    bulletActiveClass: "consejos-bullet-active",
                  }}
                  navigation={{
                    nextEl: ".consejos-next",
                    prevEl: ".consejos-prev",
                  }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                  }}
                  className="w-full pb-10"
                >
                  {consejosItems.map((text, i) => (
                    <SwiperSlide key={i} className="h-auto">
                      <ConsejoCard text={text} index={i} />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Navegación y paginación con estética premium */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  <button className="consejos-prev w-10 h-10 rounded-full bg-[#100043]/85 hover:bg-[#FFB800] border border-[#FFB800]/30 hover:border-transparent text-white hover:text-[#100043] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-[#FFB800]/20">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="consejos-pagination flex items-center gap-2" />
                  <button className="consejos-next w-10 h-10 rounded-full bg-[#100043]/85 hover:bg-[#FFB800] border border-[#FFB800]/30 hover:border-transparent text-white hover:text-[#100043] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-[#FFB800]/20">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <style jsx global>{`
                  .consejos-bullet {
                    width: 8px;
                    height: 8px;
                    border-radius: 9999px;
                    background-color: rgba(255, 255, 255, 0.35);
                    cursor: pointer;
                    transition: all 0.3s ease;
                  }
                  .consejos-bullet-active {
                    width: 24px;
                    background-color: #ffb800 !important;
                    box-shadow: 0 0 12px rgba(255, 184, 0, 0.6);
                  }
                  .consejos-bullet:hover {
                    background-color: rgba(255, 184, 0, 0.8);
                  }
                `}</style>
              </div>

              {/* Grid solo en desktop */}
              <div className="hidden lg:grid grid-cols-3 gap-6 flex-1 w-full">
                {consejosItems.map((text, i) => (
                  <ConsejoCard key={i} text={text} index={i} />
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── SECCIÓN 3: Galería (2 imágenes) ── */}
      {data.flag_galeria !== 0 && (() => {
        const galeriaItems = [
          { src: getImageUrl(data.public_image2) || "/blog/blog-10.webp", alt: data.alt_image2 || data.titulo, title: data.title_image2 || "" },
          { src: getImageUrl(data.public_image3) || "/blog/blog-1.webp",  alt: data.alt_image3 || data.titulo, title: data.title_image3 || "" },
        ].filter(img => img.src);

        return (
          <>
            {/* Carrusel solo en mobile/tablet */}
            <div className="block lg:hidden px-6 py-10 relative">
              <Swiper
                modules={[Pagination, Navigation]}
                spaceBetween={16}
                slidesPerView={1}
                pagination={{
                  clickable: true,
                  el: ".galeria-pagination",
                  bulletClass: "galeria-bullet",
                  bulletActiveClass: "galeria-bullet-active",
                }}
                navigation={{
                  nextEl: ".galeria-next",
                  prevEl: ".galeria-prev",
                }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                }}
                className="w-full pb-10"
              >
                {galeriaItems.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      title={image.title}
                      width={604}
                      height={383}
                      className="w-full h-[240px] rounded-[20px] object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navegación y paginación con estética premium */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <button className="galeria-prev w-10 h-10 rounded-full bg-[#100043]/85 hover:bg-[#FFB800] border border-[#FFB800]/30 hover:border-transparent text-white hover:text-[#100043] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-[#FFB800]/20">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="galeria-pagination flex items-center gap-2" />
                <button className="galeria-next w-10 h-10 rounded-full bg-[#100043]/85 hover:bg-[#FFB800] border border-[#FFB800]/30 hover:border-transparent text-white hover:text-[#100043] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-[#FFB800]/20">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <style jsx global>{`
                .galeria-bullet {
                  width: 8px;
                  height: 8px;
                  border-radius: 9999px;
                  background-color: rgba(255, 255, 255, 0.35);
                  cursor: pointer;
                  transition: all 0.3s ease;
                }
                .galeria-bullet-active {
                  width: 24px;
                  background-color: #ffb800 !important;
                  box-shadow: 0 0 12px rgba(255, 184, 0, 0.6);
                }
                .galeria-bullet:hover {
                  background-color: rgba(255, 184, 0, 0.8);
                }
              `}</style>
            </div>

            {/* Layout estático solo en desktop */}
            <div className="hidden lg:flex flex-row gap-[31px] px-6 lg:px-[200px] py-10">
              {galeriaItems.map((image, index) => (
                <div key={index} className="flex-1">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    title={image.title}
                    width={604}
                    height={383}
                    className="w-full h-[383px] rounded-[32px] object-cover"
                  />
                </div>
              ))}
            </div>
          </>
        );
      })()}

      {/* ── SECCIÓN 4: Banner amarillo de información ── */}
      {data.flag_informacion !== 0 && (
        <div className="flex justify-center lg:px-[100px] py-6 lg:py-8">
          <div
            className="
              flex items-center justify-center
              rounded-[38px]
              px-8 lg:px-12
              py-4
              w-full max-w-[705px]
            "
            style={{
              background: "linear-gradient(90deg, #FFCA3A 0%, #FFAC00 100%)",
              boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            }}
          >
            <span
              className="
                font-bold
                text-base lg:text-[24px]
                text-center
                leading-tight
                max-w-[90%]
              "
              style={{
                background:
                  "linear-gradient(180deg, #100043 0%, #08012E 50%, #130049 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {data.titulo_tarjeta ||
                "Información Detallada Sobre Nuestros Servicios"}
            </span>
          </div>
        </div>
      )}

      {/* ── SECCIÓN 5: Tarjetas de información (2x2) ── */}
      {data.flag_informacion !== 0 && data.tarjetas && (() => {
        const cards = data.tarjetas;
        return (
          <>
            {/* Carrusel solo en mobile/tablet */}
            <div className="block md:hidden px-6 pb-14 pt-8 relative">
              <Swiper
                modules={[Pagination, Navigation]}
                spaceBetween={24}
                slidesPerView={1}
                pagination={{
                  clickable: true,
                  el: ".cards-pagination",
                  bulletClass: "cards-bullet",
                  bulletActiveClass: "cards-bullet-active",
                }}
                navigation={{
                  nextEl: ".cards-next",
                  prevEl: ".cards-prev",
                }}
                className="w-full pb-10"
              >
                {cards.map((card, index) => (
                  <SwiperSlide key={`tarjeta-${index}`} className="pt-8 pb-2">
                    <div
                      className="relative rounded-[27px] pt-14 pb-8 px-8"
                      style={{
                        background: "linear-gradient(180deg, rgba(16,0,67,0.54) 0%, rgba(8,1,46,0.54) 50%, rgba(19,0,73,0.54) 100%)",
                        boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                      }}
                    >
                      <div
                        className="absolute -top-8 left-1/2 -translate-x-1/2 w-[64px] h-[64px] rounded-full flex items-center justify-center"
                        style={{ background: "linear-gradient(90deg, #FFCA3A 0%, #FFAC00 100%)" }}
                      >
                        <CheckCircle className="w-7 h-7 text-[#100043]" />
                      </div>
                      <h3 className="text-[#FFB800] font-bold text-xl leading-[40px] mb-3 text-center">
                        {card.titulo}
                      </h3>
                      <p className="text-[#CCC3D4] text-base leading-[24px]">
                        {renderDescripcion(card.descripcion, card.palabra, card.enlace)}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navegación y paginación con estética premium */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <button className="cards-prev w-10 h-10 rounded-full bg-[#100043]/85 hover:bg-[#FFB800] border border-[#FFB800]/30 hover:border-transparent text-white hover:text-[#100043] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-[#FFB800]/20">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="cards-pagination flex items-center gap-2" />
                <button className="cards-next w-10 h-10 rounded-full bg-[#100043]/85 hover:bg-[#FFB800] border border-[#FFB800]/30 hover:border-transparent text-white hover:text-[#100043] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-[#FFB800]/20">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <style jsx global>{`
                .cards-bullet {
                  width: 8px;
                  height: 8px;
                  border-radius: 9999px;
                  background-color: rgba(255, 255, 255, 0.35);
                  cursor: pointer;
                  transition: all 0.3s ease;
                }
                .cards-bullet-active {
                  width: 24px;
                  background-color: #ffb800 !important;
                  box-shadow: 0 0 12px rgba(255, 184, 0, 0.6);
                }
                .cards-bullet:hover {
                  background-color: rgba(255, 184, 0, 0.8);
                }
              `}</style>
            </div>

            {/* Grid original solo en desktop */}
            <div className="hidden md:grid grid-cols-2 gap-10 lg:gap-12 px-6 lg:px-[100px] pb-14 pt-8">
              {cards.map((card, index) => (
                <div
                  key={`tarjeta-${index}`}
                  className="relative rounded-[27px] pt-14 pb-8 px-8 lg:px-14"
                  style={{
                    background: "linear-gradient(180deg, rgba(16,0,67,0.54) 0%, rgba(8,1,46,0.54) 50%, rgba(19,0,73,0.54) 100%)",
                    boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                  }}
                >
                  <div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 w-[64px] h-[64px] lg:w-[78px] lg:h-[78px] rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(90deg, #FFCA3A 0%, #FFAC00 100%)" }}
                  >
                    <CheckCircle className="w-7 h-7 lg:w-9 lg:h-9 text-[#100043]" />
                  </div>
                  <h3 className="text-[#FFB800] font-bold text-xl lg:text-[30px] leading-[40px] mb-3">
                    {card.titulo}
                  </h3>
                  <p className="text-[#CCC3D4] text-base lg:text-[20px] leading-[24px]">
                    {renderDescripcion(card.descripcion, card.palabra, card.enlace)}
                  </p>
                </div>
              ))}
            </div>
          </>
        );
      })()}
    </div>
  );
}