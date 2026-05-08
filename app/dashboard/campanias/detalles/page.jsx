"use client";

import { useEffect, useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import { campaniaApi } from "@/api/fetchApiWhatsApp";

import { CampaniaEstadoBadge } from "../components/CampaniaEstadoBadge";

import LeadsTable from "../components/LeadsTable";

export default function Page() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const router = useRouter();

  const [campania, setCampania] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchCampania = async () => {
    try {
      const res = await campaniaApi.getById(id);

      setCampania(res.data);
    } catch (err) {
      console.error("Error cargando campaña", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCampania();
    }
  }, [id]);

  if (!id) {
    return <p className="p-6">Falta ID de campaña</p>;
  }

  if (loading) {
    return <p className="p-6">Cargando...</p>;
  }

  if (!campania) {
    return <p className="p-6">No encontrada</p>;
  }

  const porcentaje = Math.min(
    Math.max(campania.porcentaje_progreso || 0, 0),
    100,
  );

  return (
    <main className="p-4 md:p-6 flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      {/* HEADER */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 dark:bg-gray-800 dark:text-white">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => router.push("/dashboard/campanias")}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Volver a campañas
          </button>
        </div>

        <div className="border rounded-xl p-4 space-y-3 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">
              Campaña #{campania.id_campania}
            </h1>

            <CampaniaEstadoBadge estado={campania.estado} />
          </div>

          <p className="text-gray-600">{campania.servicio?.nombre}</p>

          <p className="text-sm text-gray-400">
            {new Date(campania.created_at).toLocaleString("es-PE")}
          </p>

          <div className="flex gap-6 text-sm">
            <span>✅ {campania.envios_exitosos}</span>
            <span>⏳ {campania.envios_pendientes}</span>
            <span>❌ {campania.envios_fallidos}</span>
          </div>

          <div className="w-full bg-gray-200 h-3 rounded">
            <div
              className="bg-green-500 h-3 rounded"
              style={{ width: `${porcentaje}%` }}
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800">
        <LeadsTable campaniaId={id} />
      </div>
    </main>
  );
}
