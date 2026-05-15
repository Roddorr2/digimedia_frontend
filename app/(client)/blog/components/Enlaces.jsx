"use client";
import { useEffect, useState, Suspense } from "react";
import Swal from "sweetalert2";
import {
  Search,
  ArrowRight,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Fetch from "../services/fetch";
import styles from "./enlaces.module.css";
import Image from "next/image";

const ITEMS_PER_PAGE = 4;

function EnlacesForm() {
  const [data, setDataResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await Fetch.fetchCards();
      if (Array.isArray(response)) {
        setDataResponse(response);
      } else if (response && Array.isArray(response.data)) {
        setDataResponse(response.data);
      } else {
        setDataResponse([]);
      }
    } catch (error) {      Swal.fire({
        title: "Error",
        text: "Ocurrió un error inesperado.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(data);
      setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
    } else {
      const filtered = data.filter(
        (card) =>
          card.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
      setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    }
    setCurrentPage(1); // Reinicia a la primera página al buscar
  }, [searchTerm, data]);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const categories = [
    {
      name: "Tu Bar en la Mira",
      url: "/blog/look/blog-bar",
    },
    {
      name: "Diseño y Desarrollo Web",
      url: "/blog/look/desarrollo-web",
    },
    {
      name: "Gestión de Redes Sociales",
      url: "/blog/look/gestion-redes",
    },
    {
      name: "Branding y Diseño",
      url: "/blog/look/branding",
    },
    {
      name: "Marketing y Gestión Digital",
      url: "/blog/look/marketing-digital",
    },
  ];

  return (
    <section className="bg-[#efefef] px-4 md:px-6 pb-10 pt-14">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <div className="order-2 lg:order-1">
            <div className="flex justify-between items-center mb-8 gap-3">
              <h2 className="text-[30px] md:text-[32px] leading-none uppercase text-[#b525fe] tracking-wide">
                Artículos Destacados
              </h2>
              {!isLoading && filteredData.length > 0 && (
                <p className="text-[12px] text-[#8f8f8f]">
                  Mostrando {getCurrentPageItems().length} de {filteredData.length} elementos
                </p>
              )}
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-[16px] border border-[#dedede]">
                <Loader2 className="h-10 w-10 text-[#b525fe] animate-spin mb-4" />
                <p className="text-gray-500 font-medium">
                  Cargando artículos...
                </p>
              </div>
            ) : filteredData.length > 0 ? (
              <>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-6">
                  {getCurrentPageItems().map((card) => (
                    <article
                      key={`${card.id_card}-Card`}
                      className="rounded-[18px] bg-white overflow-hidden flex flex-col border border-[#d9d9d9]"
                    >
                      <div className="relative overflow-hidden">
                        <Image
                          src={`${card.public_image}?v=${Date.now()}`}
                          alt={card.blog?.head?.alt || card.titulo} // Le aumento la condicional "?" ya que me tiraba error al entrar a los blog
                          title={card.blog?.head?.title || card.titulo} // Le aumento la condicional "?" ya que me tiraba error al entrar a los blog
                          className="w-full h-52 object-cover"
                          width={400}
                          height={250}
                        />
                      </div>

                      <div className="p-5 flex flex-col flex-grow">
                        <h3
                          className={`text-[21px] md:text-[22px] leading-tight text-[#1f1f1f] mb-3 ${styles["line-clamp-2"]}`}
                        >
                          {card.titulo}
                        </h3>
                        <p className="text-[#5b5b5b] text-[14px] mb-4 line-clamp-3 flex-grow">
                          {card.descripcion}
                        </p>

                        <a
                          href={`/blog/plantilla${card.id_plantilla}?blog=${card.blog?.link}`}
                          target="_blank"
                          className="group flex items-center justify-center gap-2 bg-[#b525fe] hover:bg-[#8e1fd1] text-white text-[14px] font-semibold py-2.5 px-4 rounded-[8px] transition-colors duration-300 mt-auto"
                          rel="noreferrer"
                        >
                          Leer más
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-1 mt-8">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage <= 1}
                      className={`w-7 h-7 flex items-center justify-center rounded-[6px] border text-sm ${
                        currentPage <= 1
                          ? "bg-[#ececec] text-[#bdbdbd] border-[#dddddd]"
                          : "bg-white text-[#727272] border-[#d7d7d7]"
                      }`}
                      aria-label="Página anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-7 h-7 text-[12px] rounded-[6px] border ${
                          currentPage === page
                            ? "bg-[#b525fe] border-[#b525fe] text-white"
                            : "bg-white border-[#d7d7d7] text-[#4d4d4d]"
                        }`}
                        aria-label={`Página ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                      className={`w-7 h-7 flex items-center justify-center rounded-[6px] border text-sm ${
                        currentPage >= totalPages
                          ? "bg-[#ececec] text-[#bdbdbd] border-[#dddddd]"
                          : "bg-white text-[#727272] border-[#d7d7d7]"
                      }`}
                      aria-label="Página siguiente"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-[16px] border border-[#dedede]">
                <p className="text-gray-500 font-medium mb-2">
                  No se encontraron artículos
                </p>
                <p className="text-gray-400 text-sm">
                  Intenta con otra búsqueda
                </p>
              </div>
            )}
          </div>

          <aside className="order-1 lg:order-2">
            <div className="bg-white rounded-[14px] border border-[#cfcfcf] overflow-hidden">
              <div className="bg-[#f59f00] p-4 md:p-5">
                <h3 className="text-[24px] md:text-[26px] uppercase text-white mb-3 leading-tight">
                  Explora Nuestro Blog
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar artículos..."
                    className="w-full h-10 pr-3 pl-9 rounded-[4px] outline-none text-[12px] text-[#5a5a5a]"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#707070] w-4 h-4" />
                </div>
              </div>

              <div className="p-4 md:p-5">
                <h4 className="text-[16px] font-semibold text-[#6f6f6f] uppercase tracking-wide mb-4">
                  Categorías
                </h4>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <a
                      key={index}
                      href={category.url}
                      target="_blank"
                      className="block text-[#7a7a7a] hover:text-[#b525fe] text-[16px] leading-snug"
                      rel="noreferrer"
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Cargando...
        </div>
      }
    >
      <EnlacesForm />
    </Suspense>
  );
}
