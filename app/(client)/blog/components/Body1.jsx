"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Loader2, CheckCircle, ArrowRight } from "lucide-react";
import Fetch from "../services/fetch";
import Image from "next/image";

<<<<<<< Updated upstream
export default function Body1({ id_blog_body, fecha }) {
=======
const getBackgroundStyle = (bgColor = "#5A37A6", bgType = "solid", bgColors = "") => {
  if (bgType === "gradient" && bgColors) {
    const colors = bgColors.split(",").map(c => c.trim()).filter(Boolean);
    if (colors.length >= 2) {
      if (colors.length >= 3) {
        return { backgroundImage: `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})` };
      }
      return { backgroundImage: `linear-gradient(to right, ${colors[0]}, ${colors[1]})` };
    }
  }
  return { backgroundColor: bgColor };
};

export default function Body1({ id_blog_body, fecha, bg_color, bg_type, bg_colors }) {
>>>>>>> Stashed changes
  const [data, setDataResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function renderDescripcion(texto, palabraClave, enlace) {
    if (!palabraClave || !enlace) {
      return texto;
    }

    // Buscar la frase completa (case insensitive) hola mundo
    const regex = new RegExp(`(${palabraClave})`, "gi");
    const partes = texto.split(regex);

    return partes.map((parte, i) => {
      // Si coincide con la palabra clave (incluso con mayúsculas/minúsculas diferentes)
      if (parte.toLowerCase() === palabraClave.toLowerCase()) {
        return (
          <a
            key={i}
            href={enlace}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 font-bold underline hover:text-blue-200"
          >
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

    fetchBlogData();
  }, [id_blog_body]);

  const getImageUrl = (previewImageUrl, fallback) => {
    if (!previewImageUrl) return fallback;

    if (previewImageUrl.startsWith("blob:")) {
      return previewImageUrl;
    }

    return `${previewImageUrl}?v=${Date.now()}`;
  };

  if (isLoading) {
    return (
      <div className="relative lg:mx-48 p-6 bg-black/5 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.15)] animate-pulse">
        <div className="flex flex-col xl:flex-col lg:gap-6">
          <div className="w-full">
            <div className="mb-6 mt-5 flex flex-col items-center">
              <div className="h-12 bg-red-200 rounded-lg w-3/4 mb-3"></div>
              <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="h-24 bg-gray-200 rounded-lg mx-auto md:w-3/4"></div>
          </div>
          <div className="flex justify-center w-full mt-8">
            <div className="w-80 xl:w-96 h-64 bg-red-100 rounded-3xl"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mx-auto mt-16">
          <div className="grid grid-cols-1 gap-8">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="p-4 bg-gray-800 rounded-lg h-32"
              ></div>
            ))}
          </div>
          <div className="flex flex-col justify-center p-6 bg-gray-800 rounded-lg h-80"></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm rounded-lg">
          <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center">
            <Loader2 className="h-12 w-12 text-red-500 animate-spin mb-4" />
            <p className="text-gray-700 font-medium">Cargando contenido...</p>
            <p className="text-gray-500 text-sm mt-1">
              Esto puede tomar unos segundos
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative lg:mx-48 p-12 bg-black/5 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No se pudo cargar el contenido
        </h2>
        <p className="text-gray-600 mb-6">
          Por favor, intenta recargar la página
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="relative lg:mx-48 p-12 bg-black/5 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center">
        <div className="text-gray-400 text-6xl mb-4">📄</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No hay contenido disponible
        </h2>
        <p className="text-gray-600">
          El artículo que buscas no está disponible en este momento
        </p>
      </div>
    );
  }

  return (
<<<<<<< Updated upstream
    <div className="relative lg:mx-48 p-0 text-white rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-[0px_20px_40px_rgba(0,0,0,0.45)]">
=======
    <div className="relative lg:mx-48 p-0 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] overflow-hidden" style={{
        ...getBackgroundStyle(
          data?.bg_color || bg_color,
          data?.bg_type || bg_type || "solid",
          data?.bg_colors || bg_colors
        )
      }}>
>>>>>>> Stashed changes
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
        <Image
          // src={
          //   data.public_image1
          //     ? data.public_image1.startsWith("http")
          //       ? data.public_image1
          //       : `${data.public_image1}`
          //     : "/blog/blog-4.webp"
          // }
          src={getImageUrl(data.public_image1, "/blog/blog-4.webp")}
          alt={data.alt_image1 || data.titulo}
          title={data.title_image1}
          className="absolute inset-0 w-full h-full object-cover"
          width={800}
          height={400}
        />
        <div className="relative z-20 h-full flex flex-col justify-end p-8">
          <p className="text-[#F2C230] mb-2 font-medium">{fecha}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            {data.titulo}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#F2A30F] to-[#F2C230] rounded-full"></div>
        </div>
      </div>

      <div className="p-8">
        <div className="relative mb-16 bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl -mt-12">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#F2A30F] to-[#F2C230]"></div>
          <p className="text-lg leading-relaxed text-gray-200">
            {data.descripcion}
          </p>
        </div>
        {data.flag_consejos !== 0 && (
          <div className="mb-16 p-6 bg-gradient-to-br from-[#060126] to-[#0A0140] rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] text-center text-white">
            <div className="flex items-center justify-center mb-4">
              <div className="h-0.5 w-12 bg-[#F2A30F] mr-4"></div>
              <h3 className="text-2xl font-bold text-[#F2C230]">
                {data.commend_tarjeta?.titulo || "Consejos"}
              </h3>
              <div className="h-0.5 w-12 bg-[#F2A30F] ml-4"></div>
            </div>

            <ul className="list-none text-black-600 space-y-3 max-w-2xl mx-auto">
              {data.commend_tarjeta &&
                [
                  data.commend_tarjeta.texto1,
                  data.commend_tarjeta.texto2,
                  data.commend_tarjeta.texto3,
                  data.commend_tarjeta.texto4,
                  data.commend_tarjeta.texto5,
                ]
                  .filter((text) => text)
                  .map((text, index) => (
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
        )}

        {data.flag_galeria !== 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {[
              // data.public_image2 || "/blog/blog-10.webp",
              // data.public_image3 || "/blog/blog-1.webp",
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
                className="group relative overflow-hidden rounded-2xl border border-white/10 shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#060126]/95 via-[#0A0140]/70 to-transparent z-10"></div>
                <Image
                  src={image.src}
                  // alt={`Imagen ${index + 1} del artículo`}
                  alt={image.alt}
                  title={image.title}
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
        )}

        {data.flag_informacion !== 0 && (
          <div className="relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-center">
              <div className="inline-block px-4 py-1 bg-[#F2A30F] text-[#060126] text-sm font-medium rounded-full">
                {data.titulo_tarjeta || "Información Importante"}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
              {data.tarjetas &&
                data.tarjetas.map((section, index) => {
                  const styles = [
                    "bg-white/10 backdrop-blur-md border-l-4 border-[#F2A30F]",
                    "bg-white/10 backdrop-blur-md border-r-4 border-[#F2C230]",
                    "bg-white/10 backdrop-blur-md border-l-4 border-[#F2A30F]",
                    "bg-white/10 backdrop-blur-md border-r-4 border-[#F2C230]",
                  ];

                  return (
                    <div
                      key={`tarjeta-${index}`}
                      className={`p-5 rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                        styles[index % styles.length]
                      }`}
                    >
                      <h3 className="text-xl font-bold mb-3 text-[#F2C230]">
                        {section.titulo}
                      </h3>
                      <p className="text-gray-100">
                        {" "}
                        {renderDescripcion(
                          section.descripcion,
                          section.palabra,
                          section.enlace,
                        )}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
