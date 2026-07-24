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

export default function Body2({ id_blog_body, fecha, bg_color, bg_type, bg_colors }) {
  const [data, setDataResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  function renderDescripcion(texto, palabraClave, enlace, isUnderlined = true) {
    if (!palabraClave || !enlace) return texto;
    const regex = new RegExp(`(${palabraClave})`, "gi");
    const partes = texto.split(regex);
    return partes.map((parte, i) => {
      if (parte.toLowerCase() === palabraClave.toLowerCase()) {
        return (
          <a key={i} href={enlace} target="_blank" rel="noopener noreferrer" className={`text-[#FFB800] font-bold ${isUnderlined ? "underline" : "no-underline"} hover:opacity-80`}>
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
      } catch (err) {
        console.error("Error fetching blog data:", err);
        setError("Ocurrió un error al cargar el contenido");
        Swal.fire({ title: "Error", text: "Ocurrió un error inesperado.", icon: "error", confirmButtonText: "OK" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogData();
  }, [id_blog_body]);

  useEffect(() => {
    if (data) {
      if (data.flag_informacion !== 0) setActiveTab("info");
      else if (data.flag_consejos !== 0) setActiveTab("tips");
      else if (data.flag_galeria !== 0) setActiveTab("gallery");
      else setActiveTab(null);
    }
  }, [data]);

  const getImageUrl = (previewImageUrl, fallback) => {
    if (!previewImageUrl) return fallback;
    if (previewImageUrl.startsWith("blob:")) return previewImageUrl;
    return `${previewImageUrl}?v=${Date.now()}`;
  };

  if (isLoading) {
    return (
      <div className="w-full rounded-[30px] overflow-hidden animate-pulse" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(16,0,67,0.3) 62.02%)" }}>
        <div className="flex flex-col lg:flex-row gap-8 px-6 lg:px-[60px] pt-12 pb-8">
          <div className="flex-1 flex flex-col gap-4 justify-center">
            <div className="h-4 w-24 rounded bg-[#FFB800]/30" />
            <div className="h-12 w-3/4 rounded-lg bg-[#FFB800]/20" />
            <div className="h-24 w-full rounded-lg bg-white/10" />
          </div>
          <div className="w-full lg:w-[549px] h-[220px] lg:h-[299px] rounded-[31px] bg-white/10 flex-shrink-0" />
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
      <div className="w-full rounded-[30px] overflow-hidden flex flex-col items-center justify-center py-20 gap-4" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(16,0,67,0.3) 62.02%)" }}>
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

  const tabs = [
    { key: "info",    label: "Información", show: data.flag_informacion !== 0 },
    { key: "tips",    label: "Consejos",    show: data.flag_consejos !== 0 },
    { key: "gallery", label: "Galería",     show: data.flag_galeria !== 0 },
  ].filter(t => t.show);

  return (
    <div className="w-full overflow-hidden">

      {/* ── Hero: texto izquierda + imagen derecha ── */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-6 lg:px-[60px] pt-10 pb-8 items-center">
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {fecha && (
            <p className="text-[#FFB800] font-semibold text-sm lg:text-base mb-3">{fecha}</p>
          )}
          <h2
            className="font-extrabold  text-3xl lg:text-[48px] leading-tight lg:leading-[56px] tracking-[-0.48px] mb-4 uppercase"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif",color: data.titulo_color || "#FFB800" }}
          >
            {data.titulo}
          </h2>
          <p className=" text-base lg:text-[24px] leading-[30px]"
          style={{ color: data.descripcion_color || "#CCC3D4" }}>
            {renderDescripcion(data.descripcion, data.palabra, data.enlace)}
          </p>
        </div>
        <div className="w-full lg:w-[549px] flex-shrink-0">
          <Image
            src={getImageUrl(data.public_image1, "/blog/blog-4.webp")}
            alt={data.alt_image1 || data.titulo}
            title={data.title_image1 || ""}
            width={549}
            height={299}
            className="w-full h-[220px] lg:h-[299px] object-cover rounded-[20px] lg:rounded-[31px]"
          />
        </div>
      </div>

      {/* ── Separador degradado ── */}
      <div
        className="mx-6 lg:mx-[60px] h-[5px]"
        style={{ background: "linear-gradient(90deg, rgba(65,12,137,0) 0%, #410C89 50%, rgba(65,12,137,0) 100%)" }}
      />

      {/* ── Tabs de navegación ── */}
      {tabs.length > 0 && (
        <div className="flex gap-8 lg:gap-16 px-6 lg:px-[60px] pt-6 pb-3">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="text-lg lg:text-[20px] leading-[30px] font-normal transition-colors"
              style={{ color: activeTab === tab.key ? "#FFB800" : "#FFFFFF" }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Separador debajo de tabs ── */}
      <div
        className="mx-6 lg:mx-[60px] h-[8px] mb-6"
        style={{ background: "linear-gradient(90deg, rgba(65,12,137,0) 0%, #410C89 50%, rgba(65,12,137,0) 100%)" }}
      />

      {/* ── Contenido del tab activo ── */}
      <div className="px-6 lg:px-[60px] pb-10">

        {/* Información */}
        {activeTab === "info" && data.flag_informacion !== 0 && (
          <>
            {/* Carrusel solo en mobile/tablet */}
            <div className="block lg:hidden relative pb-12 pt-2">
              <Swiper
                modules={[Pagination]}
                spaceBetween={16}
                slidesPerView={1}
                observer={true}
                observeParents={true}
                pagination={{
                  clickable: true,
                  el: ".b2-info-pagination",
                  bulletClass: "b2-info-bullet",
                  bulletActiveClass: "b2-info-bullet-active",
                }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                }}
                className="w-full pb-10"
              >
                {data.tarjetas?.map((card, index) => (
                  <SwiperSlide key={`card-slide-${index}`} className="h-auto">
                    <div className="overflow-hidden h-full flex flex-col">
                      {/* Barra amarilla superior */}
                      <div
                        className="w-full h-[12px] rounded-t-[20px] flex-shrink-0"
                        style={{ background: "linear-gradient(90deg, #FFCA3A 0%, #FFAC00 100%)" }}
                      />
                      {/* Cuerpo de la tarjeta */}
                      <div
                        className="px-6 py-6 border border-white/5 rounded-b-[20px] flex-1"
                        style={{ background: "linear-gradient(180deg, #000118 0%, #100043 100%)" }}
                      >
                        <h3
                          className="font-extrabold text-lg leading-[1.4] tracking-[-0.48px] mb-3"
                          style={{ fontFamily: "'Hanken Grotesk', sans-serif", color: card.titulo_color || "#FFB800" }}
                        >
                          {card.titulo}
                        </h3>
                        <p className="text-sm leading-6" style={{ color: card.descripcion_color || "#CCC3D4" }}>
                          {renderDescripcion(card.descripcion, card.palabra, card.enlace)}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Paginación */}
              <div className="flex items-center justify-center mt-4">
                <div className="b2-info-pagination flex items-center gap-2" />
              </div>
            </div>

            {/* Grid original solo en desktop */}
            <div className="hidden lg:flex flex-col gap-5">
              {data.tarjetas?.map((card, index) => (
                <div key={`card-${index}`} className="overflow-hidden">
                  {/* Barra amarilla superior */}
                  <div
                    className="w-full h-[15px] rounded-t-[20px]"
                    style={{ background: "linear-gradient(90deg, #FFCA3A 0%, #FFAC00 100%)" }}
                  />
                  {/* Cuerpo de la tarjeta */}
                  <div
                    className="px-8 lg:px-[60px] py-8 border border-white/5 rounded-b-[20px]"
                    style={{ background: "linear-gradient(180deg, #000118 0%, #100043 100%)" }}
                  >
                    <h3
                      className="font-extrabold text-xl lg:text-[30px] leading-[1.4] tracking-[-0.48px] mb-3"
                      style={{ fontFamily: "'Hanken Grotesk', sans-serif", color: card.titulo_color || "#FFB800" }}
                    >
                      {card.titulo}
                    </h3>
                    <p className="text-base lg:text-[24px] leading-[30px]" style={{ color: card.descripcion_color || "#CCC3D4" }}>
                      {renderDescripcion(card.descripcion, card.palabra, card.enlace)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Consejos (Plantilla 2 no tiene funcionalidad de enlace) */}
        {activeTab === "tips" && data.flag_consejos !== 0 && (() => {
          const tipsItems = Array.isArray(data.consejos)
            ? data.consejos.filter((c) => c.texto)
            : [];

          if (!tipsItems.length) return null;

          return (
            <div
              className="rounded-[30px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(16,0,67,0.3) 62.02%)",
              }}
            >
              {/* Línea degradada superior */}
              <div
                className="w-full h-[8px]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(65,12,137,0) 0%, #410C89 50%, rgba(65,12,137,0) 100%)",
                }}
              />

              <div
                className="mx-3 lg:mx-8 my-6 rounded-[22px] px-4 lg:px-10 py-8"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(19,0,73,0.69) 0%, rgba(16,0,67,0.69) 100%)",
                }}
              >
                <h3
                  className="text-center font-bold text-xl lg:text-[30px] leading-[40px] mb-8"
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    color: data.titulo_consejos_color || "#FFB800",
                  }}
                >
                  {data.titulo_consejos || "Consejos Importantes"}
                </h3>

                {/* Carrusel solo en mobile/tablet */}
                <div className="block lg:hidden w-full relative pb-10">
                  <Swiper
                    modules={[Pagination, Navigation]}
                    spaceBetween={16}
                    slidesPerView={1}
                    observer={true}
                    observeParents={true}
                    pagination={{
                      clickable: true,
                      el: ".b2-tips-pagination",
                      bulletClass: "b2-tips-bullet",
                      bulletActiveClass: "b2-tips-bullet-active",
                    }}
                    navigation={{
                      nextEl: ".b2-tips-next",
                      prevEl: ".b2-tips-prev",
                    }}
                    breakpoints={{
                      640: { slidesPerView: 2 },
                    }}
                    className="w-full pb-10"
                  >
                    {tipsItems.map((consejo, i) => (
                      <SwiperSlide key={consejo.id_consejo || i} className="h-auto">
                        <div className="flex items-center gap-3">
                          {/* Círculo amarillo con ícono */}
                          <div
                            className="flex-shrink-0 w-[40px] h-[40px] rounded-full flex items-center justify-center"
                            style={{
                              background: "linear-gradient(90deg, #FFCA3A 0%, #FFAC00 100%)",
                            }}
                          >
                            <CheckCircle
                              className="w-[22px] h-[22px] text-[#100043]"
                              strokeWidth={2.5}
                            />
                          </div>

                          {/* Tarjeta de texto */}
                          <div
                            className="flex-1 flex items-center px-4 py-3 rounded-[22px] min-h-[69px]"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(16,0,67,0.92) 0%, rgba(0,1,24,0.92) 100%)",
                            }}
                          >
                            <p className="text-sm leading-6" style={{ color: consejo.texto_color || "#CCC3D4" }}>
                              {consejo.texto}
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Flechas y paginación */}
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <button className="b2-tips-prev w-10 h-10 rounded-full bg-[#100043]/85 hover:bg-[#FFB800] border border-[#FFB800]/30 hover:border-transparent text-white hover:text-[#100043] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-[#FFB800]/20">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="b2-tips-pagination flex items-center gap-2" />
                    <button className="b2-tips-next w-10 h-10 rounded-full bg-[#100043]/85 hover:bg-[#FFB800] border border-[#FFB800]/30 hover:border-transparent text-white hover:text-[#100043] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-[#FFB800]/20">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Grid solo en desktop */}
                <div className="hidden lg:flex flex-col gap-4">
                  {tipsItems.map((consejo, i) => (
                    <div key={consejo.id_consejo || i} className="flex items-center gap-3">
                      <div
                        className="flex-shrink-0 w-[40px] h-[40px] rounded-full flex items-center justify-center"
                        style={{
                          background: "linear-gradient(90deg, #FFCA3A 0%, #FFAC00 100%)",
                        }}
                      >
                        <CheckCircle
                          className="w-[22px] h-[22px] text-[#100043]"
                          strokeWidth={2.5}
                        />
                      </div>
                      <div
                        className="flex-1 flex items-center px-4 lg:px-6 py-3 lg:py-0 rounded-[22px] min-h-auto lg:min-h-[69px]"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(16,0,67,0.92) 0%, rgba(0,1,24,0.92) 100%)",
                        }}
                      >
                        <p
                          className="text-sm lg:text-[24px] leading-6 lg:leading-[30px]"
                          style={{ color: consejo.texto_color || "#CCC3D4" }}
                        >
                          {consejo.texto}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Barra amarilla inferior */}
              <div
                className="h-[44px] flex items-center justify-center rounded-b-[30px]"
                style={{
                  background:
                    "linear-gradient(90deg, #FFCA3A 0%, #FFAC00 100%)",
                }}
              >
                <span
                  className="font-bold text-base lg:text-[20px] text-center"
                  style={{
                    background:
                      "linear-gradient(180deg, #100043 0%, #08012E 50%, #130049 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {new Date().getFullYear()} - Todos los derechos reservados
                </span>
              </div>
            </div>
          );
        })()}

        {/* Galería */}
        {activeTab === "gallery" && data.flag_galeria !== 0 && (() => {
          const galleryItems = [
            { src: getImageUrl(data.public_image2, "/blog/blog-10.webp"), alt: data.alt_image2 || data.titulo, title: data.title_image2 || "" },
            { src: getImageUrl(data.public_image3, "/blog/blog-1.webp"),  alt: data.alt_image3 || data.titulo, title: data.title_image3 || "" },
          ].filter(img => img.src);

          return (
            <div
              className="rounded-[30px] overflow-hidden p-6 lg:p-10 w-[85%] mx-auto"
              style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(16,0,67,0.3) 62.02%)" }}
            >
              {/* Carrusel solo en mobile */}
              <div className="block md:hidden relative pb-10">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={16}
                  slidesPerView={1}
                  observer={true}
                  observeParents={true}
                  pagination={{
                    clickable: true,
                    el: ".b2-gallery-pagination",
                    bulletClass: "b2-gallery-bullet",
                    bulletActiveClass: "b2-gallery-bullet-active",
                  }}
                  className="w-full pb-10"
                >
                  {galleryItems.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="overflow-hidden rounded-[15px] max-w-[580px] mx-auto w-full">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          title={image.title}
                          width={600}
                          height={400}
                          className="w-full h-[240px] object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Paginación */}
                <div className="flex items-center justify-center mt-4">
                  <div className="b2-gallery-pagination flex items-center gap-2" />
                </div>
              </div>

              {/* Grid original solo en tablet/desktop */}
              <div className="hidden md:grid grid-cols-2 gap-6">
                {galleryItems.map((image, index) => (
                  <div key={index} className="overflow-hidden rounded-[15px] max-w-[580px] mx-auto w-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      title={image.title}
                      width={600}
                      height={400}
                      className="w-full h-[240px] lg:h-[360px] object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* ── CTA: Contáctanos ── */}
      <div className="px-6 lg:px-[60px] pb-10">
        <div
          className="relative rounded-[17px] overflow-hidden"
          style={{
            background: "linear-gradient(180deg, rgba(16,0,67,0.54) 0%, rgba(8,1,46,0.54) 50%, rgba(19,0,73,0.54) 100%)",
            boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            border: "1px solid #000000",
          }}
        >
          {/* Borde amarillo superior */}
          <div
            className="h-[8px] w-full"
            style={{ background: "linear-gradient(90deg, #FFCA3A 0%, #FFAC00 100%)" }}
          />
          <div className="px-6 lg:px-14 py-8 text-center">
            <h3
              className="font-bold text-xl lg:text-[30px] leading-[40px] mb-4"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif", color: "#FFB800" }}
            >
              Contáctanos Para Más Información
            </h3>
            <p className="text-base lg:text-[20px] leading-[24px] max-w-[736px] mx-auto" style={{ color: "#CCC3D4" }}>
              {data.descripcion_cta || "Estamos comprometidos con la excelencia en cada proyecto. Nuestro equipo de expertos está listo para ayudarte a crear la solución perfecta que destaque tu negocio."}
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Info Tab Pagination */
        .b2-info-pagination {
          position: relative !important;
          width: auto !important;
          bottom: auto !important;
          left: auto !important;
        }
        .b2-info-bullet {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.35);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .b2-info-bullet-active {
          width: 24px;
          background-color: #ffb800 !important;
          box-shadow: 0 0 12px rgba(255, 184, 0, 0.6);
        }
        .b2-info-bullet:hover {
          background-color: rgba(255, 184, 0, 0.8);
        }

        /* Tips Tab Pagination */
        .b2-tips-pagination {
          position: relative !important;
          width: auto !important;
          bottom: auto !important;
          left: auto !important;
        }
        .b2-tips-bullet {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.35);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .b2-tips-bullet-active {
          width: 24px;
          background-color: #ffb800 !important;
          box-shadow: 0 0 12px rgba(255, 184, 0, 0.6);
        }
        .b2-tips-bullet:hover {
          background-color: rgba(255, 184, 0, 0.8);
        }

        /* Gallery Tab Pagination */
        .b2-gallery-pagination {
          position: relative !important;
          width: auto !important;
          bottom: auto !important;
          left: auto !important;
        }
        .b2-gallery-bullet {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.35);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .b2-gallery-bullet-active {
          width: 24px;
          background-color: #ffb800 !important;
          box-shadow: 0 0 12px rgba(255, 184, 0, 0.6);
        }
        .b2-gallery-bullet:hover {
          background-color: rgba(255, 184, 0, 0.8);
        }
      `}</style>

    </div>
  );
}
