'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import url from '../../../api/url';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend,
} from 'recharts';

/* 🎨 Colores */
const CHART_COLORS = ['#6366f1', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b'];

/* 🗓️ Meses */
const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export default function MetricsPage() {
  const now = new Date();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [filterMode, setFilterMode] = useState('monthly'); // monthly | yearly
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  const [cardsByPlantilla, setCardsByPlantilla] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [totalCards, setTotalCards] = useState(0);
  const [blogsByMonth, setBlogsByMonth] = useState(0);
  const [frecuenciaEmpleados, setFrecuenciaEmpleados] = useState([]);
  const [top5Months, setTop5Months] = useState([]);
  const [listBlogsByMonths, setListBlogsByMonths] = useState([]);

  useEffect(() => {
    fetchMetrics();
  }, [month, year, filterMode]);

  const fetchMetrics = async () => {
    try {
      setRefreshing(true);
      const token = getCookie('token');
      const headers = { Authorization: `Bearer ${token}` };

      const params = filterMode === 'monthly' ? { month, year } : { year };

      console.log('🔍 Fetching metrics with params:', params);

      // 📊 Peticiones principales (con filtros de mes/año)
      const [
        resTotal,
        resPlantilla1,
        resPlantilla2,
        resPlantilla3,
        resEmpleados,
        resBlogsMonth,
      ] = await Promise.all([
        axios
          .get(`${url}/api/metrics/count_total_cards`, { headers, params })
          .catch((e) => {
            console.error('❌ Error count_total_cards:', e);
            return { data: null };
          }),
        axios
          .get(`${url}/api/metrics/count_cards_by_plantilla`, {
            headers,
            params: { ...params, id_plantilla: 1 },
          })
          .catch((e) => {
            console.error('❌ Error plantilla 1:', e);
            return { data: null };
          }),
        axios
          .get(`${url}/api/metrics/count_cards_by_plantilla`, {
            headers,
            params: { ...params, id_plantilla: 2 },
          })
          .catch((e) => {
            console.error('❌ Error plantilla 2:', e);
            return { data: null };
          }),
        axios
          .get(`${url}/api/metrics/count_cards_by_plantilla`, {
            headers,
            params: { ...params, id_plantilla: 3 },
          })
          .catch((e) => {
            console.error('❌ Error plantilla 3:', e);
            return { data: null };
          }),
        axios
          .get(`${url}/api/metrics/count_total_cards_by_empleado`, {
            headers,
            params,
          })
          .catch((e) => {
            console.error('❌ Error empleados:', e);
            return { data: null };
          }),
        axios
          .get(`${url}/api/metrics/count_blogs_by_month`, {
            headers,
            params: { month, year },
          })
          .catch((e) => {
            console.error('❌ Error blogs by month:', e);
            return { data: null };
          }),
      ]);

      console.log('✅ API Responses:');
      console.log('Total:', resTotal.data);
      console.log('Plantilla 1:', resPlantilla1.data);
      console.log('Plantilla 2:', resPlantilla2.data);
      console.log('Plantilla 3:', resPlantilla3.data);
      console.log('Empleados:', resEmpleados.data);
      console.log('Blogs Month:', resBlogsMonth.data);

      // 📊 Peticiones sin filtros (datos generales)
      const [resFrecuencia, resTop5Months, resListMonths] = await Promise.all([
        axios
          .get(
            `${url}/api/metrics/frecuencia_publicacion_cards_todos_empleados`,
            {
              headers,
            }
          )
          .catch((e) => {
            console.error('❌ Error frecuencia:', e);
            return { data: null };
          }),
        axios
          .get(`${url}/api/metrics/top5_months_with_more_blogs`, { headers })
          .catch((e) => {
            console.error('❌ Error top5 months:', e);
            return { data: null };
          }),
        axios
          .get(`${url}/api/metrics/list_blogs_by_months_12`, { headers })
          .catch((e) => {
            console.error('❌ Error list months:', e);
            return { data: null };
          }),
      ]);

      console.log('Frecuencia:', resFrecuencia.data);
      console.log('Top 5 Months:', resTop5Months.data);
      console.log('List Months:', resListMonths.data);

      // Procesar plantillas
      const plantillas = [
        {
          name: 'Plantilla 1',
          value: extractValue(resPlantilla1.data),
          id: 1,
        },
        {
          name: 'Plantilla 2',
          value: extractValue(resPlantilla2.data),
          id: 2,
        },
        {
          name: 'Plantilla 3',
          value: extractValue(resPlantilla3.data),
          id: 3,
        },
      ];

      console.log('🎨 Plantillas procesadas:', plantillas);

      const total = extractValue(resTotal.data);
      const empleadosData = extractData(resEmpleados.data);

      console.log('📊 Total cards:', total);
      console.log('👥 Empleados data:', empleadosData);

      setCardsByPlantilla(plantillas);
      setEmpleados(empleadosData);
      setTotalCards(total);
      setBlogsByMonth(extractValue(resBlogsMonth.data));
      setFrecuenciaEmpleados(extractData(resFrecuencia.data));
      setTop5Months(extractData(resTop5Months.data));
      setListBlogsByMonths(extractData(resListMonths.data));
    } catch (e) {
      console.error('❌ Error general en métricas:', e);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const top5Empleados = [...empleados]
    .sort((a, b) => (b.count_cards || 0) - (a.count_cards || 0))
    .slice(0, 5);

  const promedioFrecuencia =
    frecuenciaEmpleados.length > 0
      ? (
          frecuenciaEmpleados.reduce(
            (acc, e) => acc + (e.frecuencia_publicacion_mensual || 0),
            0
          ) / frecuenciaEmpleados.length
        ).toFixed(1)
      : 0;

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <span className="text-xl font-bold animate-pulse text-blue-600">
          Cargando métricas del dashboard…
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-y-auto p-4 lg:p-6 space-y-6 bg-gray-50">
      {/* 🧭 HEADER + FILTROS */}
      <div className="flex flex-col gap-3 border-b pb-4 md:flex-row md:items-center md:justify-between bg-white px-4 py-3 rounded-xl shadow-sm">
        {/* TÍTULO */}
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900">
            Dashboard de Métricas
          </h1>
          <p className="text-xs text-gray-500">
            {filterMode === 'monthly'
              ? `Resumen mensual · ${MONTHS[month - 1]} ${year}`
              : `Resumen anual · ${year}`}
          </p>
        </div>

        {/* FILTROS */}
        <div className="flex flex-wrap items-center gap-2">
          {/* MODO */}
          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value)}
            className="px-3 py-1.5 rounded-lg border bg-white shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="monthly">Mensual</option>
            <option value="yearly">Anual</option>
          </select>

          {/* MES */}
          {filterMode === 'monthly' && (
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="px-3 py-1.5 rounded-lg border bg-white shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
            >
              {MONTHS.map((name, i) => (
                <option key={i} value={i + 1}>
                  {name}
                </option>
              ))}
            </select>
          )}

          {/* AÑO */}
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="px-3 py-1.5 rounded-lg border bg-white shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
          >
            {[2023, 2024, 2025].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {refreshing && (
            <span className="text-xs text-gray-400 animate-pulse">
              Actualizando…
            </span>
          )}
        </div>
      </div>

      {/* 📌 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard title="Total de Cards" value={totalCards} emoji="📄" />
        <SummaryCard
          title="Blogs del Período"
          value={filterMode === 'monthly' ? blogsByMonth : totalCards}
          emoji="📅"
        />
        <SummaryCard
          title="Colaboradores"
          value={empleados.length}
          emoji="👥"
        />
        <SummaryCard
          title="Promedio Frecuencia"
          value={`${promedioFrecuencia} blogs/mes`}
          emoji="📈"
        />
      </div>

      {/* 📊 GRÁFICOS PRINCIPALES */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card title="Cards por Plantilla">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cardsByPlantilla}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Distribución de Cards (%)">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={cardsByPlantilla}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
              >
                {cardsByPlantilla.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v} cards`} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* 👥 PRODUCTIVIDAD */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card title="Productividad por Empleado">
          <div className="max-h-[280px] overflow-y-auto divide-y">
            {empleados.map((e, i) => (
              <div
                key={i}
                className="flex justify-between items-center px-3 py-2 hover:bg-gray-50 text-sm"
              >
                <span className="font-medium">
                  {e.nombre_empleado || `Empleado ${i + 1}`}
                </span>
                <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
                  {e.count_cards || 0} cards
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="🏆 Top 5 Empleados">
          <div className="space-y-2">
            {top5Empleados.map((e, i) => (
              <div
                key={i}
                className="flex justify-between p-3 border rounded-lg text-sm"
              >
                <span className="font-bold text-blue-600">
                  #{i + 1} {e.nombre_empleado || `Empleado ${i + 1}`}
                </span>
                <span className="bg-blue-600 text-white px-2 py-1 rounded-lg text-xs">
                  {e.count_cards || 0} cards
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 📈 FRECUENCIA DE PUBLICACIÓN */}
      <Card title="Frecuencia de Publicación - Todos los Empleados">
        <div className="space-y-2 max-h-[280px] overflow-y-auto">
          {frecuenciaEmpleados.map((emp, idx) => {
            const frecuencia = emp.frecuencia_publicacion_mensual || 0;
            const maxFrecuencia = Math.max(
              ...frecuenciaEmpleados.map(
                (e) => e.frecuencia_publicacion_mensual || 0
              )
            );
            const percentage =
              maxFrecuencia > 0 ? (frecuencia / maxFrecuencia) * 100 : 0;

            return (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-32 text-xs font-medium text-gray-700 truncate">
                  {emp.nombre_empleado ||
                    `Empleado ${emp.id_empleado || idx + 1}`}
                </div>
                <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                  <div
                    className="h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-end pr-2"
                    style={{ width: `${Math.max(percentage, 5)}%` }}
                  >
                    <span className="text-xs font-semibold text-white">
                      {frecuencia}
                    </span>
                  </div>
                </div>
                <div className="w-20 text-right text-xs font-semibold text-gray-700">
                  {frecuencia} blogs/mes
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 🏅 TOP 5 MESES Y BLOGS POR MES */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card title="🏅 Top 5 Meses con Más Blogs">
          <div className="grid grid-cols-5 gap-2">
            {top5Months.slice(0, 5).map((item, idx) => {
              const colors = [
                'from-yellow-400 to-orange-500',
                'from-gray-300 to-gray-400',
                'from-amber-600 to-amber-700',
                'from-blue-400 to-blue-500',
                'from-green-400 to-green-500',
              ];

              return (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${colors[idx]} p-3 rounded-lg text-white shadow hover:scale-105 transition-transform`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg font-bold">#{idx + 1}</span>
                  </div>
                  <p className="text-xs opacity-90 mb-1 truncate">
                    {item.month || item.mes || `Mes ${idx + 1}`}
                  </p>
                  <p className="text-xl font-bold">
                    {item.total_blogs || item.total || 0}
                  </p>
                  <p className="text-xs opacity-75">blogs</p>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Blogs por Mes - Últimos 12 Meses">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={listBlogsByMonths.map((item) => ({
                month: (item.month || item.mes || 'N/A').substring(0, 3),
                total: item.total_blogs || item.total || 0,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="total" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

/* 🔹 COMPONENTES */

function SummaryCard({ title, value, emoji }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs uppercase text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-black">{value}</p>
        </div>
        <div className="text-2xl">{emoji}</div>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border">
      <h2 className="text-base font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

/* 🔹 UTILIDADES */

function extractValue(response) {
  console.log('📊 extractValue received:', response);

  if (!response) return 0;

  // Si la respuesta tiene .data (estructura de axios)
  let data = response.data || response;

  // Si data también tiene .data (tu API devuelve {status: 200, data: {...}})
  if (data && typeof data === 'object' && data.data !== undefined) {
    data = data.data;
  }

  console.log('📊 Data after extraction:', data);

  // Si es un número directo
  if (typeof data === 'number') return data;

  // Si es un string
  if (typeof data === 'string') {
    const num = Number(data);
    return !isNaN(num) ? num : 0;
  }

  // Si es un objeto, buscar en múltiples campos posibles
  if (typeof data === 'object' && data !== null) {
    const value =
      data.total_blogs ||
      data.count_cards ||
      data.total_cards ||
      data.total ||
      data.count ||
      data.value ||
      data.cantidad;

    if (value !== undefined && value !== null) {
      return typeof value === 'number' ? value : Number(value) || 0;
    }

    // Si el objeto tiene una sola propiedad numérica, devolverla
    const keys = Object.keys(data);
    if (keys.length === 1) {
      const singleValue = data[keys[0]];
      if (typeof singleValue === 'number') return singleValue;
      const num = Number(singleValue);
      if (!isNaN(num)) return num;
    }
  }

  return 0;
}

function extractData(response) {
  console.log('📋 extractData received:', response);

  if (!response) return [];

  // Si la respuesta tiene .data (estructura de axios)
  let data = response.data || response;

  // Si data también tiene .data (tu API devuelve {status: 200, data: [...]})
  if (data && typeof data === 'object' && data.data !== undefined) {
    data = data.data;
  }

  console.log('📋 Data after extraction:', data);

  return Array.isArray(data) ? data : [];
}
