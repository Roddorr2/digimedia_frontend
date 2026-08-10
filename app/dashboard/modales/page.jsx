"use client";

import { useEffect, useState } from "react";
import Pagination1 from "../components/Pagination1";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import user_service from "../users/services/user.service";
import url from "../../../api/url";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Search,
  Eye,
  ToggleLeft,
  Trash2,
  Loader2,
  Filter,
  Download,
  RefreshCw,
  Contact,
} from "lucide-react";
import auth_service from "../users/services/auth.service";
import Link from "next/link";

const API_BASE_URL = `${url}/api/modales`;

export default function Page() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // ⚠️ CAMBIADO A 0
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  async function fetchModals(pageTarget = 1, query = "") {
    setIsRefreshing(true);
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${API_BASE_URL}?page=${pageTarget}&search=${query}`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        },
      );

      const dataArray = response.data.data || [];

      setData(dataArray);
      setFilteredData(dataArray);

      let totalPaginas = 1;

      if (response.data.last_page) {
        totalPaginas = response.data.last_page;
      } else if (response.data.meta && response.data.meta.last_page) {
        totalPaginas = response.data.meta.last_page;
      } else if (response.data.total) {
        totalPaginas = Math.ceil(response.data.total / 15);
      } else if (response.data.meta && response.data.meta.total) {
        totalPaginas = Math.ceil(response.data.meta.total / 15);
      }

      setTotalPages(totalPaginas);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          title: "Sesión Expirada",
          text: "Por favor, inicia sesión nuevamente.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then(() => {
          deleteCookie("modal");
          user_service.logoutClient(router);
        });
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }
  async function deleteModal(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Eliminado",
          text: "El modal ha sido eliminado exitosamente.",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchModals(currentPage, searchTerm);
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el modal.",
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
          deleteCookie("modal");
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
        deleteModal(id);
      }
    });
  }

  function confirmarCambiarEstado(id, nuevoEstado) {
    Swal.fire({
      title: `¿Cambiar estado de modal a ${nuevoEstado == 0 ? "Inactivo" : "Activo"}?`,
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
          text: `El estado del modal se cambio a ${nuevoEstado == 0 ? "Inactivo" : "Activo"}`,
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchModals(currentPage, searchTerm);
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo cambiar el estado del modal.",
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
          deleteCookie("modal");
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
        setCookie("modal", JSON.stringify(response.data.data), {
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
            text: "El modal no existe en la base de datos.",
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
          deleteCookie("modal");
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
    const delayDebounceFn = setTimeout(() => {
      fetchModals(currentPage, searchTerm);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, currentPage]);

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

    const headers = ["ID", "Nombre", "Correo", "Estado", "Servicio Contratado", "Subservicio"];

    const csvData = filteredData.map((modal) => [
      modal.id_modalservicio,
      modal.nombre,
      modal.correo,
      modal.servicio?.nombre,
      modal.estado ? "Activo" : "Inactivo",
      modal.subservicio?.nombre || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "modales.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="p-4 md:p-6 flex flex-col w-full bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 dark:bg-gray-800 dark:text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Gestión de Modales
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, correo o ID..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg border border-green-100 hover:bg-green-100 transition-colors"
                title="Exportar a CSV"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Exportar</span>
              </button>

              <button
                onClick={() => fetchModals(currentPage, searchTerm)}
                disabled={isRefreshing}
                className={`flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors ${isRefreshing ? "opacity-70 cursor-not-allowed" : ""}`}
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
            <p className="text-gray-500 font-medium">Cargando modales...</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-auto border border-gray-200 dark:border-gray-800 shadow-sm rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead>
                  <tr className="bg-[#8c52ff] hover:bg-[#8c52ff]">
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider h-12"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider h-12"
                    >
                      Nombres
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider h-12"
                    >
                      Correo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider h-12"
                    >
                      Servicio de Contrato
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider h-12"
                    >
                      Subservicio
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider h-12"
                    >
                      Estado
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider h-12"
                    >
                      ACCIONES
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-800">
                  {filteredData.length > 0 ? (
                    filteredData.map((modal, index) => (
                      <tr
                        key={`${modal.id_modalservicio}-Row`}
                        className={`${
                          index % 2 === 0
                            ? "bg-white dark:bg-gray-900"
                            : "bg-gray-50/50 dark:bg-gray-800/50"
                        } hover:bg-neutral-100 dark:hover:bg-gray-800 transition-colors`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-500 dark:text-gray-400">
                          #{modal.id_modalservicio}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold text-gray-900 dark:text-white">
                          {modal.nombre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700 dark:text-gray-300">
                          {modal.correo}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700 dark:text-gray-300">
                          {modal.servicio?.nombre || "—"}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700 dark:text-gray-300">
                          {modal.subservicio?.nombre || <span className="text-gray-400 dark:text-gray-500">—</span>}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              modal.estado
                                ? "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400 dark:border dark:border-green-800/50"
                                : "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-400 dark:border dark:border-red-800/50"
                            }`}
                          >
                            {modal.estado ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => visualizar(modal.id_modalservicio)}
                              title="Visualizar"
                              className="p-1.5 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors dark:bg-amber-950/40 dark:text-amber-400 dark:hover:bg-amber-900/60"
                            >
                              <Eye size={18} />
                            </button>

                            <button
                              title="Emails y WhatsApp"
                              className="p-1.5 bg-cyan-50 text-cyan-600 rounded-lg hover:bg-cyan-100 transition-colors dark:bg-cyan-950/40 dark:text-cyan-400 dark:hover:bg-cyan-900/60"
                            >
                              <Link
                                href={`/dashboard/modales/mails?id_modal=${modal.id_modalservicio}`}
                              >
                                <Contact size={17} />
                              </Link>
                            </button>

                            <button
                              onClick={() =>
                                confirmarCambiarEstado(
                                  modal.id_modalservicio,
                                  `${modal.estado ? 0 : 1}`,
                                )
                              }
                              title={`Cambiar a ${modal.estado ? "Inactivo" : "Activo"}`}
                              className={`p-1.5 rounded-lg transition-colors ${
                                modal.estado
                                  ? "bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-900/60"
                                  : "bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-950/40 dark:text-green-400 dark:hover:bg-green-900/60"
                              }`}
                            >
                              <ToggleLeft size={18} />
                            </button>

                            {auth_service.hasRole("administrador") && (
                              <button
                                onClick={() =>
                                  confirmarEliminacion(modal.id_modalservicio)
                                }
                                title="Eliminar"
                                className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/60"
                              >
                                <Trash2 size={18} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center">
                          <Filter className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
                          <p className="text-gray-500 dark:text-gray-400 font-medium mb-1">
                            No hay datos disponibles
                          </p>
                          {searchTerm && (
                            <>
                              <p className="text-gray-400 dark:text-gray-500 text-sm">
                                No se encontraron resultados para &quot;{searchTerm}&quot;
                              </p>
                              <button
                                onClick={() => setSearchTerm("")}
                                className="mt-3 text-[#8c52ff] text-sm font-medium hover:underline"
                              >
                                Limpiar búsqueda
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* CARDS MOBILE */}
            <div className="md:hidden space-y-4">
              {filteredData.map((modal) => (
                <div
                  key={modal.id_modalservicio}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {modal.nombre}
                      </h3>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ID: #{modal.id_modalservicio}
                      </p>
                    </div>

                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        modal.estado
                          ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400 dark:border dark:border-green-800/50"
                          : "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400 dark:border dark:border-red-800/50"
                      }`}
                    >
                      {modal.estado ? "Activo" : "Inactivo"}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-500 dark:text-gray-400">Correo:</span>
                      <p className="break-all text-gray-700 dark:text-gray-300">
                        {modal.correo}
                      </p>
                    </div>

                    <div>
                      <span className="font-medium text-gray-500 dark:text-gray-400">
                        Servicio:
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        {modal.servicio?.nombre || "Sin servicio"}
                      </p>
                    </div>

                    <div>
                      <span className="font-medium text-gray-500 dark:text-gray-400">
                        Subservicio:
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        {modal.subservicio?.nombre || "—"}
                      </p>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-200 dark:border-gray-800">
                    <button
                      onClick={() => visualizar(modal.id_modalservicio)}
                      className="p-2 bg-amber-50 text-amber-600 rounded-lg dark:bg-amber-950/40 dark:text-amber-400"
                    >
                      <Eye size={18} />
                    </button>

                    <Link
                      href={`/dashboard/modales/mails?id_modal=${modal.id_modalservicio}`}
                      className="p-2 bg-cyan-50 text-cyan-600 rounded-lg dark:bg-cyan-950/40 dark:text-cyan-400"
                    >
                      <Contact size={18} />
                    </Link>

                    <button
                      onClick={() =>
                        confirmarCambiarEstado(
                          modal.id_modalservicio,
                          modal.estado ? 0 : 1,
                        )
                      }
                      className={`p-2 rounded-lg ${
                        modal.estado
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                          : "bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400"
                      }`}
                    >
                      <ToggleLeft size={18} />
                    </button>

                    {auth_service.hasRole("administrador") && (
                      <button
                        onClick={() =>
                          confirmarEliminacion(modal.id_modalservicio)
                        }
                        className="p-2 bg-red-50 text-red-600 rounded-lg dark:bg-red-950/40 dark:text-red-400"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Pagination1
              filteredData={filteredData}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </>
        )}
      </div>
    </main>
  );
}