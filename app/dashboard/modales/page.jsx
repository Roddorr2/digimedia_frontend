'use client';

import { useEffect, useMemo, useState } from 'react';
import Pagination1 from '../components/Pagination1';
import { useRouter, useSearchParams } from 'next/navigation';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import user_service from '../users/services/user.service';
import url from '../../../api/url';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Search, Eye, ToggleLeft, Trash2, Loader2, Filter, Download, RefreshCw, Contact } from "lucide-react";
import auth_service from "../users/services/auth.service";
import Link from "next/link";

const API_BASE_URL = `${url}/api/modales`;

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = useMemo(() => {
    const p = Number(searchParams.get("page") || 1);
    return Number.isFinite(p) && p > 0 ? p : 1;
  }, [searchParams]);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  function handle401() {
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

  async function fetchModals(pageParam = currentPage) {
    const page = Number(pageParam) || 1;

    setIsLoading(true);
    setIsRefreshing(true);

    try {
      const response = await axios.get(`${API_BASE_URL}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      const paginator = response.data;

      const items = paginator?.data ?? [];
      setData(items);
      setFilteredData(items);
      setTotalPages(Number(paginator?.last_page) || 1);

    } catch (error) {
      console.error("Error al obtener los datos:", error?.message);
      if (error?.response?.status === 401) handle401();
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

        fetchModals(currentPage);
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el modal.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      if (error?.response?.status === 401) handle401();
      else {
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
      if (result.isConfirmed) deleteModal(id);
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
      if (result.isConfirmed) cambiarEstado(id, nuevoEstado);
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
          text: `El estado del modal se cambió a ${nuevoEstado == 0 ? "Inactivo" : "Activo"}`,
          icon: "success",
          confirmButtonText: "OK",
        });

        fetchModals(currentPage);
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo cambiar el estado del modal.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      if (error?.response?.status === 401) handle401();
      else {
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
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      });

      if (response.status === 200 && response.data) {
        setCookie("modal", JSON.stringify(response.data.data), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        }); 
        router.push(`./view/`);
      }
    } catch (error) {
      if (error?.response?.status === 401) handle401();
      else if (error?.response?.status === 404) {
        Swal.fire({ title: "No Encontrado", text: "El modal no existe en la base de datos.", icon: "warning" });
      } else {
        Swal.fire({ title: "Error", text: "Ocurrió un error al obtener los datos.", icon: "error" });
      }
    }
  }

  useEffect(() => {
    fetchModals(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (modal) =>
          modal.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          modal.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          modal.id_modalservicio.toString().includes(searchTerm),
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  const exportToCSV = () => {
    if (filteredData.length === 0) {
      Swal.fire({ title: "Sin datos", text: "No hay datos para exportar", icon: "info" });
      return;
    }

    const headers = ["ID", "Nombre", "Correo", "Estado", "Servicio Contratado"];

    const csvData = filteredData.map((modal) => [
      modal.id_modalservicio,
      modal.nombre,
      modal.correo,
      modal.estado ? "Activo" : "Inactivo",
      modal.servicio?.nombre ?? "",
    ]);

    const csvContent = [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", blobUrl);
    link.setAttribute("download", "modales.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="p-4 md:p-6 flex flex-col w-full h-[100vh] bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 dark:bg-gray-800 dark:text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Gestión de Modales</h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, correo o ID..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent"
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
                onClick={() => fetchModals(currentPage)}  // ✅ número, no objeto
                disabled={isRefreshing}
                className={`flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors ${isRefreshing ? "opacity-70 cursor-not-allowed" : ""}`}
                title="Actualizar datos"
              >
                {isRefreshing ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}
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
            <div className="overflow-x-auto rounded-lg border border-gray-100">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombres</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefono</th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio de Contrato</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900">
                  {filteredData.length > 0 ? (
                    filteredData.map((modal) => (
                      <tr key={`${modal.id_modalservicio}-Row`} className="hover:bg-gray-50 transition-colors dark:hover:bg-gray-800 dark:text-white">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {modal.id_modalservicio}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-white">{modal.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-white">{modal.telefono}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-white">{modal.correo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-white">{modal.servicio?.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${modal.estado ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {modal.estado ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => visualizar(modal.id_modalservicio)}
                              title="Visualizar"
                              className="p-1.5 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors"
                            >
                              <Eye size={18} />
                            </button>

                            <button title="Emails y WhatsApp" className="p-1.5 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors">
                              <Link href={`/dashboard/modales/mails?id_modal=${modal.id_modalservicio}`}>
                                <Contact size={17} />
                              </Link>
                            </button>

                            <button
                              onClick={() => confirmarCambiarEstado(modal.id_modalservicio, `${modal.estado ? 0 : 1}`)}
                              title={`Cambiar a ${modal.estado ? "Inactivo" : "Activo"}`}
                              className={`p-1.5 rounded-lg transition-colors ${modal.estado ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : "bg-green-50 text-green-600 hover:bg-green-100"}`}
                            >
                              <ToggleLeft size={18} />
                            </button>

                            {auth_service.hasRole("administrador") && (
                              <button
                                onClick={() => confirmarEliminacion(modal.id_modalservicio)}
                                title="Eliminar"
                                className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
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
                          <Filter className="h-12 w-12 text-gray-300 mb-3" />
                          <p className="text-gray-500 font-medium mb-1">No hay datos disponibles</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
