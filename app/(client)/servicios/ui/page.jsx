"use client";
import WhatsAppButton from "../../components/WhatsAppButton";
import MayaChatbot from "../../components/Chatbot";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const contentByOrigin = {
  disenoDesarrollo: {
    breadcrumbText: "DISEÑO Y DESARROLLO WEB",
    breadcrumbHref: "/servicios/desing-desarrollo/",
    heroImage: "/servicios/DisenoUI/experiencia-de-usuario-y-diseno-digimedia.webp",
    heroImageAlt: "Subservicio de Experiencia de Usuario y Diseño",
    heroImageTitle: "Experiencia de Usuario y Diseño | Digimedia",
    heroTitle: <>DISEÑO UX <br className="hidden sm:inline" /> Y UI</>,
    description:
      "Diseñamos experiencias digitales estratégicas que conectan, comunican y convierten. Integramos arquitectura de información, usabilidad y diseño visual para crear entornos intuitivos, funcionales y alineados a tus objetivos de negocio.",
    ctaTitle: (
      <>
        CONSOLIDA TU PRESENCIA WEB, DISEÑA <br className="hidden sm:inline" /> CON NOSOTROS TU PÁGINA WEB
      </>
    ),
  },
  gestionRedes: {
    breadcrumbText: "GESTIÓN DE REDES SOCIALES",
    breadcrumbHref: "/servicios/gestion-redes/",
    heroImage: "/servicios/DisenoUI/disenio-ux-y-ui.webp",
    heroImageAlt: "Diseño de piezas gráficas y contenido visual enfocado en redes sociales y engagement digital",
    heroImageTitle: "Diseño gráfico, piezas visuales, redes sociales, contenido digital, engagement, branding visual",
    heroTitle: <>DISEÑO UX <br className="hidden sm:inline" /> Y UI</>,
    description:
      "Diseñamos experiencias digitales que combinan funcionalidad y estética. Creamos interfaces intuitivas, alineadas con la identidad de marca y orientadas a facilitar la navegación y la conversión.",
    ctaTitle: (
      <>
        DEJA QUE TUS REDES ESTÉN <br className="hidden sm:inline" /> EN OTRO NIVEL
      </>
    ),
  },
};

const servicios = [
  {
    title: "DISEÑO DE EXPERIENCIA (UX)",
    text: "Analizamos el comportamiento del usuario y estructuramos recorridos claros y funcionales, reduciendo fricción y optimizando cada punto de interacción.",
    image: "/servicios/diseno_desarrollo_web/diseno_ux_ui/experiencia-de-usuario-digimedia-icono.webp",
    imageTitle: "Sub-subservicio de Experiencia de Usuario (UX)",
    imageAlt: "Ícono que contiene una UX en la pantalla y representa el concepto de experiencia de usuario",
  },
  {
    title: "DISEÑO DE INTERFAZ (UI)",
    text: "Desarrollamos propuestas visuales coherentes con la marca, priorizando claridad, usabilidad y una experiencia atractiva en cada dispositivo.",
    image: "/servicios/diseno_desarrollo_web/diseno_ux_ui/diseno-de-interfaces-digimedia-icono.webp",
    imageTitle: "Sub-subservicio de Diseño de Interfaces (UI)",
    imageAlt: "Ícono que contiene una UI en la pantalla y representa el concepto de diseño de interfaces",
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

function UXUIComponent() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "disenoDesarrollo";
  const content = contentByOrigin[from] || contentByOrigin.disenoDesarrollo;

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
                src={content.heroImage}
                alt={content.heroImageAlt}
                title={content.heroImageTitle}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 550px"
              />
            </div>

            {/* Right Side: Text & Actions */}
            <div className="flex flex-col justify-center h-full text-left">
              {/* Back breadcrumb link */}
              <Link href={content.breadcrumbHref} className="text-[#FFD100] font-black text-xs sm:text-sm uppercase tracking-wider mb-4 hover:underline inline-flex items-center gap-2 cursor-pointer transition-all duration-300">
                <span>&lt; {content.breadcrumbText}</span>
              </Link>

              {/* Title */}
              <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 font-display tracking-tight uppercase">
                {content.heroTitle}
              </h1>

              {/* Description */}
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                {content.description}
              </p>
            </div>
          </motion.div>
        </section>

        {/* TWO CARDS SECTION */}
        <section className="mb-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {servicios.map((servicio, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center p-8 sm:p-10 bg-[#0d0124]/50 backdrop-blur-md border border-white/10 rounded-[32px] shadow-xl hover:border-[#FFD100]/30 transition-all duration-300 hover:scale-[1.02] group"
              >
                {/* Icon Wrapper */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 relative mb-6">
                  <Image
                    src={servicio.image}
                    alt={servicio.imageAlt}
                    title={servicio.imageTitle}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                    sizes="96px"
                  />
                </div>
                {/* Card Title */}
                <h3 className="text-[#FFD100] font-black tracking-wider text-base sm:text-lg uppercase font-display mb-4">
                  {servicio.title}
                </h3>
                {/* Card Description */}
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
                  {servicio.text}
                </p>
              </motion.div>
            ))}
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
                {content.ctaTitle}
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

export default function UXUI() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-[#0a001a] text-white">
          Cargando...
        </div>
      }
    >
      <UXUIComponent />
    </Suspense>
  );
}
