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

  const [pagination, setPagination] = useState({});

  const fetchLeads = async (estado, search, page) => {
    setLoading(true);

    try {
      const res = await campaniaApi.getLeads(campaniaId, {
        estado,
        search,
        page,
      });

      const data = res?.data ?? res ?? {};
      const leadsArray = data?.data?.data ?? data?.data ?? [];

      setLeads(Array.isArray(leadsArray) ? leadsArray : []);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async (watModalId) => {
    try {
      setRetryingId(watModalId);

      await campaniaApi.retryLead(campaniaId, watModalId);

      // refrescar tabla
      fetchLeads(estado, search, page);
    } catch (err) {
      console.error("Error reintentando lead", err);
    } finally {
      setRetryingId(null);
    }
  };

  useEffect(() => {
    if (!campaniaId) return;

    const timer = setTimeout(() => {
      fetchLeads(estado, search, page);
    }, 300);

    return () => clearTimeout(timer);
  }, [estado, search, page, campaniaId]);

  return (
    <div className="space-y-4">
      {/* FILTROS */}
      <div className="flex flex-wrap gap-2 items-center">
        {[
          { label: "Todos", value: "" },
          { label: "Enviados", value: "enviado" },
          { label: "Pendientes", value: "pendiente" },
          { label: "Fallidos", value: "fallido" },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => {
              setEstado(f.value);
              setPage(1);
            }}
            className={`px-3 py-1 rounded ${
              estado === f.value ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}

        {/* BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar nombre o teléfono..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-1 rounded ml-auto"
        />
      </div>

      {/* TABLA */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="overflow-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Nombre</th>
                <th className="p-2">Teléfono</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Intentos</th>
                <th className="p-2">Fecha</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {(Array.isArray(leads) ? leads : []).map((lead) => (
                <tr key={lead.id_modal_wat} className="border-t">
                  <td className="p-2">{lead.nombre}</td>

                  <td className="p-2">{lead.telefono}</td>

                  <td className="p-2">
                    {lead.estado === "enviado" && "🟢 Enviado"}
                    {lead.estado === "fallido" && "🔴 Fallido"}
                    {lead.estado === "pendiente" && "🟡 Pendiente"}
                  </td>

                  <td className="p-2">{lead.intentos}/3</td>

                  <td className="p-2">
                    {new Date(lead.fecha).toLocaleString("es-PE")}
                  </td>
                  <td className="p-2">
                    {lead.estado === "fallido" && (
                      <button
                        onClick={() => handleRetry(lead.id_modal_wat)}
                        disabled={retryingId === lead.id_modal_wat}
                        className="px-2 py-1 text-xs rounded bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50"
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
      {!loading && leads.length === 0 && (
        <p className="text-gray-500">No hay leads</p>
      )}

      {/* PAGINACIÓN */}
      <div className="flex gap-2">
        {Array.from({ length: pagination.last_page || 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border ${
              page === i + 1 ? "bg-blue-600 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
