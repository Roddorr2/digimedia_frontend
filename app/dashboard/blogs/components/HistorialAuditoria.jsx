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
        setAuditorias(Array.isArray(data) ? data : [])
        setLoading(false)
    }

    if (loading)
        return (
            <div className="flex justify-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
            </div>
        )

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md mt-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-sky-500" /> Historial de cambios
            </h2>

            {auditorias.length === 0 ? (
                <p className="text-gray-500 text-center py-10">Sin registros de auditoría.</p>
            ) : (
                <div className="w-full overflow-x-auto max-h-[400px] overflow-y-auto rounded-xl shadow-inner">
                    <table className="table-auto w-full text-sm border-collapse">
                        <thead className="bg-slate-50 dark:bg-slate-700 sticky top-0">
                            <tr className="text-left text-slate-600 dark:text-slate-300">
                                <th className="py-3 px-4 rounded-tl-lg">Acción</th>
                                <th className="py-3 px-4">Empleado</th>
                                <th className="py-3 px-4">Blog</th>
                                <th className="py-3 px-4 rounded-tr-lg">Fecha y hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auditorias.map((a, i) => (
                                <tr
                                    key={i}
                                    className={`border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 ${i % 2 === 0 ? "bg-slate-50 dark:bg-slate-800/50" : ""}`}
                                >
                                    <td className="py-3 px-4 text-sky-600 dark:text-sky-400 font-semibold">{a.accion}</td>
                                    <td className="py-3 px-4">
                                        {a.empleado ? `${a.empleado.nombre} ${a.empleado.apellido}` : "Desconocido"}
                                    </td>
                                    <td className="py-3 px-4">{a.id_blog || "-"}</td>
                                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                                        {a.fecha_hora ? new Date(a.fecha_hora).toLocaleString() : "-"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
