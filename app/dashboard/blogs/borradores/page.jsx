"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import axios from "axios"
import Swal from "sweetalert2"
import { getCookie } from "cookies-next"
import url from "../../../../api/url"
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import auth_service from "../../users/services/auth.service"
import {
    Search,
    Eye,
    Trash2,
    Loader2,
    RefreshCw,
    Pencil,
    FilePen,
    ChevronLeft,
    ChevronRight
} from "lucide-react"

export default function Borradores() {

    const [draftBlogs, setDraftBlogs] = useState([])
    const [filteredBlogs, setFilteredBlogs] = useState([])
    const [displayedBlogs, setDisplayedBlogs] = useState([])

    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const blogsPerPage = 5

    useEffect(() => {
        fetchDraftBlogs()
    }, [])

    useEffect(() => {
        filterBlogs()
    }, [searchQuery, draftBlogs])

    useEffect(() => {
        paginateBlogs()
    }, [filteredBlogs, currentPage])

    async function fetchDraftBlogs() {
        try {
            setIsRefreshing(true)

            const res = await axios.get(`${url}/api/cards`, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })

            // FILTRO DE BORRADORES
            const borradores = res.data.filter(b => b.estado_publicacion === 0)

            setDraftBlogs(borradores)
            setFilteredBlogs(borradores)
            setCurrentPage(1)
        } catch (error) {
            console.error("Error obteniendo borradores:", error)
        } finally {
            setIsRefreshing(false)
            setIsLoading(false)
        }
    }

    //Funcion para eliminar 
    function confirmDelete(id) {
            Swal.fire({
                title: "¿Eliminar este blog?",
                text: "Esta acción no se puede deshacer",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#f43f5e",
                cancelButtonColor: "#64748b",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
                buttonsStyling: true,
                customClass: {
                    confirmButton: "!px-6",
                    cancelButton: "!px-6",
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteBlog(id)
                }
            })
        }

    async function deleteBlog(id) {
        try {
            const response = await axios.delete(`${url}/api/blogs/${id}`, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })

            if (response.status === 200) {
                Swal.fire({
                    title: "Blog eliminado",
                    text: "El blog ha sido eliminado exitosamente",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#0ea5e9",
                })
                fetchDraftBlogs()
            } else {
                showError("No se pudo eliminar el blog.")
            }
        } catch (error) {
            showError("Ocurrió un error al eliminar el blog.")
            console.error(error)
        }
    }
    function showError(message) {
            Swal.fire({
                title: "Error",
                text: message,
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#0ea5e9",
            })
        }

    const filterBlogs = () => {
        if (!searchQuery.trim()) {
            setFilteredBlogs(draftBlogs)
            return
        }

        const query = searchQuery.toLowerCase().trim()
        const filtered = draftBlogs.filter((blog) =>
            blog.titulo.toLowerCase().includes(query)
        )

        setFilteredBlogs(filtered)
        setCurrentPage(1)
    }

    const paginateBlogs = () => {
        const startIndex = (currentPage - 1) * blogsPerPage
        const endIndex = startIndex + blogsPerPage
        setDisplayedBlogs(filteredBlogs.slice(startIndex, endIndex))
    }

    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil(filteredBlogs.length / blogsPerPage))
    }, [filteredBlogs])

    const clearSearch = () => setSearchQuery("")
    const router = useRouter();

    return (
        <main className="p-6 flex flex-col w-full bg-slate-50 dark:bg-slate-900">
            <button
                onClick={() => router.push("/dashboard/blogs")}
                className="flex items-center gap-2 px-3 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 rounded-md text-sm font-medium w-fit mb-4 dark:hover:bg-slate-700"
            >
                <ArrowLeft size={18} />
                Regresar
            </button>
            {/* Title */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-6">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    Borradores de Blogs
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Blogs creados pero aún no publicados
                </p>

                {/* Buscador */}
                <div className="mt-4 flex gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar por título..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-10 py-2 bg-slate-50 dark:bg-slate-700 
                            border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 
                            rounded-lg focus:ring-2 focus:ring-sky-500"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                        {searchQuery && (
                            <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2">
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Refresh */}
                    <button
                        onClick={fetchDraftBlogs}
                        className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 
                        rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                        {isRefreshing ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <RefreshCw className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>

            {/* CARGANDO */}
            {isLoading ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="h-10 w-10 animate-spin text-sky-600" />
                </div>
            ) : displayedBlogs.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 p-10 rounded-xl shadow-sm text-center">
                    <FilePen className="mx-auto w-10 h-10 text-slate-400 mb-4" />
                    <p className="text-slate-500">No hay borradores por ahora.</p>
                </div>
            ) : (
                <>
                    {/* VISTA TABLA (DESKTOP) */}
                    <div className="hidden md:block bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-x-auto mb-6">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
                                    <th className="px-6 py-3 text-left text-xs font-semibold">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold">Título</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold">Descripción</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold">Imagen</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedBlogs.map((blog) => (
                                    <tr key={blog.id_card} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                                        <td className="px-6 py-4">{blog.id_card}</td>
                                        <td className="px-6 py-4 max-w-[200px] truncate">{blog.titulo}</td>
                                        <td className="px-6 py-4 max-w-[300px] truncate">{blog.descripcion}</td>
                                        <td className="px-6 py-4">
                                            <img src={blog.public_image} alt={blog.titulo} className="w-12 h-12 rounded-lg object-cover" />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex gap-2 justify-end">
                                                <Link
                                                    href={`/edition?mode=edit&id=${blog.id_blog}`}
                                                    className="p-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
                                                    title="Editar blog"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                                {auth_service.hasRole("administrador") && (
                                                    <button
                                                        onClick={() => confirmDelete(blog.id_blog)}
                                                        className="flex items-center justify-center p-2 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors"
                                                        title="Eliminar blog"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* VISTA TARJETAS (MOBILE - REFERENCIA SECCIÓN ROLES) */}
                    <div className="grid gap-4 md:hidden mb-6">
                        {displayedBlogs.map((blog) => (
                            <div
                                key={`mobile-${blog.id_card}`}
                                className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 shadow-sm p-4"
                            >
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-2">
                                            <span className="font-semibold text-xs text-gray-500 dark:text-gray-400">
                                                ID:
                                            </span>
                                            <span className="font-medium text-gray-900 dark:text-gray-100 ml-2">
                                                #{blog.id_card}
                                            </span>
                                        </div>

                                        <div className="mb-2">
                                            <span className="font-semibold text-xs text-gray-500 dark:text-gray-400">
                                                TÍTULO:
                                            </span>
                                            <span className="font-medium text-gray-900 dark:text-gray-100 ml-2 break-words">
                                                {blog.titulo}
                                            </span>
                                        </div>

                                        <div>
                                            <span className="font-semibold text-xs text-gray-500 dark:text-gray-400">
                                                DESCRIPCIÓN:
                                            </span>
                                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-3 break-words">
                                                {blog.descripcion}
                                            </p>
                                        </div>
                                    </div>

                                    {blog.public_image && (
                                        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                                            <img
                                                src={blog.public_image}
                                                alt={blog.titulo}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Separador y acciones en la parte inferior */}
                                <div className="flex justify-end items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 gap-2">
                                    <Link
                                        href={`/edition?mode=edit&id=${blog.id_blog}`}
                                        className="p-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
                                        title="Editar blog"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                    {auth_service.hasRole("administrador") && (
                                        <button
                                            onClick={() => confirmDelete(blog.id_blog)}
                                            className="flex items-center justify-center p-2 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors"
                                            title="Eliminar blog"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* PAGINACIÓN */}
                    <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                        <span className="text-sm text-slate-500">
                            Mostrando {displayedBlogs.length} de {filteredBlogs.length}
                        </span>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                className="p-2 border rounded-lg"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-8 h-8 rounded-lg border ${currentPage === i + 1
                                        ? "bg-sky-100 text-sky-700 border-sky-300"
                                        : "bg-white"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                className="p-2 border rounded-lg"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </main>
    )
}
