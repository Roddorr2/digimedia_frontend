"use client"
import { useEffect, useState } from "react"
import Fetch from "../../../(client)/blog/services/fetch"
import { Clock, Loader2 } from "lucide-react"

export default function HistorialAuditoria() {
    const [auditorias, setAuditorias] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadAuditorias()
    }, [])

    const loadAuditorias = async () => {
        const data = await Fetch.fetchBlogAuditoria()
        setAuditorias(data)
        setLoading(false)
    }

    if (loading)
        return (
            <div className="flex justify-center py-10">
                <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
            </div>
        )

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg mt-6 border border-slate-200/40 dark:border-slate-700/40">

            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-500" />
                Historial de cambios
            </h2>

            {auditorias.length === 0 ? (
                <p className="text-gray-500 text-center py-6">Sin registros de auditoría.</p>
            ) : (
                <div className="rounded-xl border border-slate-200 dark:border-slate-700">

                    <div className="max-h-80 overflow-y-auto overflow-x-auto">
                        <table className="w-full text-sm">

                            <thead className="bg-slate-100 dark:bg-slate-700/60 sticky top-0 z-10">
                                <tr className="text-left text-slate-600 dark:text-slate-300">
                                    <th className="py-3 px-4 font-medium">Acción</th>
                                    <th className="py-3 px-4 font-medium">Empleado</th>
                                    <th className="py-3 px-4 font-medium">Blog</th>
                                    <th className="py-3 px-4 font-medium">Título</th>
                                    <th className="py-3 px-4 font-medium">Fecha y hora</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {auditorias.map((a, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
                                    >
                                        <td className="py-3 px-4 text-sky-600 dark:text-sky-400 font-medium">
                                            {a.accion}
                                        </td>

                                        <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                                            {a.empleado
                                                ? `${a.empleado.nombre} ${a.empleado.apellido}`
                                                : "Desconocido"}
                                        </td>

                                        <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                                            {a.id_blog ?? "Desconocido"}
                                        </td>

                                        <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                                            {a.titulo ?? "Sin título"}
                                        </td>

                                        <td className="py-3 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                            {new Date(a.fecha_hora).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}