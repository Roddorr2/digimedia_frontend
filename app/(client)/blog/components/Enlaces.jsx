"use client"
import { useEffect, useState, Suspense } from "react"
import Swal from "sweetalert2"
import { Search, ArrowRight, Loader2, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Fetch from "../services/fetch"

const ITEMS_PER_PAGE = 4

function EnlacesForm() {

    const [data, setDataResponse] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    async function fetchData(){
        try{
            setIsLoading(true);
            const response = await Fetch.fetchCards();
            setDataResponse(response);
        }catch(error){
            console.log(error)
            Swal.fire({title: "Error", 
                text: "Ocurrió un error inesperado.", 
                icon: "error", 
                confirmButtonText: "OK"
            })
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredData(data)
            setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE))
        } else {
            const filtered = data.filter(
                (card) =>
                    card.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    card.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            setFilteredData(filtered)
            setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE))
        }
        setCurrentPage(1) // Reinicia a la primera página al buscar
    }, [searchTerm, data])

    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE
        return filteredData.slice(startIndex, endIndex)
    }

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return
        setCurrentPage(page)
    }

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
    ]

    return (
        <section className="bg-gray-50 p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col-reverse lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Artículos Destacados</h2>
                            {!isLoading && filteredData.length > 0 && (
                                <p className="text-sm text-gray-500">
                                    Mostrando {getCurrentPageItems().length} de {filteredData.length} artículos
                                </p>
                            )}
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm">
                                <Loader2 className="h-10 w-10 text-purple-600 animate-spin mb-4" />
                                <p className="text-gray-500 font-medium">Cargando artículos...</p>
                            </div>
                        ) : filteredData.length > 0 ? (
                            <>
                                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-8">
                                    {getCurrentPageItems().map((card) => (
                                        <article
                                            key={`${card.id_card}-Card`}
                                            className="rounded-xl bg-white overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300"
                                        >
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={`${card.public_image}`}
                                                    alt={card.titulo}
                                                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                            </div>

                                            <div className="p-5 flex flex-col flex-grow">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">{card.titulo}</h3>
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{card.descripcion}</p>

                                                <a
                                                    href={`/blog/plantilla${card.id_plantilla}/?blog=${card.blog?.link}`}
                                                    target="_blank"
                                                    className="group flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-300 mt-auto"
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
                                    <div className="flex justify-center items-center space-x-2 mt-8">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage <= 1}
                                            className={`p-2 rounded-md border ${currentPage <= 1
                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    : "bg-white text-gray-700 hover:bg-gray-50"
                                                }`}
                                            aria-label="Página anterior"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>

                                        <div className="flex space-x-1">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`w-9 h-9 flex items-center justify-center rounded-md ${currentPage === page
                                                            ? "bg-purple-600 text-white"
                                                            : "bg-white text-gray-700 hover:bg-gray-50"
                                                        }`}
                                                    aria-label={`Página ${page}`}
                                                    aria-current={currentPage === page ? "page" : undefined}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage >= totalPages}
                                            className={`p-2 rounded-md border ${currentPage >= totalPages
                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    : "bg-white text-gray-700 hover:bg-gray-50"
                                                }`}
                                            aria-label="Página siguiente"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm">
                                <p className="text-gray-500 font-medium mb-2">No se encontraron artículos</p>
                                <p className="text-gray-400 text-sm">Intenta con otra búsqueda</p>
                            </div>
                        )}
                    </div>

                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
                                <h3 className="text-xl font-bold text-white mb-4">Explora Nuestro Blog</h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Buscar artículos..."
                                        className="w-full px-4 py-3 pl-10 rounded-lg outline-none text-gray-700 focus:ring-2 focus:ring-purple-300 transition-all duration-300"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value)
                                        }}
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                </div>
                            </div>

                            <div className="p-6">
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Categorías</h4>
                                <div className="space-y-3">
                                    {categories.map((category, index) => (
                                        <a
                                            key={index}
                                            href={category.url}
                                            target="_blank"
                                            className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors duration-300 group"
                                            rel="noreferrer"
                                        >
                                            <span className="font-medium">{category.name}</span>
                                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default function Page(){
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Cargando...</div>}>
            <EnlacesForm />
        </Suspense>
    );
}

