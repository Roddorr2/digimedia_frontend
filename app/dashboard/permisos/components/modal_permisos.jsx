"use client"

import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { XMarkIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { cn } from "@/lib/utils"


import permiso_service from "../services/permiso_service" 

export default function ModalPermisos({ isVisible, onClose, onRefresh }) {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: ""
    })

    const [error, setError] = useState({
        status: undefined,
        message: "",
    })

    if (!isVisible) return null

    function handleChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }))
    }

    function handleClose() {
        setError({ status: undefined, message: "" })
       
        setFormData({ nombre: "", descripcion: "" }) 
        if (typeof onClose === "function") onClose()
    }

    
    async function handleSubmit(e) {
        e.preventDefault()
        
        if (!formData.nombre.trim()) {
            setError({ status: true, message: "El nombre del permiso es obligatorio." })
            return
        }

        try {
            setIsLoading(true)
            setError({ status: undefined, message: "" })
            const res = await permiso_service.postPermisos(formData)

            if (res && res.success !== false) {
                toast({
                    title: "¡Éxito!",
                    description: "Permiso creado correctamente.",
                    variant: "default"
                })
                if (typeof onRefresh === "function") onRefresh()
                handleClose() 
            } else {
                setError({
                    status: true,
                    message: res.message || "Ocurrió un error al intentar guardar."
                })
            }
        } catch (err) {
            setError({
                status: true,
                message: err.message || "Error de conexión con el servidor."
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
            <div className={cn(
                "w-full max-w-2xl", 
                "bg-white dark:bg-gray-900",
                "rounded-2xl shadow-2xl",
                "overflow-hidden",
                "animate-in fade-in zoom-in-95"
            )}>
               
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                    <div>
                        <h2 className="text-2xl font-bold">Crear Permiso</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Completa la información necesaria para registrar un nuevo permiso en el sistema.
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        <XMarkIcon className="h-6 w-6 text-gray-500" />
                    </button>
                </div>

                
                {error.status !== undefined && (
                    <div className={cn(
                        "mx-6 mt-4 border-l-4 p-4 rounded-r-lg flex items-center",
                        error.status === false ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"
                    )}>
                        {error.status === false ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                            <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                        )}
                        <p className={cn("text-sm", error.status === false ? "text-green-700" : "text-red-700")}>
                            {error.message}
                        </p>
                    </div>
                )}

             
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label htmlFor="nombre" className="block mb-2 text-sm font-semibold">
                            Nombre del permiso
                        </label>
                        <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Ej: crear-campaña"
                            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#8c52ff]"
                        />
                    </div>

                    <div>
                        <label htmlFor="descripcion" className="block mb-2 text-sm font-semibold">
                            Descripción
                        </label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            placeholder="Permite a los usuarios añadir campañas publicitarias"
                            rows={4}
                            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-[#8c52ff]"
                        />
                    </div>

                 
                    <div className="flex justify-end gap-4 pt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold transition"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit" 
                            disabled={isLoading}
                            className="px-6 py-3 rounded-xl bg-[#8c52ff] hover:bg-[#7a45eb] text-white font-semibold transition disabled:opacity-50"
                        >
                            {isLoading ? "Guardando..." : "Guardar permiso"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}