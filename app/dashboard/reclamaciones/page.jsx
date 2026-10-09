"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import user_service from "../users/services/user.service";
import Swal from "sweetalert2";
import auth_service from "../users/services/auth.service";
import {
  Search,
  Eye,
  CheckCircle,
  Trash2,
  Loader2,
  Filter,
  Download,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import Pagination1 from "../components/Pagination1";

import url from "../../../api/url";

const API_BASE_URL = `${url}/api/reclamaciones`;

export default function Page() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  // Modificamos la función para que reciba la página actual que queremos consultar
  async function fetchReclamacion(pageToFetch = currentPage) {
    setIsRefreshing(true);
    setIsLoading(true);

    try {
      const response = await axios.get(`${API_BASE_URL}?page=${pageToFetch}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      const pageData = response.data.data || [];

      setData(pageData);
      setFilteredData(pageData);

      let totalPaginas = 1;

      if (response.data.last_page) {
        totalPaginas = response.data.last_page;
      } else if (response.data.meta && response.data.meta.last_page) {
        totalPaginas = response.data.meta.last_page;
      } else if (response.data.total) {
        totalPaginas = Math.ceil(response.data.total / 4);
      } else if (response.data.meta && response.data.meta.total) {
        totalPaginas = Math.ceil(response.data.meta.total / 4);
      }

      let totalReal =
        response.data.total ?? response.data.meta?.total ?? pageData.length;
      let realPerPage =
        response.data.per_page ?? response.data.meta?.per_page ?? 4;

      setTotalItems(totalReal);
      setPerPage(realPerPage);
      setTotalPages(totalPaginas);
    } catch (error) {
      console.error("Error al obtener los datos:", error.message);

      if (error.response && error.response.status === 401) {
        Swal.fire({
          title: "Sesión Expirada",
          text: "Por favor, inicia sesión nuevamente.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then(() => {
          deleteCookie("reclamacion");
          user_service.logoutClient(router);
        });
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  async function deleteReclamacion(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Eliminado",
          text: "La reclamación ha sido eliminada exitosamente.",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchReclamacion(currentPage);
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar la reclamación.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          title: "Sesión Expirada",
          text: "Por favor, inicia sesión nuevamente.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then(() => {
          deleteCookie("reclamacion");
          user_service.logoutClient(router);
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error inesperado.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  }

  function confirmarEliminacion(id) {
    Swal.fire({
      title: "¿Estás seguro en eliminar este registro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReclamacion(id);
      }
    });
  }

  function confirmarCambiarEstado(id, nuevoEstado) {
    Swal.fire({
      title: `¿Cambiar estado de reclamación a ${nuevoEstado}?`,
      text: "¡Puedes cambiarlo después nuevamente!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        cambiarEstado(id, nuevoEstado);
      }
    });
  }

  async function cambiarEstado(id, nuevoEstado) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${id}`,
        { estado: nuevoEstado },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Estado Cambiado",
          text: `El estado de la reclamación se cambió a ${nuevoEstado}`,
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchReclamacion(currentPage);
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo cambiar el estado de la reclamación",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          title: "Sesión Expirada",
          text: "Por favor, inicia sesión nuevamente.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then(() => {
          deleteCookie("reclamacion");
          user_service.logoutClient(router);
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error inesperado.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  }

  async function visualizar(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
      if (response.status === 200 && response.data) {
        setCookie("reclamacion", JSON.stringify(response.data.data), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        router.push(`./view/`);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          Swal.fire({
            title: "No Encontrado",
            text: "La reclamación no existe",
            icon: "warning",
            confirmButtonText: "OK",
          });
        } else if (error.response.status === 401) {
          Swal.fire({
            title: "Sesión Expirada",
            text: "Por favor, inicia sesión nuevamente.",
            icon: "warning",
            confirmButtonText: "OK",
          });
          deleteCookie("reclamacion");
          router.push("/login");
        } else {
          Swal.fire({
            title: "Error",
            text: "Ocurrió un error al obtener los datos.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        Swal.fire({
          title: "Error de conexión",
          text: "No se pudo conectar con el servidor.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  }

  useEffect(() => {
    fetchReclamacion(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (reclamacion) =>
          (reclamacion.nombre &&
            reclamacion.nombre
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (reclamacion.apellido &&
            reclamacion.apellido
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (reclamacion.email &&
            reclamacion.email
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (reclamacion.id_reclamacion &&
            reclamacion.id_reclamacion.toString().includes(searchTerm)),
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  const exportToCSV = () => {
    if (filteredData.length === 0) {
      Swal.fire({
        title: "Sin datos",
        text: "No hay datos para exportar",
        icon: "info",
        confirmButtonText: "OK",
      });
      return;
    }

    // Crear encabezados CSV
    const headers = ["ID", "Nombre", "Apellido", "Correo", "Estado"];

    // Convertir datos a formato CSV
    const csvData = filteredData.map((reclamacion) => [
      reclamacion.id_reclamacion,
      reclamacion.nombre,
      reclamacion.apellido,
      reclamacion.email,
      reclamacion.estadoReclamo,
    ]);

    // Combinar encabezados y datos
    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    // Crear blob y descargar
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "reclamaciones.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="p-4 md:p-6 flex flex-col w-full overflow-x-auto bg-gray-50 dark:bg-gray-900">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 dark:bg-gray-800 dark:text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Gestión de Reclamaciones
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, correo o ID..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg border border-green-100 hover:bg-green-100 transition-colors dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/30"
                title="Exportar a CSV"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Exportar</span>
              </button>

              <button
                onClick={() => fetchReclamacion()}
                disabled={isRefreshing}
                className={`flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/30 ${isRefreshing ? "opacity-70 cursor-not-allowed" : ""}`}
                title="Actualizar datos"
              >
                {isRefreshing ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <RefreshCw size={18} />
                )}
                <span className="hidden sm:inline">Actualizar</span>
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-10 w-10 text-[#8c52ff] animate-spin mb-4" />
            <p className="text-gray-500 font-medium">
              Cargando reclamaciones...
            </p>
          </div>
        ) : (
          <>
            {/* TABLA - Desktop */}
            <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-[#8c52ff]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">
                      Nombres
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">
                      Correo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredData.length > 0 &&
                    filteredData.map((reclamacion, index) => (
                        <tr
                          key={`${reclamacion.id_reclamacion}-Row`}
                          className={`${
                            index % 2 === 0
                              ? "bg-white dark:bg-gray-900"
                              : "bg-gray-50 dark:bg-gray-700"
                          } hover:bg-neutral-200 transition-colors`}
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                            {reclamacion.id_reclamacion}
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-700 dark:text-white">
                            {reclamacion.nombre} {reclamacion.apellido}
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-700 dark:text-white">{reclamacion.email}</td>

                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                reclamacion.estadoReclamo === "ATENDIDO"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                              }`}
                            >
                              {reclamacion.estadoReclamo === "ATENDIDO" ? (
                                <CheckCircle size={12} />
                              ) : (
                                <AlertCircle size={12} />
                              )}

                              {reclamacion.estadoReclamo}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() =>
                                  visualizar(reclamacion.id_reclamacion)
                                }
                                title="Visualizar"
                                className="p-1.5 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/30"
                              >
                                <Eye size={18} />
                              </button>

                              <button
                                onClick={() =>
                                  confirmarCambiarEstado(
                                    reclamacion.id_reclamacion,
                                    reclamacion.estadoReclamo === "PENDIENTE"
                                      ? "ATENDIDO"
                                      : "PENDIENTE",
                                  )
                                }
                                title={`Cambiar a ${reclamacion.estadoReclamo === "PENDIENTE" ? "ATENDIDO" : "PENDIENTE"}`}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  reclamacion.estadoReclamo === "PENDIENTE"
                                    ? "bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
                                    : "bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/30"
                                }`}
                              >
                                <CheckCircle size={18} />
                              </button>

                              {auth_service.hasRole("administrador") && (
                                <button
                                  onClick={() =>
                                    confirmarEliminacion(
                                      reclamacion.id_reclamacion,
                                    )
                                  }
                                  title="Eliminar"
                                  className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                                >
                                  <Trash2 size={18} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>

            {/* TARJETAS - Mobile / Tablet */}
            <div className="grid gap-4 lg:hidden">
              {filteredData.length > 0 ? (
                filteredData.map((reclamacion) => (
                    <div
                      key={`${reclamacion.id_reclamacion}-Card`}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Reclamación</p>

                          <p className="font-bold text-lg dark:text-white">
                            #{reclamacion.id_reclamacion}
                          </p>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                            reclamacion.estadoReclamo === "ATENDIDO"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          }`}
                        >
                          {reclamacion.estadoReclamo === "ATENDIDO" ? (
                            <CheckCircle size={12} />
                          ) : (
                            <AlertCircle size={12} />
                          )}

                          {reclamacion.estadoReclamo}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Nombre</p>

                          <p className="font-medium dark:text-white">
                            {reclamacion.nombre} {reclamacion.apellido}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Correo</p>

                          <p className="break-all text-sm dark:text-gray-300">
                            {reclamacion.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-3 border-t dark:border-gray-700">
                        <button
                          onClick={() => visualizar(reclamacion.id_reclamacion)}
                          className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/30"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() =>
                            confirmarCambiarEstado(
                              reclamacion.id_reclamacion,
                              reclamacion.estadoReclamo === "PENDIENTE"
                                ? "ATENDIDO"
                                : "PENDIENTE",
                            )
                          }
                          className={`p-2 rounded-lg ${
                            reclamacion.estadoReclamo === "PENDIENTE"
                              ? "bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
                              : "bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/30"
                          }`}
                        >
                          <CheckCircle size={18} />
                        </button>

                        {auth_service.hasRole("administrador") && (
                          <button
                            onClick={() =>
                              confirmarEliminacion(reclamacion.id_reclamacion)
                            }
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
                  <Filter className="h-12 w-12 mx-auto text-gray-300 mb-3" />

                  <p className="text-gray-500">
                    No hay reclamaciones disponibles
                  </p>

                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="mt-3 text-[#8c52ff] hover:underline"
                    >
                      Limpiar búsqueda
                    </button>
                  )}
                </div>
              )}
            </div>

            <Pagination1
              filteredData={filteredData}
              currentPage={currentPage}
              totalPages={totalPages}
              perPage={perPage}
              totalItems={totalItems}
            />
          </>
        )}
      </div>
    </main>
  );
}
