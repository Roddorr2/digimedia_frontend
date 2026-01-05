"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { getCookie, deleteCookie } from "cookies-next";
import { Clock, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

import url from "@/api/url";
import user_service from "../../users/services/user.service";

const API_BASE_URL = `${url}/api/blogs_auditoria`;

export default function HistorialAuditoria() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const [auditorias, setAuditorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const pagesToShow = useMemo(() => {
    const windowSize = 5;
    const half = Math.floor(windowSize / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [currentPage, totalPages]);

  const goToPage = (p) => {
    const safe = Math.max(1, Math.min(totalPages, p));
    router.push(`?page=${safe}`);
  };

  async function fetchAuditorias(page) {
    try {
      setIsLoading(true);

      const response = await axios.get(`${API_BASE_URL}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json",
        },
      });

      const paginator = response.data?.data;

      setAuditorias(paginator?.data ?? []);
      setTotalPages(paginator?.last_page ?? 1);
      setTotalItems(paginator?.total ?? 0);
    } catch (error) {
      console.error("Error al obtener auditorías:", error?.message);

      if (error.response?.status === 401) {
        Swal.fire({
          title: "Sesión Expirada",
          text: "Por favor, inicia sesión nuevamente.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then(() => {
          deleteCookie("token");
          user_service.logoutClient(router);
        });
        return;
      }

      if (error.response?.status === 404) {
        setAuditorias([]);
        setTotalPages(1);
        setTotalItems(0);
        return;
      }

      Swal.fire({
        title: "Error",
        text: "No se pudo cargar el historial de auditoría.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAuditorias(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const getActionBadge = (accion) => {
    switch (accion?.toUpperCase()) {
      case "ELIMINAR":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
      case "CREAR":
        return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800";
      case "ACTUALIZAR":
        return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg  border border-slate-200/40 dark:border-slate-700/40">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-sky-500" />
        Historial de cambios
      </h2>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
        </div>
      ) : auditorias.length === 0 ? (
        <p className="text-gray-500 text-center py-6">Sin registros de auditoría.</p>
      ) : (
        <>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="max-h-72 overflow-y-auto overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 dark:bg-slate-700/60 sticky top-0 z-10">
                  <tr className="text-left text-slate-600 dark:text-slate-300">
                    <th className="py-3 px-4 font-medium">Acción</th>
                    <th className="py-3 px-4 font-medium">Empleado</th>
                    <th className="py-3 px-4 font-medium">Blog</th>
                    <th className="py-3 px-4 font-medium">Título</th>
                    <th className="py-3 px-4 font-medium">Fecha y hora</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {auditorias.map((a, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getActionBadge(a.accion)}`}>
                          {a.accion}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                        {a.empleado ? `${a.empleado.nombre} ${a.empleado.apellido}` : "Desconocido"}
                      </td>

                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-mono">
                        #{a.id_blog ?? "---"}
                      </td>

                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                        {a.titulo ?? "Sin título"}
                      </td>

                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {new Date(a.fecha_hora).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Paginación (como tu estilo) */}
          <div className="mt-5 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-9 w-9 rounded-md border border-slate-200 dark:border-slate-700 flex items-center justify-center
                           text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed
                           hover:bg-slate-50 dark:hover:bg-slate-700/40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {pagesToShow.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => goToPage(p)}
                  className={
                    p === currentPage
                      ? "h-9 w-9 rounded-md bg-purple-600 text-white font-semibold shadow"
                      : "h-9 w-9 rounded-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/40"
                  }
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-9 w-9 rounded-md border border-slate-200 dark:border-slate-700 flex items-center justify-center
                           text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed
                           hover:bg-slate-50 dark:hover:bg-slate-700/40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Mostrando {auditorias.length} de {totalItems} auditorías
            </p>
          </div>
        </>
      )}
    </div>
  );
}
