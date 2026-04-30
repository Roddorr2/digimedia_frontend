"use client";

import { useEffect, useState } from "react";
import { campaniaApi } from "@/api/fetchApiWhatsApp";
import CampaniaCard from "./components/CampaniaCard";
import { CampaignProgressMonitor } from "@/app/dashboard/whatsapp/components/CampaignProgressMonitor";

export default function CampaniaListPage() {
  const [campanias, setCampanias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estado, setEstado] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const fetchCampanias = async () => {
    setLoading(true);
    try {
      const res = await campaniaApi.getAll({
        estado,
        page,
      });

      const data = res.data.data;

      setCampanias(data.data);
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        total: data.total,
      });
    } catch (error) {
      console.error("Error cargando campañas", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampanias();
  }, [estado, page]);

  const filtros = [
    { label: "Todos", value: "" },
    { label: "En Proceso", value: "en_proceso" },
    { label: "Pausadas", value: "pausada" },
    { label: "Completadas", value: "completada" },
    { label: "Error", value: "error" },
  ];

  return (
    <main className="p-4 md:p-6 flex flex-col w-full h-[100vh] bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 dark:bg-gray-800 dark:text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Campañas
          </h1>

          {/* FILTROS */}
          <div className="flex flex-wrap gap-2">
            {filtros.map((f) => {
              const active = estado === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => {
                    setEstado(f.value);
                    setPage(1);
                  }}
                  className={`px-4 py-1.5 text-sm rounded-full transition
                  ${
                    active
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* MONITOR */}
        <div className="mb-6">
          <CampaignProgressMonitor />
        </div>

        {/* CONTENIDO */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-gray-300 dark:border-gray-700"></div>
              <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Cargando campañas...
            </p>
          </div>
        ) : campanias.length === 0 ? (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            No hay campañas
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {campanias.map((campania) => (
              <CampaniaCard key={campania.id_campania} campania={campania} />
            ))}
          </div>
        )}

        {/* PAGINACIÓN */}
        {pagination.last_page > 1 && (
          <div className="flex justify-center mt-8 gap-2 flex-wrap">
            {Array.from({ length: pagination.last_page }).map((_, i) => {
              const current = page === i + 1;
              return (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1.5 rounded-md text-sm transition
                  ${
                    current
                      ? "bg-blue-600 text-white shadow"
                      : "bg-white border text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
