"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Fetch from "../services/fetch";
import { Loader2 } from "lucide-react";
import Image from "next/image";
//agregar importacion para imagen por defecto que no se mostraba tras el nuevo arreglo 
import { DEFAULT_IMAGES } from "@/app/edition/constants/defaults";

const getBackgroundStyle = (bgColor = "#1E40AF", bgType = "solid", bgColors = "") => {
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

const renderDescripcion = (texto, palabra, enlace) => {
  if (!texto || !palabra || !enlace) return texto;

  const palabraEscapada = palabra.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${palabraEscapada})`, "gi");

  return texto.split(regex).map((parte, index) =>
    parte.toLowerCase() === palabra.toLowerCase() ? (
      <a
        key={index}
        href={enlace}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold underline hover:text-white"
      >
        {parte}
      </a>
    ) : (
      <span key={index}>{parte}</span>
    )
  );
};

export default function Header({ id_blog_head, bg_color, bg_type, bg_colors }) {
   const [data, setDataResponse] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);


  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await Fetch.fetchBlogHead(id_blog_head);
        setDataResponse(response);
        console.log("🔍 ¿Qué viene de Laravel en el Editor?:", response?.imagen);
      } catch (error) {
        console.error("Error fetching blog header:", error);
        setError("Ocurrió un error al cargar el encabezado");
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error inesperado.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeaderData();
  }, [id_blog_head]);

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] md:h-[80vh] relative flex items-center justify-center text-center px-6 sm:px-12 bg-gray-900 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="h-16 bg-white/20 rounded-lg w-3/4 mx-auto mb-4"></div>
          <div className="h-8 bg-white/20 rounded-lg w-1/2 mx-auto mb-4"></div>
          <div className="h-24 bg-white/10 rounded-lg w-full mx-auto"></div>
          <div className="w-20 h-1 bg-white/30 mt-6 mx-auto"></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="bg-black/70 p-8 rounded-xl backdrop-blur-sm flex flex-col items-center">
            <Loader2 className="h-12 w-12 text-white animate-spin mb-4" />
            <p className="text-white font-medium">Cargando encabezado...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[60vh] md:h-[80vh] relative flex items-center justify-center text-center px-6 sm:px-12 bg-gray-900">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-2xl text-white">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            No se pudo cargar el encabezado
          </h1>
          <p className="text-lg text-gray-300 font-light mb-6">
            Ocurrió un problema al cargar el contenido. Por favor, intenta
            recargar la página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-[60vh] md:h-[80vh] relative flex items-center justify-center text-center px-6 sm:px-12 bg-gray-900">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-2xl text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Contenido no disponible
          </h1>
          <p className="text-lg text-gray-300 font-light">
            El encabezado que buscas no está disponible en este momento.
          </p>
          <div className="w-20 h-1 bg-white mt-6 mx-auto"></div>
        </div>
      </div>
    );
  }

return (
    <section 
      className="relative w-screen h-[60vh] md:h-[80vh] overflow-hidden"
      style={{
        ...getBackgroundStyle(
          data?.bg_color || bg_color,
          data?.bg_type || bg_type || "solid",
          data?.bg_colors || bg_colors
        )
      }}
    >

      {/* Imagen de fondo visible */}
      {/* se agrego una correccion en base a un error en no mostrar la img por defecto */}
      <Image
        src={!data.imagen?.path || data.imagen.path.includes("fondo_blog_extend")
      ? DEFAULT_IMAGES.header.image1
      : data.imagen.path.startsWith('http')
      ? data.imagen.path 
      : `${process.env.NEXT_PUBLIC_API_URL_DEV}/storage/${data.imagen.path}`
  }
        alt={data.alt || "Imagen de encabezado"}
        title={data.title || ""}
        fill
        className="object-cover"
        priority
        unoptimized={true}
      />

      {/* Capa de oscurecimiento según tipo */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundColor: data?.bg_type === "gradient" 
            ? "rgba(0,0,0,0.3)" 
            : `${data?.bg_color || bg_color || "#1E40AF"}33` 
        }}
      ></div>


      {/* Contenido sobre la imagen */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 sm:px-12" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 4px 24px rgba(0,0,0,0.7)" }}>
        <h1 className="text-3xl md:text-6xl font-extrabold mb-4 neon-textov4">
          {data.titulo}
        </h1>

        <h2 className="text-xl md:text-xl font-bold mb-4">
          {data.texto_frase}
        </h2>

        <p className="text-lg text-gray-300 font-light">
          {renderDescripcion(
            data.texto_descripcion,
            data.palabra,
            data.enlace
          )}
        </p>

        <div className="w-20 h-1 bg-white mt-6 mx-auto"></div>
      </div>
    </section>
  );
}

