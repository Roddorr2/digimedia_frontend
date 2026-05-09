"use client";

import { useEffect, useState } from "react";
import { campaniaApi } from "@/api/fetchApiWhatsApp";

export default function LeadsTable({ campaniaId }) {
  const [retryingId, setRetryingId] = useState(null);

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const [estado, setEstado] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  const fetchLeads = async (
    currentEstado = estado,
    currentSearch = search,
    currentPage = page,
  ) => {
    setLoading(true);

    try {
      const res = await campaniaApi.getLeads(campaniaId, {
        estado: currentEstado,
        search: currentSearch,
        page: currentPage,
      });

      const payload = res?.data ?? {};

      setLeads(Array.isArray(payload.data) ? payload.data : []);

      setPagination({
        current_page: payload.current_page || 1,
        last_page: payload.last_page || 1,
        total: payload.total || 0,
      });
      console.log("res.data:", res?.data);
      console.log("payload:", res?.data?.data);
    } catch (err) {
      console.error("Error cargando leads", err);

      setLeads([]);

      setPagination({
        current_page: 1,
        last_page: 1,
        total: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async (watModalId) => {
    if (!watModalId) return;

    try {
      setRetryingId(watModalId);

      await campaniaApi.retryLead(campaniaId, watModalId);

      // refrescar tabla
      await fetchLeads();
    } catch (err) {
      console.error("Error reintentando lead", err);
    } finally {
      setRetryingId(null);
    }
  };

  useEffect(() => {
    if (!campaniaId) return;

    const timer = setTimeout(() => {
      fetchLeads();
    }, 300);

    return () => clearTimeout(timer);
  }, [estado, search, page, campaniaId]);

  const renderEstado = (estado) => {
    switch (estado) {
      case "enviado":
        return "🟢 Enviado";

      case "fallido":
        return "🔴 Fallido";

      case "pendiente":
        return "🟡 Pendiente";

      default:
        return "⚪ Desconocido";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";

    const datePart = dateString.split("T")[0];

    const [year, month, day] = datePart.split("-");

    const date = new Date(Number(year), Number(month) - 1, Number(day));

    return new Intl.DateTimeFormat("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };
  return (
    <div className="space-y-4">
      {/* FILTROS */}
      <div className="flex flex-wrap items-center gap-3">
        {[
          { label: "Todos", value: "" },
          { label: "Enviados", value: "enviado" },
          { label: "Pendientes", value: "pendiente" },
          { label: "Fallidos", value: "fallido" },
        ].map((filtro) => (
          <button
            key={filtro.value}
            onClick={() => {
              setEstado(filtro.value);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              estado === filtro.value
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            }`}
          >
            {filtro.label}
          </button>
        ))}

        {/* BUSCADOR */}
        <div className="ml-auto relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Buscar nombre o teléfono..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-4 py-2 pl-10 text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* TABLA */}
      {loading ? (
        <div className="border rounded-lg p-6 text-center text-gray-500">
          Cargando leads...
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm text-gray-800 dark:text-gray-200">
            <thead className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-100 text-left shadow-sm">
              <tr>
                <th className="p-3 font-semibold">Nombre</th>
                <th className="p-3 font-semibold">Teléfono</th>
                <th className="p-3 font-semibold">Estado</th>
                <th className="p-3 font-semibold">Intentos</th>
                <th className="p-3 font-semibold">Fecha</th>
                <th className="p-3 font-semibold">Acciones</th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-900">
              {leads.map((lead) => (
                <tr
                  key={
                    lead.id_modal_wat ?? `pendiente-${lead.id_modalservicio}`
                  }
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="p-3 text-left">{lead.nombre || "-"}</td>

                  <td className="p-3 text-left">{lead.telefono || "-"}</td>

                  <td className="p-3 text-left">{renderEstado(lead.estado)}</td>

                  <td className="p-3 text-left">{lead.intentos || 0}/3</td>

                  <td className="p-3 text-left">{formatDate(lead.fecha)}</td>

                  <td className="p-3 text-left">
                    {lead.estado === "fallido" && lead.id_modal_wat && (
                      <button
                        onClick={() => handleRetry(lead.id_modal_wat)}
                        disabled={retryingId === lead.id_modal_wat}
                        className="px-2 py-1 text-xs rounded bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50 shadow-sm"
                      >
                        {retryingId === lead.id_modal_wat
                          ? "Reintentando..."
                          : "Reintentar"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* EMPTY */}
      {!loading && leads.length === 0 && (
        <div className="border rounded-lg p-6 text-center text-gray-500">
          No hay leads
        </div>
      )}

      {/* PAGINACIÓN */}
      {pagination.last_page > 1 && (
        <div className="flex flex-wrap gap-2">
          {Array.from({
            length: pagination.last_page,
          }).map((_, i) => {
            const pageNumber = i + 1;

            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`px-3 py-1 border rounded text-sm ${
                  page === pageNumber
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
