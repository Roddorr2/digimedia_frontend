"use client";
import WhatsAppButton from "../../components/WhatsAppButton";
import MayaChatbot from "../../components/Chatbot";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function MarketingGestionDigital() {
  const servicios = [
    {
      title: "ANÁLISIS Y BENCHMARKING",
      text: "Evaluamos y mejoramos el rendimiento de tu marca frente a la competencia con las mejores estrategias.",
      image: "/servicios/marketing/marketing-y-gestion_sub1-ANALISIS-Y-BENCHMARKING-1.webp",
      ruta: "/servicios/analisis-y-benchmarking/",
      imageTitle: "Análisis y Benchmarking | Digimedia",
      imageAlt: "ANÁLISIS Y BENCHMARKING",
    },
    {
      title: "CAMPAÑAS DIGITALES",
      text: "Planificamos y optimizamos campañas en plataformas digitales para mejorar el rendimiento, la conversión y el retorno de inversión de tu marca.",
      image: "/servicios/marketing/marketing-y-gestion_sub2-CAMPANAS-DIGITALES.webp",
      ruta: "/servicios/naming-logo-slogan/",
      imageTitle: "Campañas Digitales | Digimedia",
      imageAlt: "CAMPAÑAS DIGITALES",
    },
    {
      title: "IDENTIDAD VISUAL Y CORPORATIVA",
      text: "Aseguramos que tu presencia online sea segura, rápida y eficiente para la disponibilidad de tus clientes.",
      image: "/servicios/marketing/marketing-y-gestion_sub3-IDENTIDAD-VISUAL-Y-CORPORATIVA.webp",
      ruta: "/servicios/identidad-visual/",
      imageTitle: "Identidad Visual y Corporativa | Digimedia",
      imageAlt: "IDENTIDAD VISUAL Y CORPORATIVA",
    },
    {
      title: "ANÁLISIS DE MÉTRICAS",
      text: "Evaluamos el desempeño de tus estrategias digitales mediante métricas clave para optimizar acciones y tomar decisiones basadas en resultados.",
      image: "/servicios/marketing/marketing-y-gestion_sub4-ANALISIS-DE-METRICAS.webp",
      imageTitle: "Campañas Digitales | Digimedia",
      imageAlt: "ANÁLISIS DE MÉTRICAS",
      ruta: "/servicios/manual-marca/",
    },
  ];

  // Motion animation variants for entry effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="bg-[#0a001a] bg-gradient-to-b from-[#10003b] via-[#090022] to-[#050014] text-white min-h-screen relative overflow-hidden font-sans">
      {/* Background Glow Orbs */}
      <div className="absolute top-[5%] left-[-15%] w-[40vw] h-[40vw] max-w-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[35%] right-[-15%] w-[45vw] h-[45vw] max-w-[700px] bg-[#FF037F]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[10%] w-[35vw] h-[35vw] max-w-[500px] bg-[#b525fe]/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* HERO SECTION */}
        <section className="pb-12 md:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left flex flex-col justify-center h-full pt-6 md:pt-8"
          >
            <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-4 md:mb-6 font-display tracking-tight">
              MARKETING Y <br className="hidden sm:inline" /> GESTIÓN DIGITAL
            </h1>
            <h2 className="text-[#FFD100] font-black text-lg sm:text-xl md:text-2xl uppercase tracking-wider mb-6">
              CONECTA, IMPACTA Y HAZ CRECER TU MARCA EN EL ENTORNO DIGITAL
            </h2>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
              ¡Haz despegar tu marca al éxito digital! Conecta, Impacta y Crece: El poder de despegar tu marca con el Marketing y la Gestión Digital en la era online.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[980px] h-[280px] sm:h-[380px] md:h-[460px] lg:h-[520px] overflow-hidden transition-colors duration-300">
              <Image
                src="/servicios/marketing/marketing-y-gestion-digital-hero.webp"
                alt="Imagen de MARKETING Y GESTIÓN DIGITAL"
                title="Marketing y Gestión Digital | Digimedia"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 980px"
              />
              {/* Efecto desvanecido hacia el lado izquierdo */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#10003b] via-[#10003b]/40 to-transparent z-10 pointer-events-none" />
            </div>
          </motion.div>
        </section>

        {/* ¿CÓMO FUNCIONA? SECTION */}
      </div>

      <section className="w-full py-16 bg-gradient-to-r from-[#120048] via-[#000000] to-[#120048] border-t border-b border-white/5 relative z-10">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-[#FFD100] font-extrabold text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider mb-6 font-display">
              ¿CÓMO FUNCIONA?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">
              El Marketing Digital consiste en planificar, ejecutar y optimizar estrategias comerciales utilizando herramientas digitales para conectar con el público y alcanzar objetivos de negocio.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="w-full max-w-[1280px] mx-auto px-6 relative z-10">

        {/* NUESTROS SUBSERVICIOS SECTION */}
        <section className="py-16 md:py-24 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-[#FFD100] font-extrabold text-3xl sm:text-4xl uppercase tracking-wider mb-4 font-display">
              NUESTROS SUBSERVICIOS
            </h2>
            <div className="w-36 h-1.5 bg-[#FFD100] mx-auto rounded-full" />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap justify-center gap-8 md:gap-10"
          >
            {servicios.map((servicio, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(25%-1.875rem)] max-w-md h-[400px] sm:h-[460px] lg:h-[480px] relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,209,0,0.15)]"
              >
                <Link href={servicio.ruta} className="block w-full h-full relative">
                  {/* Background Photo */}
                  <Image
                    src={servicio.image}
                    alt={servicio.imageAlt}
                    title={servicio.imageTitle}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Translucent overlays */}
                  <div className="absolute inset-0 bg-[#0d0124]/60 mix-blend-multiply transition-colors duration-500 group-hover:bg-[#0d0124]/50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050014] via-[#050014]/30 to-transparent opacity-90" />

                  {/* Card Bottom Label Content */}
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col items-center z-20">
                    <div className="w-full bg-[#050014]/85 backdrop-blur-md border border-white/10 rounded-2xl py-5 px-4 text-center shadow-lg transition-all duration-300 group-hover:bg-[#050014]/95 group-hover:border-white/20">
                      <h3 className="text-[#FFD100] font-bold tracking-wider text-sm sm:text-base leading-tight uppercase font-display">
                        {servicio.title}
                      </h3>
                      {/* Interactive hover description */}
                      <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-3">
                        <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                          {servicio.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-r from-[#18033E]/90 to-[#0A0019]/90 backdrop-blur-lg border border-white/10 p-8 sm:p-10 md:p-14 lg:p-16 rounded-3xl text-center max-w-4xl mx-auto shadow-2xl overflow-hidden"
          >
            {/* CTA Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/15 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-white font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider mb-8 leading-tight font-display">
                AUMENTA TUS VENTAS CON <br className="hidden sm:inline" /> MARKETING DIGITAL
              </h2>
              <Link href="/contactanos">
                <button
                  id="modal-button"
                  className="bg-[#FFD100] hover:bg-[#FFE054] text-[#0A0019] px-10 py-4 rounded-full font-bold uppercase tracking-wider text-base sm:text-lg transition-all duration-300 shadow-[0_0_25px_rgba(255,209,0,0.35)] hover:shadow-[0_0_40px_rgba(255,209,0,0.55)] transform hover:scale-105"
                >
                  CONTÁCTANOS AHORA
                </button>
              </Link>
            </div>
          </motion.div>
        </section>

      </div>

      <WhatsAppButton />
      <MayaChatbot />
    </div>
  );
}
