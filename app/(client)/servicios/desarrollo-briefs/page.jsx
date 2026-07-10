"use client";
import WhatsAppButton from "../../components/WhatsAppButton";
import MayaChatbot from "../../components/Chatbot";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function DesarrolloBrief() {
  return (
    <div className="bg-[#0a001a] bg-gradient-to-b from-[#10003b] via-[#090022] to-[#050014] text-white min-h-screen relative overflow-hidden font-sans pt-8 md:pt-16">
      {/* Background Glow Orbs */}
      <div className="absolute top-[5%] left-[-15%] w-[40vw] h-[40vw] max-w-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[35%] right-[-15%] w-[45vw] h-[45vw] max-w-[700px] bg-[#FF037F]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[10%] w-[35vw] h-[35vw] max-w-[500px] bg-[#b525fe]/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-[1280px] mx-auto px-6 relative z-10">

        {/* HERO CONTAINER CARD */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[linear-gradient(180deg,#000000_3%,#120048_100%)] border border-white/10 rounded-[32px] md:rounded-[40px] p-8 sm:p-10 md:p-12 lg:p-14 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* Left Side: Image */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-lg border border-white/5">
              <Image
                src="/servicios/desarrollo_brief/desarrollo-de-brief.webp"
                alt="Branding, Diseño gráfico, Identidad visual, Desarrollo de marca, Manual de marca, Brief creativo, Comunicación visual, Estrategia de marca"
                title="Branding y diseño - desarrollo de brief - Digimedia"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 550px"
              />
            </div>

            {/* Right Side: Text & Actions */}
            <div className="flex flex-col justify-center h-full text-left">
              {/* Back breadcrumb link */}
              <Link href="/servicios/branding-desing/" className="text-[#FFD100] font-black text-xs sm:text-sm uppercase tracking-wider mb-4 hover:underline inline-flex items-center gap-2 cursor-pointer transition-all duration-300">
                <span>&lt; BRANDING Y DISEÑO</span>
              </Link>

              {/* Title */}
              <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 font-display tracking-tight uppercase">
                DESARROLLO <br className="hidden sm:inline" /> DE BRIEF
              </h1>

              {/* Description */}
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Transformamos tus ideas en una hoja de ruta clara para la creación de contenido gráfico y audiovisual. Nuestro proceso de brief asegura que cada proyecto de publicidad digital esté alineado con sus objetivos comerciales y atraiga a su público ideal.
              </p>
            </div>
          </motion.div>
        </section>

        {/* FEATURE CARD SECTION */}
        <section className="mb-20 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-full max-w-md flex flex-col items-center text-center p-8 sm:p-10 bg-[#0d0124]/50 backdrop-blur-md border border-white/10 rounded-[32px] shadow-xl hover:border-[#FFD100]/30 transition-all duration-300 hover:scale-[1.02] group"
          >
            {/* Icon Wrapper */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 relative mb-6">
              <Image
                src="/servicios/branding_diseno/desarrollo_brief/icons/brief-digimedia-icono.webp"
                alt="Icono que representa la creación y edición de elementos visuales, como diagramas, interfaces o piezas gráficas digitales"
                title="Desarrollo de Brief"
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-110"
                sizes="96px"
              />
            </div>
            {/* Card Title */}
            <h3 className="text-[#FFD100] font-black tracking-wider text-base sm:text-lg uppercase font-display mb-4">
              BRIEF
            </h3>
            {/* Card Description */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
              Desarrollamos el brief de su marca como documento estratégico, consolidando identidad y objetivos del proyecto para garantizar un desarrollo visual coherente y alineado a los resultados de su campaña.
            </p>
          </motion.div>
        </section>

        {/* CTA SECTION */}
        <section className="pb-20">
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
                CONECTA DE MANERA CREATIVA <br className="hidden sm:inline" /> E INNOVADORA CON TU AUDIENCIA
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
