"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CampaignProgressMonitor } from ".././whatsapp/components/CampaignProgressMonitor";
import CampaniaEstadoBadge from "./components/CampaniaEstadoBadge";

export default function page() {
  const router = useRouter();

  const [campanias, setCampanias] = useState([]);
  const [activeCampaign, setActiveCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [filterEstado, setFilterEstado] = useState("todos");

  // 🔄 Fetch
  const fetchCampanias = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/campanias?page=${page}`);
      const json = await res.json();

      const payload = json.data;

      setCampanias(payload.data || []);
      setPage(payload.current_page || 1);
      setLastPage(payload.last_page || 1);
      setActiveCampaign(payload.active_campaign || null);
    } catch (error) {
      console.error("Error cargando campañas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampanias();
  }, [page]);

  // 🎯 Filtros UI
  const filtros = [
    { label: "Todos", value: "todos" },
    { label: "En Proceso", value: "en_proceso" },
    { label: "Pausadas", value: "pausada" },
    { label: "Completadas", value: "completada" },
    { label: "Error", value: "error" },
  ];

  // 🔍 Filtrado
  const campaniasFiltradas = campanias.filter((c) => {
    if (filterEstado === "todos") return true;

    // Manejo especial de pausadas (varios estados)
    if (filterEstado === "pausada") {
      return c.estado?.includes("pausada");
    }

    return c.estado === filterEstado;
  });

  return (
    <main className="p-4 md:p-6 flex flex-col w-full h-[100vh] bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 dark:bg-gray-800 dark:text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Gestión de campañas
          </h1>
          {/* 🎯 Filtros */}
          <div className="flex gap-2 flex-wrap">
            {filtros.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilterEstado(f.value)}
                className={`px-3 py-1 rounded-md text-sm border ${
                  filterEstado === f.value
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 🚀 CAMPAÑA ACTIVA */}
        {activeCampaign && (
          <CampaignProgressMonitor campaign={activeCampaign} />
        )}

        {/* ⏳ LOADING */}
        {loading && (
          <div className="text-center py-10">Cargando campañas...</div>
        )}

        {/* 📭 EMPTY */}
        {!loading && campaniasFiltradas.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No hay campañas disponibles
          </div>
        )}

        {/* 🧱 GRID */}
        {!loading && campaniasFiltradas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {campaniasFiltradas.map((campania) => (
              <div
                key={campania.id_campania}
                className="border rounded-lg p-4 shadow-sm space-y-3"
              >
                {/* HEADER CARD */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">
                    #{campania.id_campania}
                  </span>

                  <CampaniaEstadoBadge estado={campania.estado} />
                </div>

                {/* SERVICIO */}
                <h3 className="font-medium">{campania.servicio}</h3>

                {/* PROGRESO TEXTO */}
                <p className="text-sm text-gray-600">
                  {campania.envios_exitosos} / {campania.total_destinatarios}
                </p>

                {/* BARRA */}
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{
                      width: `${campania.porcentaje || 0}%`,
                    }}
                  />
                </div>

                {/* FECHA */}
                <p className="text-xs text-gray-500">
                  {new Date(campania.created_at).toLocaleDateString()}
                </p>

                {/* BOTÓN */}
                <button
                  onClick={() =>
                    router.push(`/dashboard/campanias/${campania.id_campania}`)
                  }
                  className="w-full mt-2 bg-black text-white py-1.5 rounded-md text-sm"
                >
                  Ver Detalle
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 📄 PAGINACIÓN */}
        {!loading && lastPage > 1 && (
          <div className="flex justify-center gap-2 pt-4 flex-wrap">
            {Array.from({ length: lastPage }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded-md border ${
                  page === i + 1 ? "bg-black text-white" : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
