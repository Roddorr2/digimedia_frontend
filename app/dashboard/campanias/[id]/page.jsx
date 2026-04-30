"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { campaniaApi } from "@/api/fetchApiWhatsApp";
import CampaniaEstadoBadge from "../components/CampaniaEstadoBadge";
import LeadsTable from "../components/LeadsTable";

export default function page() {
  const { id } = useParams();
  const router = useRouter();

  const [campania, setCampania] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCampania = async () => {
    try {
      const res = await campaniaApi.getById(id);
      setCampania(res.data.data);
    } catch (err) {
      console.error("Error cargando campaña", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchCampania();
  }, [id]);

  if (loading) return <p className="p-6">Cargando...</p>;
  if (!campania) return <p className="p-6">No encontrada</p>;

  const porcentaje = Math.min(Math.max(campania.porcentaje || 0, 0), 100);

  return (
    <div className="p-6 space-y-6">
      {/* VOLVER */}
      <button
        onClick={() => router.push("/dashboard/campanias")}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Volver a campañas
      </button>

      {/* HEADER */}
      <div className="border rounded-xl p-4 space-y-3 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Campaña #{campania.id_campania}</h1>
          <CampaniaEstadoBadge estado={campania.estado} />
        </div>

        <p className="text-gray-600">{campania.servicio}</p>

        <p className="text-sm text-gray-400">
          {new Date(campania.created_at).toLocaleString("es-PE")}
        </p>

        {/* KPIs */}
        <div className="flex gap-6 text-sm">
          <span>✅ {campania.envios_exitosos}</span>
          <span>⏳ {campania.envios_pendientes}</span>
          <span>❌ {campania.envios_fallidos}</span>
        </div>

        {/* PROGRESO */}
        <div className="w-full bg-gray-200 h-3 rounded">
          <div
            className="bg-green-500 h-3 rounded"
            style={{ width: `${porcentaje}%` }}
          />
        </div>
      </div>

      {/* TABLA */}
      <LeadsTable campaniaId={id} />
    </div>
  );
}
