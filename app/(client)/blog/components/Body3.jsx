"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Loader2, CheckCircle } from "lucide-react";
import Fetch from "../services/fetch";
import Image from "next/image";


export default function Body3({ id_blog_body, fecha }) {
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
          <a key={i} href={enlace} target="_blank" rel="noopener noreferrer" className="text-yellow-400 font-bold underline hover:text-yellow-200">
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

  const getImageUrl = (previewImageUrl, fallback) => {
    if (!previewImageUrl) return fallback;
    if (previewImageUrl.startsWith("blob:")) return previewImageUrl;
    return `${previewImageUrl}?v=${Date.now()}`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="h-12 w-12 text-yellow-400 animate-spin mb-4" />
        <p className="text-white font-medium">Cargando contenido...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-white">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-2">No se pudo cargar el contenido</h2>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors mt-4">
          Reintentar
        </button>
      </div>
    );
  }

  const titleStyle = {
    color: "#FFB800",
    
  };

  const cardBg = "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(16,0,67,0.3) 62.02%)";





  const renderBodyHeader = () => (
    <div className="flex flex-col lg:flex-row items-center gap-10 ">
      <div className="flex-1 flex flex-col justify-center">
        {fecha && (
          <p className="text-sm font-semibold mb-3" style={{ color: "#FFB800" }}>{fecha}</p>
        )}
        <h2 className="font-extrabold text-3xl lg:text-4xl leading-tight tracking-tight mb-5" style={titleStyle}>
          {data.titulo}
        </h2>
        <p className="text-base leading-relaxed" style={{ color: "#CCC3D4" }}>{data.descripcion}</p>
      </div>
      <div className="w-full lg:w-[45%] flex-shrink-0">
        <Image
          src={getImageUrl(data.public_image1, "/blog/blog-4.webp")}
          alt={data.alt_image1 || data.titulo || "Imagen principal"}
          title={data.title_image1 || ""}
          width={600}
          height={400}
          className="w-full h-[320px] object-cover shadow-2xl mt-8"
          style={{ borderRadius: 30 }}
        />
      </div>
    </div>
  );

const renderGaleria = () => {
  if (data.flag_galeria === 0) return null;

  return (
    <div
      className="
        rounded-[30px] lg:rounded-[40px]
        px-4 sm:px-6 lg:px-10
        py-8 lg:py-12
        mt-8 lg:mt-12
        mb-12 lg:mb-16
        max-w-7xl mx-auto
      "
      style={{
        background:
          "conic-gradient(from 180deg at 50% 50%, #100043 -0.38deg, #2F086A 173.33deg, #100043 359.62deg, #2F086A 533.33deg)",
      }}
    >
      <h3
        className="
          text-center
          font-extrabold
          text-4xl lg:text-5xl
          mb-6 lg:mb-4
          tracking-tight
        "
        style={titleStyle}
      >
        Galería
      </h3>

      <div
        className="
          flex
          flex-col sm:flex-row
          gap-6 lg:gap-16
          max-w-5xl
          mx-auto
        "
      >
        {[
          {
            src: getImageUrl(data.public_image2, "/blog/blog-10.webp"),
            alt: data.alt_image2 || data.titulo,
            title: data.title_image2 || "",
          },
          {
            src: getImageUrl(data.public_image3, "/blog/blog-1.webp"),
            alt: data.alt_image3 || data.titulo,
            title: data.title_image3 || "",
          },
        ].map((image, index) => (
          <div
            key={index}
            className="
              flex-1
              overflow-hidden
              rounded-[30px]
              shadow-lg
            "
          >
            <Image
              src={image.src}
              alt={image.alt}
              title={image.title}
              width={400}
              height={320}
              className="
                w-full
                h-[250px]
                sm:h-[320px]
                object-cover
                transition-transform
                duration-700
                hover:scale-105
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

  const renderConsejos = () => {
    if (data.flag_consejos === 0 || !data.commend_tarjeta) return null;
    {/* se agrego texto 4 y 5  */}
    const textos = [
      data.commend_tarjeta.texto1,
      data.commend_tarjeta.texto2,
      data.commend_tarjeta.texto3,
      data.commend_tarjeta?.texto4,
      data.commend_tarjeta?.texto5,
    ].filter(Boolean);

    if (!textos.length) return null;

    return (
      <div className="mb-16">
        <h3 className="text-center font-extrabold text-5xl mb-12 tracking-tight leading-tight" style={titleStyle}>
          {data.commend_tarjeta.titulo || "Consejos Importantes"}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {textos.map((texto, i) => (
            <div
              key={i}
              className="relative rounded-[30px] overflow-hidden pt-14 pb-10 px-8"
              style={{ background: "linear-gradient(180deg, #000000 0%, #100043 62.02%)" }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[5px]"
                style={{ background: "linear-gradient(90deg, rgba(65,12,137,0) 0%, #5F00DF 50%, rgba(65,12,137,0) 100%)" }}
              />
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-14 h-14 text-white" />
              </div>
              <p className="text-lg text-center leading-relaxed" style={{ color: "#CCC3D4" }}>{texto}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

const renderInformacion = () => {
  if (data.flag_informacion === 0 || !data.tarjetas?.length) return null;

  const tarjetas = data.tarjetas;

  const WideCard = ({ section }) => (
    <div
      className="w-full p-5 sm:p-8 shadow-lg"
      style={{
        background: cardBg,
        border: "1px solid rgba(95,0,223,0.2)",
        borderRadius: 24,
      }}
    >
      <h3
        className="font-bold text-lg sm:text-2xl mb-2 sm:mb-3"
        style={titleStyle}
      >
        {section.titulo}
      </h3>

      <p
        className="text-sm sm:text-lg leading-relaxed"
        style={{ color: "#CCC3D4" }}
      >
        {renderDescripcion(section.descripcion || "", section.palabra, section.enlace)}
      </p>
    </div>
  );

  const NarrowCard = ({ section }) => (
    <div
      className="w-full p-5 sm:p-8 flex flex-col items-center text-center shadow-lg"
      style={{
        background: cardBg,
        border: "1px solid rgba(95,0,223,0.2)",
        borderRadius: 24,
      }}
    >
      <h3
        className="font-bold text-base sm:text-xl mb-2 sm:mb-3"
        style={titleStyle}
      >
        {section.titulo}
      </h3>

      <p
        className="text-sm sm:text-base leading-relaxed"
        style={{ color: "#CCC3D4" }}
      >
        {renderDescripcion(section.descripcion || "", section.palabra, section.enlace)}
      </p>
    </div>
  );

  const cards = [];
  let i = 0;

  while (i < tarjetas.length) {
    if (i === 1 && tarjetas.length > 2) {
      cards.push(
        <div
          key={`pair-${i}`}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          <NarrowCard section={tarjetas[i]} />
          {tarjetas[i + 1] && (
            <NarrowCard section={tarjetas[i + 1]} />
          )}
        </div>
      );
      i += 2;
    } else {
      cards.push(<WideCard key={i} section={tarjetas[i]} />);
      i++;
    }
  }

  return (
    <div className="mb-12 sm:mb-16 w-full sm:w-[90%] lg:w-[75%] mx-auto px-4 sm:px-0">
      <h3
        className="text-center font-extrabold text-2xl sm:text-4xl lg:text-5xl mb-8 sm:mb-12 tracking-tight"
        style={titleStyle}
      >
        {data.titulo_tarjeta || "Información Detallada"}
      </h3>

      <div className="flex flex-col gap-4 sm:gap-6">
        {cards}
      </div>
    </div>
  );
};

  return (
    <div className="text-white">
      <div className="px-10 lg:px-16">
        {renderBodyHeader()}
        {renderGaleria()}
        {renderConsejos()}
        {renderInformacion()}
      </div>
    </div>
  );
}
