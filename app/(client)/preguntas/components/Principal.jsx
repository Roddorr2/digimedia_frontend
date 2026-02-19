"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Principal() {
  return (
    <section className="w-full bg-[#f9f9f9] font-sans overflow-visible">
      {/* Hero Section */}
      <div className="relative w-full h-[450px] md:h-[650px] flex flex-col items-center justify-center overflow-visible">
        {/* Background Image - The woman thinking */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/faq/preguntas-frecuentes.jpg"
          alt="Fondo de preguntas frecuentes"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_15%] md:object-[50%_10%]"
        />
      </div>

        {/* WhatsApp Icon */}
        {/* <div className="absolute right-6 md:right-20 top-1/2 -translate-y-1/2 z-20">
          <motion.a
            href="https://wa.me/51983027828"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="block"
          >
            <Image
              src="/image-home/WhatsApp.svg.webp"
              alt="WhatsApp"
              width={80}
              height={80}
              className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg"
            />
          </motion.a>
        </div> */}

        {/* Floating "PREGUNTAS" Badge - Moved higher */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-0 translate-y-1/2 z-30 w-full flex justify-center px-4"
        >
         <div
          className="
            bg-[#b525fe]
            rounded-t-[60px]
            mb-4
            px-10 py-5
            sm:px-16 sm:py-6
            md:px-28 md:py-7
            shadow-[0_-14px_35px_rgba(0,0,0,0.18)] md:shadow-[0_-18px_40px_rgba(0,0,0,0.25)]
          "
        >
            <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-black uppercase text-center leading-none tracking-tight m-0">
              PREGUNTAS
            </h1>
          </div>
        </motion.div>
      </div>

      {/* Description Section with Purple Background and Adaptive Decorative Lines */}
      <div className="bg-[#b525fe] -mt-px pt-24 md:pt-28 pb-16 px-6 relative overflow-hidden">
        {/* Decorative Lines Left - Starting from the edge */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:block w-[15%] opacity-90">
          <svg viewBox="0 0 200 120" className="w-full h-auto text-white" stroke="currentColor" fill="none" strokeWidth="4" strokeLinecap="round">
            <line x1="0" y1="20" x2="160" y2="20" />
            <circle cx="160" cy="20" r="6" fill="white" />
            
            <line x1="0" y1="50" x2="190" y2="50" />
            <circle cx="190" cy="50" r="6" fill="white" />
            
            <path d="M0 80 H60 L80 100 H170" />
            <circle cx="170" cy="100" r="6" fill="white" />
            
            <line x1="0" y1="110" x2="100" y2="110" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <p className="text-white text-xl md:text-3xl font-medium max-w-2xl mx-auto leading-tight italic sm:not-italic">
            Encuentra respuestas a las dudas más comunes sobre nuestros servicios.
          </p>
        </div>

        {/* Decorative Lines Right - Starting from the edge */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block w-[15%] opacity-90">
          <svg viewBox="0 0 200 120" className="w-full h-auto text-white" stroke="currentColor" fill="none" strokeWidth="4" strokeLinecap="round">
            <line x1="40" y1="25" x2="200" y2="25" />
            <circle cx="40" cy="25" r="6" fill="white" />
            
            <path d="M200 55 H150 L130 35 H40" />
            <circle cx="40" cy="35" r="6" fill="white" />
            
            <line x1="20" y1="85" x2="200" y2="85" />
            <circle cx="20" cy="85" r="6" fill="white" />

            <line x1="100" y1="110" x2="200" y2="110" />
          </svg>
        </div>
      </div>
    </section>
  );
}

