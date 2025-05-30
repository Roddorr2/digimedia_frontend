"use client";

import { useState, useEffect } from "react";
import empleado_service from "../services/empleado.service";
import { getCookie } from 'cookies-next';
import { Eye, EyeOff } from 'lucide-react';

export default function ModalUpdatePassword({ isVisible, onClose }) {

    const empleadoCookie = getCookie('empleado');
    const empleadoAutenticado = empleadoCookie ? JSON.parse(empleadoCookie) : null;
    const empleadoAutenticadoId = empleadoAutenticado?.id_empleado;

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState({ status: undefined, message: "" });
    const [loading, setLoading] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    // reset de form al abrirse
    useEffect(() => {
        if (isVisible) {
            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
            setError({ status: undefined, message: "" });
            setShowPasswords({
                currentPassword: false,
                newPassword: false,
                confirmPassword: false
            });
        }
    }, [isVisible]);

    if (!isVisible) return null;

    const handleChange = (e) => {
        // limpiar errores al escribir
        if (error.status !== undefined) {
            setError({ status: undefined, message: "" });
        }
        
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSubmit = async () => {
        const { currentPassword, newPassword, confirmPassword } = formData;
    
        // validaciones
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError({ status: true, message: "Todos los campos son obligatorios." });
            return;
        }
    
        if (newPassword.length < 4) {
            setError({ status: true, message: "La nueva contraseña debe tener al menos 4 caracteres." });
            return;
        }
    
        if (newPassword !== confirmPassword) {
            setError({ status: true, message: "Las contraseñas no coinciden." });
            return;
        }
    
        setLoading(true);
    
        try {
            const verifyData = {
                currentPassword: currentPassword,
                id_empleado: empleadoAutenticadoId,
            };

            const verifyResponse = await empleado_service.verifyPassword(verifyData);
            
            if (verifyResponse.status !== 200) {
                let errorMessage = "La contraseña actual es incorrecta. Por favor, verifica e intenta nuevamente.";
                
                try {
                    const errorData = await verifyResponse.json();
                    if (errorData && errorData.message) {
                        errorMessage = errorData.message;
                    }
                } catch (jsonError) {
                    console.log("No se pudo leer la respuesta como JSON:", jsonError);
                }
                
                setError({ 
                    status: true, 
                    message: errorMessage
                });
                setLoading(false);
                return;
            }

            const verifyResult = await verifyResponse.json();
            if (!verifyResult.valid) {
                setError({ 
                    status: true, 
                    message: "La contraseña actual es incorrecta. Por favor, verifica e intenta nuevamente." 
                });
                setLoading(false);
                return;
            }
            
            
            const passwordData = {
                currentPassword: currentPassword,
                password: newPassword,         
            };
    
            // solicitud para actualizar
            const response = await empleado_service.updatePass(passwordData, empleadoAutenticadoId);
    
            // respuesta
            const data = await response.json();
            
            // respuesta con error
            if (response.status !== 200) {
                const errorMessage = data.message || "Hubo un error al actualizar la contraseña.";
                setError({ status: true, message: errorMessage });
                setLoading(false);
                return;
            }
            
            // éxito
            setError({ status: false, message: "Contraseña actualizada correctamente." });
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error) {
            console.error("Error al actualizar la contraseña:", error);
            setError({ 
                status: true, 
                message: "No se pudo procesar la solicitud. Verifique su conexión e intente nuevamente." 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="fixed inset-0 bg-black bg-opacity-45 backdrop-blur-md flex justify-center items-center px-4 z-50">
            <div className="max-w-[400px] w-full dark:bg-gray-900 bg-white rounded-xl p-6 shadow-lg">
                <h2 className="font-bold text-lg mb-4">Cambiar Contraseña</h2>
                
                {error.status !== undefined && (
                    <div className={`border-l-4 p-3 my-4 rounded-r ${
                        error.status ? "bg-red-100 border-red-500" : "bg-green-100 border-green-500"
                    }`}>
                        <p className={`text-sm ${
                            error.status ? "text-red-700" : "text-green-700"
                        }`}>
                            {error.message}
                        </p>
                    </div>
                )}
                
                <div className="flex flex-col gap-4 mt-4">
                    <fieldset className="flex flex-col gap-2">
                        <label htmlFor="currentPassword" className="font-medium">
                            Contraseña Actual
                        </label>
                        <div className="relative">
                            <input
                                id="currentPassword"
                                type={showPasswords.currentPassword ? "text" : "password"}
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg p-2 w-full pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={loading}
                            />
                            <button 
                                type="button"
                                onClick={() => togglePasswordVisibility('currentPassword')}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                                disabled={loading}
                            >
                                {showPasswords.currentPassword ? 
                                    <EyeOff size={18} /> : 
                                    <Eye size={18} />
                                }
                            </button>
                        </div>
                    </fieldset>
                    
                    <fieldset className="flex flex-col gap-2">
                        <label htmlFor="newPassword" className="font-medium">
                            Nueva Contraseña
                        </label>
                        <div className="relative">
                            <input
                                id="newPassword"
                                type={showPasswords.newPassword ? "text" : "password"}
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg p-2 w-full pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={loading}
                            />
                            <button 
                                type="button"
                                onClick={() => togglePasswordVisibility('newPassword')}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                                disabled={loading}
                            >
                                {showPasswords.newPassword ? 
                                    <EyeOff size={18} /> : 
                                    <Eye size={18} />
                                }
                            </button>
                        </div>
                    </fieldset>
                    
                    <fieldset className="flex flex-col gap-2">
                        <label htmlFor="confirmPassword" className="font-medium">
                            Confirmar Nueva Contraseña
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showPasswords.confirmPassword ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg p-2 w-full pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={loading}
                            />
                            <button 
                                type="button"
                                onClick={() => togglePasswordVisibility('confirmPassword')}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                                disabled={loading}
                            >
                                {showPasswords.confirmPassword ? 
                                    <EyeOff size={18} /> : 
                                    <Eye size={18} />
                                }
                            </button>
                        </div>
                    </fieldset>
                    
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`bg-blue-500 text-white py-2 px-4 rounded-lg font-medium transition-colors ${
                                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-600"
                            }`}
                        >
                            {loading ? "Procesando..." : "Cambiar"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}