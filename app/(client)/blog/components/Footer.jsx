"use client";

import { useEffect, useState } from "react";
import Fetch from "../services/fetch";
import Swal from "sweetalert2";
import { Loader2, AlertTriangle, ImageIcon } from "lucide-react";
import Image from "next/image";

// ✅ FUNCIÓN EXTERNA (FUERA DEL COMPONENTE) - CON VALORES POR DEFECTO
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

export default function Footer({ id_blog_footer, bg_color: propBgColor, bg_type: propBgType, bg_colors: propBgColors }) {

  const [data, setDataResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ USA LA FUNCIÓN EXTERNA CON VALORES POR DEFECTO
  const bgColor = data?.bg_color || propBgColor || "";
  const bgType = data?.bg_type || propBgType || "solid";
  const bgColors = data?.bg_colors || propBgColors || "";
  const footerBgStyle = getBackgroundStyle(bgColor, bgType, bgColors);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await Fetch.fetchBlogFooter(id_blog_footer);
        setDataResponse(response);
      } catch (error) {
        console.error("Error fetching blog footer:", error);
        setError("Ocurrió un error al cargar el pie de página");
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

    fetchFooterData();
  }, [id_blog_footer]);

  const getImageUrl = (previewImageUrl, fallback) => {
    if (!previewImageUrl) return fallback;
    if (previewImageUrl.startsWith("blob:")) return previewImageUrl;
    return `${previewImageUrl}?v=${Date.now()}`;
  };

  if (isLoading) {
    return (
      <div className="mt-12 max-w-[1000px] mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-[0px_8px_20px_rgba(0,0,0,0.3)] overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 animate-gradient-x"></div>

          <div className="p-6 md:p-8">
            <div className="h-8 bg-gradient-to-r from-yellow-400/20 to-yellow-500/30 w-2/3 mx-auto rounded-lg mb-4 animate-pulse"></div>
            <div className="h-0.5 w-16 bg-yellow-400/50 mx-auto mt-2 mb-6"></div>

            <div className="space-y-3 max-w-3xl mx-auto mb-6">
              <div className="h-4 bg-gradient-to-r from-gray-100/20 to-gray-100/10 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-gray-100/15 to-gray-100/5 rounded w-full animate-pulse delay-75"></div>
              <div className="h-4 bg-gradient-to-r from-gray-100/10 to-gray-100/5 rounded w-5/6 animate-pulse delay-150"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-48 h-36 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-700 rounded-lg border border-gray-600/50 animate-pulse delay-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <ImageIcon className="h-12 w-12 text-gray-500" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center justify-center mt-8 mb-2">
              <Loader2 className="h-8 w-8 text-yellow-400 animate-spin mb-2" />
              <p className="text-gray-300 text-sm font-medium">
                Cargando contenido...
              </p>
            </div>

            <div className="flex justify-center mt-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-12 max-w-[1000px] mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-[0px_8px_20px_rgba(0,0,0,0.3)] overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500"></div>

          <div className="p-6 md:p-8 flex flex-col items-center">
            <div className="text-red-400 mb-4 bg-red-400/10 p-3 rounded-full">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h3 className="text-2xl md:text-3xl text-center font-bold mb-4 text-yellow-400">
              No se pudo cargar el contenido
              <span className="block h-0.5 w-16 bg-gradient-to-r from-yellow-400/30 via-yellow-400 to-yellow-400/30 mx-auto mt-2"></span>
            </h3>

            <p className="text-gray-100 text-base leading-relaxed max-w-3xl mx-auto mb-6">
              Ocurrió un problema al cargar el pie de página. Por favor, intenta
              recargar la página.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-lg font-medium hover:from-yellow-500 hover:to-yellow-600 transition-colors shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30"
            >
              Reintentar
            </button>

            <div className="flex justify-center mt-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mt-12 max-w-[1000px] mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-[0px_8px_20px_rgba(0,0,0,0.3)] overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500"></div>

          <div className="p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl text-center font-bold mb-4 text-yellow-400 relative">
              Contenido no disponible
              <span className="block h-0.5 w-16 bg-gradient-to-r from-yellow-400/30 via-yellow-400 to-yellow-400/30 mx-auto mt-2"></span>
            </h3>

            <p className="text-gray-100 text-base leading-relaxed max-w-3xl mx-auto mb-6">
              El pie de página que buscas no está disponible en este momento.
            </p>

            <div className="flex justify-center mt-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {data.estado !== 0 && (
        <div
          className="mt-12 mx-6 lg:mx-[100px] rounded-[27px] overflow-hidden shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
          style={footerBgStyle}
        >
          {/* Fila superior: título izquierda + descripción derecha */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 p-8 lg:p-12 items-start">
            <div className="w-full lg:w-[45%] flex-shrink-0">
              <h3 className="font-extrabold text-[#FFB800] text-3xl lg:text-[50px] leading-tight lg:leading-[56px] tracking-[-0.48px]">
                {data.titulo}
              </h3>
            </div>
            <div className="flex-1">
              <p className="text-[#CCC3D4] text-base lg:text-[20px] leading-[24px]">
                {data.descripcion}
              </p>
            </div>
          </div>

          {/* Fila inferior: 3 imágenes */}
          {(data.public_image1 || data.public_image2 || data.public_image3) && (
            <div className="flex flex-col sm:flex-row gap-4 px-8 lg:px-12 pb-10">
              {[
                { src: data.public_image1, alt: data.alt_image1, title: data.title_image1 },
                { src: data.public_image2, alt: data.alt_image2, title: data.title_image2 },
                { src: data.public_image3, alt: data.alt_image3, title: data.title_image3 },
              ].map((image, index) => {
                const imageUrl = getImageUrl(image.src);
                return (
                  <div key={index} className="flex-1">
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={image.alt || `Imagen ${index + 1}`}
                      title={image.title || ""}
                      className="w-full h-[160px] lg:h-[208px] object-cover rounded-[17px]"
                      width={368}
                      height={208}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}