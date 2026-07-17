"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// Orden solicitado: Facebook, TikTok, YouTube, Instagram, LinkedIn.
//
// Diámetro visual común: cada <a> es solo el área clicable (un poco más
// grande, por accesibilidad). Dentro de ella, TODOS renderizan el mismo
// <span> circular (VISUAL_WRAPPER_CLASS, 54/60/68px, rounded-full +
// overflow-hidden + la única sombra) — ese wrapper ES el círculo que el
// usuario ve. Cada logo se escala hasta que su forma coloreada alcanza los
// bordes del wrapper; lo que sobra de lienzo transparente queda recortado
// por el overflow-hidden del propio wrapper, así los 5 círculos visibles
// terminan midiendo exactamente lo mismo sin depender de cuánto margen
// transparente traiga cada PNG.
//
// `fillScale` = cuánto hay que ampliar cada imagen para que su círculo/badge
// no solo llegue, sino que SUPERE el borde del wrapper (medido recortando
// el canal alfa con sharp, más un margen de seguridad). Se aplica con
// `transform: scale()` sobre un span ya del 100% del wrapper (no con
// width/height en %): un span con width/height en % es un flex item dentro
// del wrapper `flex`, y sin `flex-shrink-0` el navegador lo encogía de
// vuelta a su tamaño natural, anulando el aumento — por eso versiones
// anteriores no se veían más grandes pese al `fillScale`. `transform` actúa
// después del layout, así que no sufre ese problema. Una vez que el círculo
// supera el 100% del wrapper, su `overflow-hidden` recorta el excedente y
// el resultado queda relleno de borde a borde — igual de "grande" que el
// 100% que ya usan Instagram (object-cover) e YouTube (el círculo rojo es
// el wrapper mismo):
//   - facebook-icon.png: lienzo 3840x2160 (16:9, no cuadrado), el logo solo
//     llena ~53% de una caja cuadrada → scale(2.0)
//   - tiktok-icon.png: logo ~76% de su lienzo → scale(1.43)
//   - linkedin-icon.png: logo ~60% de su lienzo → scale(1.75)
const socialPlatforms = [
  {
    name: "Facebook",
    image: "/contactanos/facebook-icon.png",
    url: "https://www.facebook.com/DigiMedia.Marketing1",
    fillScale: 2.0,
  },
  {
    name: "TikTok",
    image: "/contactanos/tiktok-icon.png",
    url: "https://www.tiktok.com/@digimedia_marketing",
    fillScale: 1.43,
  },
  {
    name: "YouTube",
    // youtube-icon.png NO tiene canal alfa (fondo blanco cuadrado sólido,
    // confirmado con sharp) y no se puede recortar de forma limpia por CSS
    // sin dejar un borde blanco visible. Se reconstruye con SVG inline (sin
    // dependencias, sin lucide-react, sin PNG): el propio wrapper común
    // pinta el círculo rojo, y encima va la figura blanca + triángulo.
    isYoutube: true,
    url: "https://www.youtube.com/@digimediamarketing",
  },
  {
    name: "Instagram",
    image: "/contactanos/instagram-icon.png",
    url: "https://www.instagram.com/digimediamarketing/",
    cover: true,
  },
  {
    name: "LinkedIn",
    image: "/contactanos/linkedin-icon.png",
    url: "https://www.linkedin.com/company/digimedia-mkt/",
    fillScale: 1.75,
  },
  {
  name: "X",
  image: "/contactanos/twiter-icon.webp", 
  url: "https://x.com/DigimediaMkt",
  cover: true,
  },
  {
    name: "Threads",
    image: "/contactanos/threads-icon.png",
    url: "https://www.threads.net/@TU_USUARIO",
    cover: true,
  },
];

// Área clicable (un poco mayor que el círculo visible, por accesibilidad).
const ICON_HIT_AREA_CLASS =
  "group relative flex items-center justify-center flex-shrink-0 w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] lg:w-[80px] lg:h-[80px] transition-transform duration-300 hover:-translate-y-1 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB800]";

// Círculo visual común a los 5: mismo diámetro exacto y única sombra.
const VISUAL_WRAPPER_CLASS =
  "relative flex items-center justify-center flex-shrink-0 aspect-square overflow-hidden rounded-full shadow-[0_5px_10px_rgba(0,0,0,0.16)] w-[54px] h-[54px] sm:w-[60px] sm:h-[60px] lg:w-[68px] lg:h-[68px]";

// `bare`: cuando el bloque se renderiza embebido dentro del grid de
// contactForm.jsx (columna izquierda, debajo del formulario), no debe traer
// su propia sección/padding/max-w-1280 — ese contenedor ya lo pone el padre,
// y el espaciado vertical hacia el formulario y hacia el footer lo controla
// el grid/gap de contactForm. Sin `bare` (uso standalone), se comporta igual
// que antes.
const SocialMediaLinks = ({ bare = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const content = (
    <div className="w-full max-w-[709px] mx-auto lg:mx-0 text-center lg:text-left">
      {/* Título */}
      <div className="mb-8 md:mb-10">
        <h2
          className="font-[family-name:var(--font-hanken-grotesk)] font-semibold text-[#FFB800] mb-3 md:mb-4"
          style={{ fontSize: "clamp(1.375rem, 1.6vw + 1rem, 2.1875rem)" }}
        >
          TENEMOS REDES SOCIALES
        </h2>
        <p
          className="font-[family-name:var(--font-montserrat)] text-[#CCC3D4] mx-auto lg:mx-0"
          style={{
            fontSize: "clamp(1rem, 0.8vw + 0.75rem, 1.5rem)",
            lineHeight: 1.3,
            maxWidth: "462px",
          }}
        >
          Visita y revisa el contenido de nuestras redes sociales.
        </p>
      </div>

      {/* Iconos */}
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-3.5 lg:gap-4">
        {socialPlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visita nuestro ${platform.name}`}
            className={ICON_HIT_AREA_CLASS}
          >
            <span
              className={`${VISUAL_WRAPPER_CLASS} ${platform.isYoutube ? "bg-[#FF0000]" : ""}`}
            >
              {platform.isYoutube ? (
                // Figura blanca (rectángulo horizontal de esquinas amplias, no
                // cápsula) + triángulo rojo, como el logotipo oficial.
                <svg
                  viewBox="0 0 54 35"
                  style={{ width: "54%", height: "35%" }}
                  aria-hidden="true"
                >
                  <rect x="0" y="0" width="54" height="35" rx="10" ry="10" fill="white" />
                  <polygon points="18,7 18,28 36,17.5" fill="#FF0000" />
                </svg>
              ) : platform.cover ? (
                <Image
                  src={platform.image}
                  alt={`Icono de ${platform.name}`}
                  fill
                  className="object-cover"
                  sizes="68px"
                />
              ) : (
                <span
                  className="relative block w-full h-full"
                  style={{ transform: `scale(${platform.fillScale})` }}
                >
                  <Image
                    src={platform.image}
                    alt={`Icono de ${platform.name}`}
                    fill
                    className="object-contain"
                    sizes="68px"
                  />
                </span>
              )}
            </span>
          </a>
        ))}
      </div>
    </div>
  );

  if (bare) {
    return (
      <motion.div
        ref={ref}
        className="w-full"
        initial={{ opacity: 0, y: "20%" }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2 }}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <motion.section
      ref={ref}
      className="relative w-full pt-4 sm:pt-6 md:pt-8 pb-20 md:pb-24 lg:pb-28 overflow-hidden"
      initial={{ opacity: 0, y: "30%" }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.5 }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        {content}
      </div>
    </motion.section>
  );
};

export default SocialMediaLinks;
