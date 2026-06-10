"use client"

import axios from "axios"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import { AlertCircle, CheckCircle, X, Loader2, MessageSquare, XCircle } from "lucide-react"
import url from "../../../../../api/url"
import { getCookie } from "cookies-next"

export default function ModalEstado({ isVisible, onClose, id_modal_wat }) {
    const [estado, setEstado] = useState(true)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    function handleStatusChange(e) {
        const value = e.target.value === "true"
        setEstado(value)
    }

    function handleErrorChange(e) {
        setError(e.target.value)
    }

    useEffect(() => {
        if (isVisible) {
            setError("")
            setEstado(true)
        }
    }, [isVisible])

    if (!isVisible) return null

    async function guardarEstado() {
        if (estado) {
            try {
                setIsLoading(true)
                const response = await axios.put(
                    `${url}/api/modales/estado_wat/${id_modal_wat}`,
                    { estado: 1 },
                    {
                        headers: {
                            Authorization: `Bearer ${getCookie("token")}`,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    },
                )
                if (response.status === 200) {
                    await Swal.fire({
                        title: "Estado Correcto Enviado",
                        text: "El estado del mensaje ha sido actualizado a exitoso",
                        icon: "success",
                        confirmButtonText: "Entendido",
                        confirmButtonColor: "#10b981",
                    })
                    handleClose()
                    window.location.reload()
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo cambiar el estado del mensaje.",
                        icon: "error",
                        confirmButtonText: "OK",
                    })
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un error inesperado.",
                    icon: "error",
                    confirmButtonText: "OK",
                })
            } finally {
                setIsLoading(false)
            }
        } else {
            if (error.trim() === "") {
                Swal.fire({
                    title: "Campo requerido",
                    text: "Por favor, describe el error antes de enviar.",
                    icon: "warning",
                    confirmButtonText: "Entendido",
                })
                return
            }
            try {
                setIsLoading(true)
                const response = await axios.put(
                    `${url}/api/modales/estado_wat/${id_modal_wat}`,
                    { error: error, estado: 0 },
                    {
                        headers: {
                            Authorization: `Bearer ${getCookie("token")}`,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    },
                )
                if (response.status === 200) {
                    await Swal.fire({
                        title: "Error Reportado",
                        text: "El problema ha sido reportado exitosamente.",
                        icon: "success",
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    handleClose()
                    window.location.reload()
                } else {
                    Swal.fire({
                        title: "Error",
                        text: response.message || "No se pudo reportar el error.",
                        icon: "error",
                        confirmButtonText: "OK",
                    })
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un error inesperado.",
                    icon: "error",
                    confirmButtonText: "OK",
                })            } finally {
                setIsLoading(false)
            }
        }
    }

    function handleClose() {
        setError("")
        setEstado(true)
        setIsLoading(false)
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div
                className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={`flex items-center justify-between px-6 py-4 border-b transition-colors duration-300 ${estado
                            ? "bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200"
                            : "bg-gradient-to-r from-rose-50 to-rose-100 border-rose-200"
                        }`}
                >
                    <div className="flex items-center">
                        <div
                            className={`p-2 rounded-full mr-3 transition-colors duration-300 ${estado ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                                }`}
                        >
                            {estado ? <MessageSquare className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                        </div>
                        <h2 className="text-lg font-semibold text-slate-800">Estado de Mensaje WhatsApp</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-white/50"
                        aria-label="Cerrar"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 mb-3">Selecciona el estado del mensaje:</label>
                        <div className="grid grid-cols-2 gap-3">
                            <label
                                className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${estado
                                        ? "bg-emerald-50 border-emerald-500 shadow-sm shadow-emerald-100"
                                        : "bg-white border-slate-200 hover:border-emerald-200"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    value="true"
                                    checked={estado === true}
                                    onChange={handleStatusChange}
                                    className="sr-only"
                                />
                                <div className="flex flex-col items-center text-center">
                                    <CheckCircle
                                        className={`h-8 w-8 mb-2 ${estado ? "text-emerald-500" : "text-slate-300"
                                            } transition-colors duration-300`}
                                    />
                                    <span
                                        className={`font-medium ${estado ? "text-emerald-700" : "text-slate-500"
                                            } transition-colors duration-300`}
                                    >
                                        Enviado Correctamente
                                    </span>
                                </div>
                            </label>

                            <label
                                className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${!estado
                                        ? "bg-rose-50 border-rose-500 shadow-sm shadow-rose-100"
                                        : "bg-white border-slate-200 hover:border-rose-200"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    value="false"
                                    checked={estado === false}
                                    onChange={handleStatusChange}
                                    className="sr-only"
                                />
                                <div className="flex flex-col items-center text-center">
                                    <XCircle
                                        className={`h-8 w-8 mb-2 ${!estado ? "text-rose-500" : "text-slate-300"
                                            } transition-colors duration-300`}
                                    />
                                    <span
                                        className={`font-medium ${!estado ? "text-rose-700" : "text-slate-500"
                                            } transition-colors duration-300`}
                                    >
                                        Reportar Error
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {!estado && (
                        <div className="mb-4 animate-in fade-in slide-in-from-top duration-300">
                            <label htmlFor="error-description" className="block text-sm font-medium text-slate-700 mb-2">
                                Descripción del error
                            </label>
                            <div className="relative">
                                <textarea
                                    id="error-description"
                                    value={error}
                                    onChange={handleErrorChange}
                                    placeholder="Describe el problema que has encontrado con el envío del mensaje..."
                                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 min-h-[120px] text-slate-800 ${error.trim()
                                            ? "border-rose-300 bg-rose-50 focus:ring-2 focus:ring-rose-200 focus:border-rose-500"
                                            : "border-slate-200 focus:ring-2 focus:ring-slate-200 focus:border-slate-300"
                                        }`}
                                />
                                <div className="absolute bottom-3 right-3 text-xs text-slate-400">{error.length} caracteres</div>
                            </div>
                        </div>
                    )}

                    <div
                        className={`p-4 rounded-lg mb-4 transition-colors duration-300 ${estado
                                ? "bg-emerald-50 border border-emerald-100 text-emerald-800"
                                : "bg-rose-50 border border-rose-100 text-rose-800"
                            }`}
                    >
                        <div className="flex">
                            {estado ? (
                                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                            ) : (
                                <AlertCircle className="h-5 w-5 text-rose-500 mt-0.5 mr-3 flex-shrink-0" />
                            )}
                            <div className="text-sm">
                                <p className="font-medium mb-1">
                                    {estado ? "Mensaje enviado correctamente" : "Reportando un problema"}
                                </p>
                                <p>
                                    {estado
                                        ? "Al confirmar, estás indicando que el mensaje de WhatsApp se envió sin problemas al destinatario."
                                        : "Al reportar un error, ayudas a identificar problemas en el sistema de mensajería."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`px-6 py-4 border-t flex justify-end gap-3 transition-colors duration-300 ${estado ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100"
                        }`}
                >
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isLoading}
                        className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors duration-200 text-sm font-medium"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={guardarEstado}
                        disabled={isLoading}
                        className={`px-5 py-2 rounded-lg text-white transition-all duration-300 text-sm font-medium flex items-center ${estado
                                ? "bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-200"
                                : "bg-rose-600 hover:bg-rose-700 shadow-sm shadow-rose-200"
                            } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        ) : estado ? (
                            <CheckCircle className="h-4 w-4 mr-2" />
                        ) : (
                            <AlertCircle className="h-4 w-4 mr-2" />
                        )}
                        {isLoading ? "Procesando..." : estado ? "Confirmar envío exitoso" : "Reportar problema"}
                    </button>
                </div>
            </div>
        </div>
    )
}
