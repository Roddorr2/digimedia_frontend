"use client";

import { useEffect, useState } from "react";
import { Eye, BarChart3 } from "lucide-react";

/* ==========================================================
   PAGE COMPONENT (con scroll corregido)
========================================================== */
export default function Page() {
  const [loading, setLoading] = useState(true);
  const [covid, setCovid] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://api.covidtracking.com/v1/us/daily.json");
        const json = await res.json();
        setCovid(json);
      } catch (e) {
        console.error("Error:", e);
      }
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <p className="p-6">Cargando métricas...</p>;
  if (!covid) return <p className="p-6 text-red-500">Error cargando datos.</p>;

  const last30 = covid.slice(0, 30).reverse();
  const latest = covid[0];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12 overflow-y-auto pb-40">

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Dashboard COVID-19 — Estados Unidos
      </h1>

      {/* ================= KPIs ================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <KPI title="Casos totales" value={latest.positive} icon={<Eye />} />
        <KPI title="Muertes totales" value={latest.death} icon={<BarChart3 />} />
        <KPI title="Casos hoy" value={latest.positiveIncrease} icon={<BarChart3 />} />
        <KPI title="Muertes hoy" value={latest.deathIncrease} icon={<BarChart3 />} />
      </section>

      {/* ================= Gráfico Casos ================= */}
      <Section title="Casos Nuevos (Últimos 30 días)">
        <LineChart
          data={last30.map((d) => ({
            label: d.date,
            value: d.positiveIncrease,
          }))}
          stroke="#2563eb"
        />
      </Section>

      {/* ================= Gráfico Muertes ================= */}
      <Section title="Muertes Nuevas (Últimos 30 días)">
        <LineChart
          data={last30.map((d) => ({
            label: d.date,
            value: d.deathIncrease,
          }))}
          stroke="#e11d48"
        />
      </Section>

      {/* ================= Tabla ================= */}
      <Section title="Últimos 10 días">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-600 dark:text-gray-300">
              <th className="pb-2">Fecha</th>
              <th className="pb-2">Casos Nuevos</th>
              <th className="pb-2">Muertes Nuevas</th>
            </tr>
          </thead>
          <tbody>
            {last30.slice(-10).map((d, i) => (
              <tr
                key={i}
                className="bg-white dark:bg-gray-800 shadow rounded-lg"
              >
                <td className="p-3 rounded-l-lg">{d.date}</td>
                <td className="p-3">{d.positiveIncrease}</td>
                <td className="p-3 rounded-r-lg">{d.deathIncrease}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}

/* ==========================================================
   COMPONENTES UI MEJORADOS
========================================================== */

function KPI({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center gap-5">
      <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
        {icon}
      </div>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          {value?.toLocaleString()}
        </h3>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
        {title}
      </h2>
      {children}
    </div>
  );
}

/* ==========================================================
   GRÁFICO SVG
========================================================== */
function LineChart({ data, stroke = "#2563eb", height = 260 }) {
  const max = Math.max(...data.map((d) => d.value)) || 1;

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (d.value / max) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className="w-full" style={{ height }}>
      {/* Grid */}
      {[20, 40, 60, 80].map((g, i) => (
        <line
          key={i}
          x1="0"
          x2="100"
          y1={g}
          y2={g}
          stroke="#e5e7eb"
          strokeWidth="0.4"
        />
      ))}

      {/* Línea */}
      <polyline fill="none" stroke={stroke} strokeWidth="2" points={points} />

      {/* Puntos */}
      {points.split(" ").map((p, i) => {
        const [x, y] = p.split(",");
        return <circle key={i} cx={x} cy={y} r="1.5" fill={stroke} />;
      })}
    </svg>
  );
}
