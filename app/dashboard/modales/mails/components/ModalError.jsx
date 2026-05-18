"use client"

import axios from "axios"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import { AlertCircle, X, Loader2, Send, Info } from "lucide-react"
import url from "../../../../../api/url"
import { getCookie } from "cookies-next"

export default function ModalError({ isVisible, onClose, id_modal_email }) {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    function handleClose() {
        setError("")
        setIsLoading(false)

        onClose()
    }

    useEffect(() => {
        if (isVisible) {
            setError("")
        }
    }, [isVisible])

    if (!isVisible) return null

    function handleChange(e) {
        setError(e.target.value)
    }

    async function guardarError() {
        if (!error.trim()) {
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
                `${url}/api/modales/reportar_error/${id_modal_email}`,
                { error: error },
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
                    text: "El error ha sido reportado exitosamente.",
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
            })        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div
                className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between bg-slate-50 px-6 py-4 border-b border-slate-100">
                    <div className="flex items-center">
                        <div className="bg-red-100 p-2 rounded-full mr-3">
                            <AlertCircle className="h-5 w-5 text-red-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-800">Reportar Error de Email</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-red-400"
                        aria-label="Cerrar"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <div className="flex">
                            <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                            <div className="text-sm text-blue-700">
                                <p className="font-medium mb-1">Recomendación:</p>
                                <p>
                                    Revisa el correo de DigiMedia. Recibirás una notificación si el email no existe o no se pudo entregar.
                                    Si no hay notificación, el correo probablemente llegó a la bandeja de entrada o spam del destinatario.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="error-description" className="block text-sm font-medium text-slate-700 mb-2">
                            Descripción del error
                        </label>
                        <textarea
                            id="error-description"
                            value={error}
                            onChange={handleChange}
                            placeholder="Describe el problema que has encontrado..."
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 min-h-[120px] text-slate-800"
                        />
                    </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={guardarError}
                        disabled={isLoading}
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 text-sm font-medium flex items-center"
                    >
                        {isLoading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                        {isLoading ? "Enviando..." : "Enviar reporte"}
                    </button>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isLoading}
                        className="px-4 py-2 bg-red-500 rounded-lg border border-slate-200 text-white hover:bg-red-400 transition-colors duration-200 text-sm font-medium"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}
