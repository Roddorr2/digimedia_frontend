"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import Image from 'next/image';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    const email = "digi.mediamkt@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Datos estructurados con los hipervínculos basados en tu Excel
  const serviciosData = [
    {
      title: "DISEÑO Y DESARROLLO WEB",
      route: "/servicios/desing-desarrollo/",
      items: [
        { name: "Experiencia de Usuario y Diseño", route: "/servicios/experiencia-usuario/" },
        { name: "Dominio y Hosting", route: "/servicios/dominio_hosting/" },
        { name: "Optimización SEO", route: "/servicios/seo/" },
        { name: "Desarrollo Responsive", route: "/servicios/seo/" },
        { name: "Landing Page", route: "/servicios/landing-page/" },
      ]
    },
    {
      title: "GESTIÓN DE REDES SOCIALES",
      route: "/servicios/gestion-redes/",
      items: [
        { name: "Estrategia de Contenido", route: "/servicios/planificacion-cronograma/" },
        { name: "Social Ads & Performance", route: "/servicios/diseno-pautas/" },
        { name: "Diseño UX y UI", route: "/servicios/ui/?from=gestionRedes" },
      ]
    },
    {
      title: "MARKETING Y GESTIÓN DIGITAL",
      route: "/servicios/marketing-gestion/",
      items: [
        { name: "Análisis y Benchmarking", route: "/servicios/analisis-y-benchmarking/" },
        { name: "Campañas Digitales", route: "/servicios/naming-logo-slogan/" },
        { name: "Identidad Visual y Corporativa", route: "/servicios/identidad-visual/" },
        { name: "Análisis de Métricas", route: "/servicios/manual-marca/" },
      ]
    },
    {
      title: "BRANDING Y DISEÑO",
      route: "/servicios/branding-desing/",
      items: [
        { name: "Desarrollo de Brief", route: "/servicios/desarrollo-briefs/" },
        { name: "Planificación Estratégica", route: "/servicios/planificacion-estrategica/" },
        { name: "Diseño de Logo", route: "/servicios/publicidad-digital/" },
        { name: "Manual de Marca", route: "/servicios/monitoreo-y-reporting/" },
      ]
    }
  ];

  return (
    <>
      <footer>
        <div className={styles.mainFooter}>
          <div className={styles.footerInner}>
            
            {/* --- MEGA FOOTER: SERVICIOS Y SUBSERVICIOS --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full border-b border-white/20 pb-10 mb-10 pt-4">
              {serviciosData.map((servicio, index) => (
                <div key={index} className={styles.listaFooter}>
                  <h2>
                    <Link href={servicio.route} className="hover:text-white/80 transition-colors">
                      {servicio.title}
                    </Link>
                  </h2>
                  <ul>
                    {servicio.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-white/70 mr-2 font-bold">›</span>
                        {/* Ahora usa la ruta directa independiente */}
                        <Link 
                          href={item.route}
                          className="hover:text-white/80 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {/* ------------------------------------------------------- */}

            <div className={styles.footerContenido}>
              <div className={`${styles.imgFooter}`}>
                <Image
                  src="/headerFooter/digimedia-agencia-marketing-digital-peru-logo-morado(1).svg"
                  alt="Logo Digimedia Marketing Digital Perú"
                  width={320}
                  height={160}
                  className="my-auto"
                  sizes="320px"
                />
              </div>
              <div className={`${styles.contactoFooter} ${styles.listaFooter}`}>
                <h2>CONTACTO</h2>
                <ul>
                  <li>
                    <Link
                      href="https://wa.me/983027828?text=Hola, me gustaría obtener más información sobre sus servicios."
                      target="_blank"
                    >
                      <Image
                        src="/headerFooter/icono-telefono-digimedia.webp"
                        alt="Ícono de teléfono para contactar a Digimedia"
                        title="Teléfono de contacto Digimedia"
                        width={24}
                        height={24}
                      />
                      983 027 828
                    </Link>
                  </li>
                  <li className={styles.emailContainer}>
                    <div 
                      onClick={handleCopyEmail} 
                      className={`${styles.emailLink} cursor-pointer`}
                      title="Haz clic para copiar el correo"
                    >
                      <Image
                        src="/headerFooter/icono-correo-digimedia.webp"
                        alt="Ícono de correo electrónico para contactar a Digimedia"
                        title="Correo electrónico Digimedia"
                        width={24}
                        height={24}
                      />
                      digi.mediamkt@gmail.com
                      {copied && (
                        <span className={styles.copiedTooltip}>¡Copiado!</span>
                      )}
                    </div>
                  </li>
                  <li>
                    <Link href="https://maps.app.goo.gl/T8D8KJT3mWworgCo7">
                      <Image
                        src="/headerFooter/icono-ubicacion-digimedia.webp"
                        alt="Ícono de ubicación de la oficina de Digimedia en Perú"
                        title="Ubicación Digimedia Perú"
                        width={24}
                        height={24}
                      />
                      Jr. Paruro 1401, Cercado de Lima - Lima
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={`${styles.legalesFooter} ${styles.listaFooter}`}>
                <h2>LEGALES</h2>
                <ul>
                  <li>
                    <Link href="/politica-privacidad">
                      Política de privacidad
                    </Link>
                  </li>
                  <li>
                    <Link href="/terminos-condiciones">
                      Términos y Condiciones
                    </Link>
                  </li>
                  <li>
                    <Link href="/reclamaciones">Libro de reclamaciones</Link>
                  </li>

                  <li>
                    <Link href="/nosotros">Trabaja con nosotros</Link>
                  </li>
                </ul>
              </div>
              <div className={`${styles.redesFooter} ${styles.listaFooter}`}>
                <h2>REDES SOCIALES</h2>
                <ul>
                  <li>
                    <Link
                      href="https://www.tiktok.com/@digimedia_marketing"
                      target="_blank"
                    >
                      <Image
                        src="/headerFooter/icono-tiktok-digimedia.webp"
                        alt="Ícono de TikTok con enlace al perfil oficial de Digimedia"
                        title="TikTok Digimedia"
                        width={24}
                        height={24}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.instagram.com/digimediamkt/"
                      target="_blank"
                    >
                      <Image
                        src="/headerFooter/icono-instagram-digimedia.webp"
                        alt="Ícono de Instagram con enlace al perfil oficial de Digimedia"
                        title="Instagram Digimedia"
                        width={24}
                        height={24}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.youtube.com/@digimediamarketing"
                      target="_blank"
                    >
                      <Image
                        src="/headerFooter/icono-youtube-digimedia.webp"
                        alt="Ícono de YouTube con enlace al canal oficial de Digimedia"
                        title="YouTube Digimedia"
                        width={24}
                        height={24}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.linkedin.com/company/digimedia-mkt/"
                      target="_blank"
                    >
                      <Image
                        src="/headerFooter/linkedln-digimedia-icono-redes-sociales.webp"
                        alt="Ícono del logo de la cuenta de LinkedIn de Digimedia que aparece al final de la página web"
                        title="LinkedIn de Digimedia"
                        width={24}
                        height={24}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.facebook.com/DigiMedia.Marketing1"
                      target="_blank"
                    >
                      <Image
                        src="/headerFooter/icono-facebook-digimedia.webp"
                        alt="Ícono de Facebook con enlace al perfil oficial de Digimedia"
                        title="Facebook Digimedia"
                        width={24}
                        height={24}
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.barraFooter}>
            <hr />
          </div>

          <div className={styles.footerInner}>
            <div className={`${styles.rucFooter} text-white`}>
              <div className={`${styles.ruc}`}>
                <p>RUC: 20605116559</p>
              </div>
              <div className={styles.derechosFooter}>
                <p>
                  © {new Date().getFullYear()} Digimedia. Todos los derechos
                  reservados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}