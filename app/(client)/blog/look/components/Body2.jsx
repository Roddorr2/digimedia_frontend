"use client"

import { CheckCircle, Clock, Bookmark, Share2, Eye } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"


export default function Body2() {

    const [activeTab, setActiveTab] = useState("info")

    const tarjetas = [
        {
            titulo: "Tendencias de Diseño Web en 2025",
            descripcion: "Las últimas tendencias en diseño web están marcando la pauta. Desde el uso de gradientes y microinteracciones hasta el minimalismo y las tipografías personalizadas. Mantente actualizado para que tu sitio web no pase desapercibido",
        },

        {
            titulo: "Herramientas para Desarrolladores Web",
            descripcion: "El mundo del desarrollo web evoluciona rápidamente. Aprende sobre las mejores herramientas y frameworks para optimizar tu flujo de trabajo, desde React hasta Tailwind CSS y nuevas alternativas en el backend.",
        },
        {
            titulo: "Optimización para Móviles y UX/UI",
            descripcion: "La experiencia del usuario es clave. Diseñar sitios web que sean fáciles de usar y que se adapten a todos los dispositivos es fundamental para mejorar la accesibilidad y la satisfacción del usuario.",
        },
        {
            titulo: "SEO y Performance en Desarrollo Web",
            descripcion: "Para lograr visibilidad en la web, el SEO es crucial. Además, optimizar la velocidad de carga y la performance de tu sitio web tiene un impacto directo en la experiencia del usuario y en el ranking de los motores de búsqueda.",
        }
    ]

    return (
        <div className="relative lg:mx-48 bg-white text-black rounded-2xl shadow-[0px_10px_25px_rgba(0,0,0,0.15)] overflow-hidden">
            <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>2025-03-31</span>
                </div>
                <div className="flex space-x-3">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <Bookmark className="w-5 h-5 text-teal-600" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <Share2 className="w-5 h-5 text-teal-600" />
                    </button>
                </div>
            </div>

            <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                <Image
                    src="/blog/body2_titulo.webp"
                    alt="Trabajando en un proyecto de diseño web"
                    className="w-full h-full object-cover"
                    width={400}
                    height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">DISEÑO Y DESARROLLO WEB EN 2025</h1>
                    <div className="w-16 h-1 bg-teal-500 mb-4"></div>
                </div>
            </div>

            <div className="px-6 md:px-10 py-8">
                <div className="mb-10 text-lg text-gray-700 leading-relaxed">El diseño y desarrollo web están en constante evolución. Desde la importancia de una buena experiencia de usuario hasta el uso de las últimas tecnologías, este artículo te ayudará a mantenerte al día con las mejores prácticas de diseño web para 2025.</div>

                <div className="flex border-b border-gray-200 mb-8">
                    <button
                        className={`px-4 py-2 font-medium text-sm ${activeTab === "info" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-500 hover:text-gray-700"}`}
                        onClick={() => setActiveTab("info")}
                    >
                        Información
                    </button>
                    <button
                        className={`px-4 py-2 font-medium text-sm ${activeTab === "tips" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-500 hover:text-gray-700"}`}
                        onClick={() => setActiveTab("tips")}
                    >
                        Consejos
                    </button>
                    <button
                        className={`px-4 py-2 font-medium text-sm ${activeTab === "gallery" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-500 hover:text-gray-700"}`}
                        onClick={() => setActiveTab("gallery")}
                    >
                        Galería
                    </button>
                </div>

                <div className="mb-10">
                    {activeTab === "info" && (
                        <div className="space-y-6">
                            {
                                tarjetas.map((section, index) => (
                                    <div
                                        key={`tarjeta-${index}`}
                                        className="bg-gradient-to-r from-teal-50 to-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="p-1 bg-gradient-to-r from-teal-400 to-teal-600"></div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-3 text-teal-700">{section.titulo}</h3>
                                            <p className="text-gray-700">{section.descripcion}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}

                    {activeTab === "tips" && (
                        <div className="bg-gradient-to-br from-teal-50 to-gray-50 rounded-xl p-6">
                            <h3 className="text-2xl font-bold mb-6 text-teal-700 text-center">
                                Consejos para Mejorar el Diseño Web
                            </h3>
                            <ul className="space-y-4">
                                {
                                [
                                    "Asegúrate de que tu sitio sea responsivo y accesible en todos los dispositivos.",
                                    "Utiliza colores y tipografías que sean legibles y complementen la marca.",
                                    "Optimiza la velocidad de carga de tu sitio web para una mejor experiencia de usuario.",
                                    "Incorpora microinteracciones y animaciones para hacer tu sitio más dinámico.",
                                    "Haz que la navegación sea simple y clara para facilitar la experiencia del usuario.",
                                ].filter((text) => text)
                                    .map((text, index) => (
                                        <li key={`commend-${index}`} className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                                            <div className="bg-teal-100 p-2 rounded-full mr-4">
                                                <CheckCircle className="w-5 h-5 text-teal-600" />
                                            </div>
                                            <div>
                                                <p className="text-gray-700">{text}</p>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === "gallery" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {["/blog/body2_galeria1.webp", "/blog/body2_galeria2.webp"].map((src, index) => (
                                <div key={index} className="group relative rounded-xl overflow-hidden shadow-md">
                                    <Image
                                        src={src}
                                        alt={`Imagen ${index + 1} del artículo`}
                                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                                        width={400}
                                        height={400}
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-6 text-center">
                <p className="text-sm">© {new Date().getFullYear()} - Todos los derechos reservados</p>
            </div>

            
            <div className="flex justify-center mt-6 mb-10">
                    <Link
                        href="/servicios/desing-desarrollo"
                        className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-colors"
                    >
                        Ver más información
                    </Link>
                </div>
            </div>
    )
}
              
    
