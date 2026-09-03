"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import url from "../../../api/url";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid, Legend,
} from "recharts";
import { RefreshCw, FileText, Calendar, Users, TrendingUp } from "lucide-react";

const COLORS = ["#6366f1", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b"];
const MONTHS = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
];
const SELECT_CLS =
  "px-3 py-1.5 rounded-lg border bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

// ─── helpers ────────────────────────────────────────────────────────────────
function extractValue(response) {
  if (!response) return 0;
  let d = response.data ?? response;
  if (d?.data !== undefined) d = d.data;
  if (typeof d === "number") return d;
  if (typeof d === "string") return Number(d) || 0;
  if (d && typeof d === "object") {
    const v = d.total_blogs ?? d.count_cards ?? d.total_cards ?? d.total ?? d.count ?? d.value ?? d.cantidad;
    if (v !== undefined) return typeof v === "number" ? v : Number(v) || 0;
    const keys = Object.keys(d);
    if (keys.length === 1) return Number(d[keys[0]]) || 0;
  }
  return 0;
}

function extractData(response) {
  if (!response) return [];
  let d = response.data ?? response;
  if (d?.data !== undefined) d = d.data;
  return Array.isArray(d) ? d : [];
}

// ─── sub-components ──────────────────────────────────────────────────────────
function Centered({ children }) {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  );
}

function SummaryCard({ title, value, subtitle, icon: Icon, color }) {
  const palette = {
    indigo:  "bg-indigo-50  text-indigo-600  dark:bg-indigo-900/30  dark:text-indigo-400",
    cyan:    "bg-cyan-50    text-cyan-600    dark:bg-cyan-900/30    dark:text-cyan-400",
    purple:  "bg-purple-50  text-purple-600  dark:bg-purple-900/30  dark:text-purple-400",
    amber:   "bg-amber-50   text-amber-600   dark:bg-amber-900/30   dark:text-amber-400",
  };
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl shadow-sm border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className={`p-3 rounded-xl shrink-0 ${palette[color] ?? palette.indigo}`}>
        <Icon size={22} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-0.5 break-words">{title}</p>
        <p className="text-2xl font-black text-gray-900 dark:text-white leading-none truncate">{value}</p>
        {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function Section({ title, badge, children }) {
  const badgeCls = badge === "Período"
    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
    : "bg-amber-100  text-amber-700  dark:bg-amber-900/40  dark:text-amber-300";
  return (
    <div className="p-5 rounded-xl shadow-sm border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">{title}</h2>
        {badge && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeCls}`}>{badge}</span>
        )}
      </div>
      {children}
    </div>
  );
}

function EmptyState({ text = "Sin datos para este período" }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-300 dark:text-gray-600">
      <TrendingUp size={34} className="mb-2 opacity-50" />
      <p className="text-sm">{text}</p>
    </div>
  );
}

function HBar({ label, value, max, color }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="w-28 text-xs font-medium text-gray-700 dark:text-gray-300 truncate shrink-0">{label}</div>
      <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-5 overflow-hidden">
        <div
          className="h-5 rounded-full flex items-center justify-end pr-2 transition-all duration-500"
          style={{ width: `${Math.max(pct, value > 0 ? 6 : 0)}%`, backgroundColor: color }}
        >
          {value > 0 && <span className="text-[11px] font-bold text-white">{value}</span>}
        </div>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 w-14 text-right shrink-0">{value}</span>
    </div>
  );
}

// ─── main ───────────────────────────────────────────────────────────────────
export default function MetricsPage() {
  const now = new Date();
  const { user, hasRole, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error,      setError]      = useState(null);

  const [filterMode, setFilterMode] = useState("monthly");
  const [month,      setMonth]      = useState(now.getMonth() + 1);
  const [year,       setYear]       = useState(now.getFullYear());

  // período
  const [cardsByPlantilla, setCardsByPlantilla] = useState([]);
  const [empleados,        setEmpleados]        = useState([]);
  const [totalCards,       setTotalCards]       = useState(0);
  const [blogsByPeriod,    setBlogsByPeriod]    = useState(0);

  // histórico
  const [frecuenciaEmpleados, setFrecuenciaEmpleados] = useState([]);
  const [top5Months,          setTop5Months]          = useState([]);
  const [listBlogsByMonths,   setListBlogsByMonths]   = useState([]);

  useEffect(() => {
    if (!authLoading && user && !hasRole("administrador, marketing")) {
      router.push("/dashboard/main");
    }
  }, [user, authLoading, hasRole, router]);

  const fetchMetrics = useCallback(async () => {
    try {
      setRefreshing(true);
      setError(null);
      const token   = getCookie("token");
      const headers = { Authorization: `Bearer ${token}` };
      const params  = filterMode === "monthly" ? { month, year } : { year };

      const [p1, p2, p3, empRes, blogsRes] = await Promise.all([
        axios.get(`${url}/api/metrics/count_cards_by_plantilla`, { headers, params: { ...params, id_plantilla: 1 } }).catch(() => ({ data: null })),
        axios.get(`${url}/api/metrics/count_cards_by_plantilla`, { headers, params: { ...params, id_plantilla: 2 } }).catch(() => ({ data: null })),
        axios.get(`${url}/api/metrics/count_cards_by_plantilla`, { headers, params: { ...params, id_plantilla: 3 } }).catch(() => ({ data: null })),
        axios.get(`${url}/api/metrics/count_total_cards_by_empleado`, { headers, params }).catch(() => ({ data: null })),
        axios.get(`${url}/api/metrics/count_blogs_by_month`, { headers, params }).catch(() => ({ data: null })),
      ]);

      const [frecRes, top5Res, listRes] = await Promise.all([
        axios.get(`${url}/api/metrics/frecuencia_publicacion_cards_todos_empleados`, { headers }).catch(() => ({ data: null })),
        axios.get(`${url}/api/metrics/top5_months_with_more_blogs`, { headers }).catch(() => ({ data: null })),
        axios.get(`${url}/api/metrics/list_blogs_by_months_12`, { headers }).catch(() => ({ data: null })),
      ]);

      const plantillas = [
        { name: "Plantilla 1", value: extractValue(p1.data) },
        { name: "Plantilla 2", value: extractValue(p2.data) },
        { name: "Plantilla 3", value: extractValue(p3.data) },
      ];

      setCardsByPlantilla(plantillas);
      setTotalCards(plantillas.reduce((s, p) => s + p.value, 0));
      setEmpleados(extractData(empRes.data));
      setBlogsByPeriod(extractValue(blogsRes.data));
      setFrecuenciaEmpleados(extractData(frecRes.data));
      setTop5Months(extractData(top5Res.data));
      setListBlogsByMonths(extractData(listRes.data));
    } catch (e) {
      if (e.response?.status === 403) setError("No tienes permisos para ver esta sección.");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, [month, year, filterMode]);

  useEffect(() => { fetchMetrics(); }, [fetchMetrics]);

  // ── guards ──
  if (authLoading) return <Centered><span className="animate-pulse text-indigo-600 font-semibold">Cargando...</span></Centered>;
  if (!user || !hasRole("administrador, marketing")) return <Centered>Redirigiendo...</Centered>;
  if (error) return (
    <Centered>
      <div className="text-center space-y-3">
        <p className="text-red-600 font-semibold">{error}</p>
        <button onClick={() => router.push("/dashboard/main")} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700">
          Volver al Dashboard
        </button>
      </div>
    </Centered>
  );
  if (loading) return (
    <Centered>
      <span className="text-xl font-black text-indigo-600 animate-pulse">Cargando métricas…</span>
    </Centered>
  );

  // ── derivados ──
  const periodLabel = filterMode === "monthly" ? `${MONTHS[month - 1]} ${year}` : `Año ${year}`;

  const sortedEmpleados   = [...empleados].sort((a, b) => (b.count_cards || 0) - (a.count_cards || 0));
  const top5Empleados     = sortedEmpleados.slice(0, 5);
  const activeCount       = empleados.filter(e => (e.count_cards || 0) > 0).length;
  const maxCards          = Math.max(...empleados.map(e => e.count_cards || 0), 1);

  const sortedFrecuencia  = [...frecuenciaEmpleados].sort((a, b) => (b.frecuencia_publicacion_mensual || 0) - (a.frecuencia_publicacion_mensual || 0));
  const maxFrecuencia     = Math.max(...frecuenciaEmpleados.map(e => e.frecuencia_publicacion_mensual || 0), 1);
  // Promedio histórico (para la sección de frecuencia)
  const promedioFrecuencia = frecuenciaEmpleados.length > 0
    ? (frecuenciaEmpleados.reduce((s, e) => s + (e.frecuencia_publicacion_mensual || 0), 0) / frecuenciaEmpleados.length).toFixed(1)
    : "0";
  // Promedio del período (para la tarjeta de resumen — consistente con el filtro)
  const promedioPeriodo = activeCount > 0
    ? (totalCards / activeCount).toFixed(1)
    : totalCards > 0 ? totalCards.toFixed(1) : "0";

  const MEDALS = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];
  const PODIUM_COLORS = [
    "from-yellow-400 to-orange-500",
    "from-slate-400 to-slate-500",
    "from-amber-600 to-amber-700",
    "from-blue-400 to-blue-500",
    "from-emerald-400 to-emerald-500",
  ];

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 lg:p-6 pb-16 space-y-5">

      {/* ── Header ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">Dashboard de Métricas</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Período seleccionado: <strong className="text-indigo-600 dark:text-indigo-400">{periodLabel}</strong>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select value={filterMode} onChange={e => setFilterMode(e.target.value)} className={SELECT_CLS}>
            <option value="monthly">Mensual</option>
            <option value="yearly">Anual</option>
          </select>
          {filterMode === "monthly" && (
            <select value={month} onChange={e => setMonth(Number(e.target.value))} className={SELECT_CLS}>
              {MONTHS.map((n, i) => <option key={i} value={i + 1}>{n}</option>)}
            </select>
          )}
          <select value={year} onChange={e => setYear(Number(e.target.value))} className={SELECT_CLS}>
            {[2023, 2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <button
            onClick={fetchMetrics}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Actualizando…" : "Actualizar"}
          </button>
        </div>
      </div>

      {/* ── Tarjetas de resumen ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard title="Total de Cards"      value={totalCards}                           subtitle={`En ${periodLabel}`}              icon={FileText} color="indigo" />
        <SummaryCard title="Blogs creados"       value={blogsByPeriod}                        subtitle={`En ${periodLabel}`}              icon={Calendar} color="cyan"   />
        <SummaryCard title="Colaboradores activos" value={`${activeCount} / ${empleados.length}`} subtitle="Con cards en el período"     icon={Users}    color="purple" />
        <SummaryCard
          title="Promedio cards/empleado"
          value={activeCount > 0 ? `${promedioPeriodo} cards` : "—"}
          subtitle={activeCount > 0 ? `Entre ${activeCount} colaborador${activeCount !== 1 ? "es" : ""} activo${activeCount !== 1 ? "s" : ""}` : "Sin actividad en el período"}
          icon={TrendingUp}
          color="amber"
        />
      </div>

      {/* ── Cards por Plantilla ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Section title="Cards por Plantilla" badge="Período">
          {totalCards === 0 ? <EmptyState /> : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={cardsByPlantilla} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip formatter={v => [`${v} cards`, "Total"]} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {cardsByPlantilla.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </Section>

        <Section title="Distribución de Cards (%)" badge="Período">
          {totalCards === 0 ? <EmptyState /> : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={cardsByPlantilla.filter(p => p.value > 0)}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {cardsByPlantilla.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={v => [`${v} cards`]} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Section>
      </div>

      {/* ── Productividad ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Section title="Productividad por Empleado" badge="Período">
          {empleados.length === 0 ? <EmptyState /> : (
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {sortedEmpleados.map((e, i) => (
                <HBar
                  key={i}
                  label={e.nombre_empleado || `Emp. ${i + 1}`}
                  value={e.count_cards || 0}
                  max={maxCards}
                  color={COLORS[i % COLORS.length]}
                />
              ))}
            </div>
          )}
        </Section>

        <Section title="🏆 Top 5 Empleados" badge="Período">
          {top5Empleados.length === 0 ? <EmptyState /> : (
            <div className="space-y-3">
              {top5Empleados.map((e, i) => {
                const count = e.count_cards || 0;
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-lg border text-sm transition-colors ${
                      count > 0
                        ? "border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/20"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <span className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                      {MEDALS[i]} {e.nombre_empleado || `Empleado ${i + 1}`}
                    </span>
                    <span className={`ml-2 px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 ${
                      count > 0 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                    }`}>
                      {count} card{count !== 1 ? "s" : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </Section>
      </div>

      {/* ── Frecuencia histórica ── */}
      <Section title="Frecuencia de Publicación por Empleado" badge="Histórico">
        <p className="text-xs text-gray-500 dark:text-gray-400 -mt-2 mb-3">
          Promedio mensual calculado sobre toda la trayectoria del empleado (no filtrado por período).
          Promedio del equipo: <strong>{promedioFrecuencia} cards/mes</strong>.
        </p>
        {frecuenciaEmpleados.length === 0 ? <EmptyState /> : (
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {sortedFrecuencia.map((emp, idx) => (
              <HBar
                key={idx}
                label={emp.nombre_empleado || `Emp. ${idx + 1}`}
                value={emp.frecuencia_publicacion_mensual || 0}
                max={maxFrecuencia}
                color="#8b5cf6"
              />
            ))}
          </div>
        )}
      </Section>

      {/* ── Histórico ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Section title="🏅 Top 5 Meses con Más Blogs" badge="Histórico">
          {top5Months.length === 0 ? <EmptyState text="Sin datos históricos" /> : (
            <div className="grid grid-cols-5 gap-2">
              {top5Months.slice(0, 5).map((item, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${PODIUM_COLORS[idx]} p-3 rounded-xl text-white text-center shadow hover:scale-105 transition-transform`}
                >
                  <div className="text-lg font-bold mb-1">#{idx + 1}</div>
                  <p className="text-[10px] opacity-90 mb-1 leading-tight break-words">
                    {item.month || item.mes || `Mes ${idx + 1}`}
                  </p>
                  <p className="text-xl font-black">{item.total_blogs || item.total || 0}</p>
                  <p className="text-[10px] opacity-75">blogs</p>
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section title="Blogs por Mes — Últimos 12 Meses" badge="Histórico">
          {listBlogsByMonths.length === 0 ? <EmptyState text="Sin datos históricos" /> : (
            <ResponsiveContainer width="100%" height={210}>
              <BarChart
                data={listBlogsByMonths.map(item => ({
                  month: (item.month || item.mes || "").substring(0, 3),
                  total: item.total_blogs || item.total || 0,
                }))}
                margin={{ top: 4, right: 8, bottom: 0, left: -20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                <Tooltip formatter={v => [`${v} blogs`, "Total"]} />
                <Bar dataKey="total" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Section>
      </div>
    </div>
  );
}
