
"use client"

import { CheckCircle, Calendar, ArrowDownCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function Body3() {

    const tarjetas = [
        {
            titulo: "Identidad Digital y Reconocimiento de Marca",
            descripcion: "Una gestión efectiva de redes sociales permite construir una imagen sólida y coherente de tu negocio. Tu marca se vuelve reconocible a través del contenido visual, el tono de comunicación y la interacción constante con la audiencia.",
        },

        {
            titulo: "Interacción y Fidelización de Clientes",
            descripcion: "Las redes sociales no solo son vitrinas, sino canales de diálogo. Escuchar, responder y generar contenido valioso crea una comunidad activa, lo que incrementa la fidelidad y la confianza del cliente.",
        },
        {
            titulo: "Monitoreo de Resultados y Optimización",
            descripcion: "El análisis de métricas como el alcance, la interacción y el crecimiento de seguidores permite ajustar las estrategias de contenido en tiempo real, maximizando el impacto de cada publicación.",
        },
        {
            titulo: "Aumento de Visibilidad y Oportunidades",
            descripcion: "Una presencia activa y bien gestionada en redes sociales puede llevar tu marca a nuevos públicos, generar leads y aumentar tus oportunidades de venta o colaboración.",
        }
    ]

    return (
        <div className="relative lg:mx-48 bg-white text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 py-3 px-6 flex justify-between items-center">
                <div className="flex items-center text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">2025-03-31</span>
                </div>
                <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-white/70"></div>
                    ))}
                </div>
            </div>

            <div className="relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-100 to-transparent"></div>
                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                        <h1 className="text-4xl md:text-5xl font-black text-indigo-900 leading-tight mb-6">GESTIÓN INTELIGENTE DE REDES</h1>
                        <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-6"></div>
                        <p className="text-lg text-gray-700 leading-relaxed">Las redes sociales se han convertido en uno de los pilares de la estrategia digital moderna. Una buena gestión no solo mejora la presencia online, sino que potencia la conexión con los usuarios y la visibilidad de tu negocio.</p>
                        <button
                            className="mt-6 inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                        >
                            <span>Continuar leyendo</span>
                            <ArrowDownCircle className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur"></div>
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                <img
                                    src="/blog/blog-11.webp"
                                        alt="Muchas interacciones en redes sociales"
                                    className="w-[22rem] h-[22rem] object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110 rounded-2xl shadow-lg object-cover relative z-10"
                                />
                            </div>
                            <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-indigo-100 rounded-full z-0"></div>
                            <div className="absolute -top-3 -left-3 w-16 h-16 bg-purple-100 rounded-full z-0"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="content-details" className="p-8 md:p-12 bg-gradient-to-b from-white to-indigo-50">
                <div className="mb-16">
                    <div className="flex items-center mb-8">
                        <div className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-white font-bold mr-3">
                            G
                        </div>
                        <h2 className="text-2xl font-bold text-indigo-900">Galería</h2>
                        <div className="h-px flex-grow bg-indigo-200 ml-4"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {["/blog/blog-12.webp", "/blog/blog-1.webp"].map((src, index) => (
                            <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg">
                                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <img
                                    src={src}
                                    alt={`Imagen ${index + 1} del artículo`}
                                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg">
                                        <ExternalLink className="w-6 h-6 text-indigo-600" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-16">
                    <div className="flex items-center mb-8">
                        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-3">
                            C
                        </div>
                        <h2 className="text-2xl font-bold text-green-600">Consejos para una Gestión Efectiva</h2>
                        <div className="h-px flex-grow bg-green-200 ml-4"></div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-indigo-50 rounded-xl p-6 shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {
                                [
                                    "Define claramente los objetivos de tu presencia digital.",
                                    "Planifica tu contenido con calendarios editoriales.",
                                    "Utiliza herramientas como Hootsuite o Meta Business Suite para automatizar.",
                                    "Analiza los resultados y ajusta tus estrategias regularmente.",
                                    "Mantén una identidad visual coherente en todas las plataformas.",
                                ]
                                    .filter((text) => text)
                                    .map((text, index) => (
                                        <div
                                            key={`commend-${index}`}
                                            className="flex items-start p-4 bg-white rounded-lg shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow"
                                        >
                                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                                            <p className="text-gray-700">{text}</p>
                                        </div>
                                    ))}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex items-center mb-8">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
                            I
                        </div>
                        <h2 className="text-2xl font-bold text-blue-600">Información Detallada</h2>
                        <div className="h-px flex-grow bg-blue-200 ml-4"></div>
                    </div>

                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-100 rounded-full opacity-70"></div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-100 rounded-full opacity-70"></div>

                        <div className="relative z-10">
                            {
                                tarjetas.map((section, index) => {
                                    const isEven = index % 2 === 0

                                    return (
                                        <div
                                            key={`tarjeta-${index}`}
                                            className={`mb-8 flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} bg-white rounded-xl overflow-hidden shadow-md`}
                                        >
                                            <div
                                                className={`md:w-1/3 bg-gradient-to-br ${isEven ? "from-blue-600 to-indigo-700" : "from-indigo-700 to-purple-800"} p-6 flex items-center justify-center`}
                                            >
                                                <h3 className="text-2xl font-bold text-white text-center">{section.titulo}</h3>
                                            </div>
                                            <div className="md:w-2/3 p-6">
                                                <p className="text-gray-700 leading-relaxed">{section.descripcion}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
           
            <div className="flex justify-center mt-6 mb-10">
                    <Link
                        href="/servicios/gestion-redes"
                        className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-colors"
                    >
                        Ver más información
                    </Link>
                </div>
            
        </div>
        
    )
}

