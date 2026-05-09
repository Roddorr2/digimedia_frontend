"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { campaniaApi } from "@/api/fetchApiWhatsApp";
import { CampaniaEstadoBadge } from "../components/CampaniaEstadoBadge";
import LeadsTable from "../components/LeadsTable";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";

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

  const progressColor =
    porcentaje < 30
      ? "bg-red-500"
      : porcentaje < 70
        ? "bg-yellow-500"
        : "bg-green-500";

  return (
    <main className="flex-1 w-full px-4 py-8 overflow-y-auto">
      {/* HEADER */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 dark:bg-gray-800 dark:text-white">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => router.push("/dashboard/campanias")}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
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

          <div className="flex gap-6 text-sm font-medium">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle2 size={18} />
              <span>{campania.envios_exitosos}</span>
            </div>

            <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
              <Clock3 size={18} />
              <span>{campania.envios_pendientes}</span>
            </div>

            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <XCircle size={18} />
              <span>{campania.envios_fallidos}</span>
            </div>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded">
            <div
              className={`${progressColor} h-3 rounded transition-all duration-300`}
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
