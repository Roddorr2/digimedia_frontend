'use client';
import React, { useState } from 'react';

const Nosotros = () => {
    const mensaje = "Hola, vengo de la pagina web de Digimedia, deseo mas información! 👌";
    const numeroWhatsApp = "51936910425";
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    // Estados para controlar la visibilidad del texto de VISIÓN y MISIÓN
    const [showVision, setShowVision] = useState(false);
    const [showMision, setShowMision] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            <div className="relative h-[400px] overflow-hidden">
                <img
                    src="/Img-nosotros/NOSOTROS_1680_1050.avif"
                    alt="grupo juntando sus manos"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-[#7B22B3] bg-opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-8 h-8 bg-white rounded-full opacity-80"></div>
                            <div className="w-8 h-8 bg-white rounded-full -ml-2 opacity-80"></div>
                        </div>
                        <h1 className="text-5xl font-bold text-white tracking-wider shadow-lg">
                            ¿QUIÉNES SOMOS?
                        </h1>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-6 py-16 sm:px-8 lg:px-10">
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-1 bg-purple-600"></div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            Nosotros
                        </h2>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed text-justify max-w-5xl">
                        <strong>Digimedia</strong> es una empresa de marketing digital, que se enfoca en <strong>potenciar tu emprendimiento</strong> a nivel online. Además, le brinda a tu emprendimiento estrategias que ayudan a cumplir los objetivos de manera eficaz. Somos un grupo de personas comprometidas con el desarrollo de cada marca que nos contacta.
                    </p>
                </div>
                <div className="relative grid md:grid-cols-2 gap-16 mb-20">
                    {/* VISIÓN */}
                    <div
                        className="group bg-white shadow-lg p-6 rounded-lg transition-transform transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                        onClick={() => setShowVision(!showVision)}
                    >
                        <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                            <span className="text-purple-600">VISIÓN</span>
                        </h3>
                        {showVision && (
                            <p className="text-gray-600 text-justify leading-relaxed">
                                Liderar la transformación digital de las <strong>PYME</strong> en el Perú; estableciendo vínculos sólidos entre nuestros clientes y sus respectivas audiencias.
                            </p>
                        )}
                    </div>
                    {/* Divisor vertical */}
                    <div className="hidden md:block w-px bg-purple-600 absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2"></div>
                    {/* MISIÓN */}
                    <div
                        className="group bg-white shadow-lg p-6 rounded-lg transition-transform transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                        onClick={() => setShowMision(!showMision)}
                    >
                        <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                            <span className="text-purple-600">MISIÓN</span>
                        </h3>
                        {showMision && (
                            <p className="text-gray-600 text-justify leading-relaxed">
                                Ser aliado de los <strong>emprendimientos</strong> en su posicionamiento digital; mediante la generación de contenido estratégico que garantice el cumplimiento de los objetivos planteados.
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer">
                <div className="fixed bottom-4 right-4 bg-green-500 p-4 rounded-full shadow-lg cursor-pointer">
                    <i className="fab fa-whatsapp text-white text-3xl"></i>
                </div>
            </a>
            <div className="flex justify-center pt-2 pb-16">
                <img
                    src="/Img-nosotros/infoNosotros.avif"
                    alt="Equipo trabajando en la computadora"
                    className="w-full max-w-3xl h-auto rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default Nosotros;