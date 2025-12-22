import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./services.module.css";

export default function Servicios() {
  return (
    <section className={styles.servicesMain} id="services">
      {/* Contenedor del encabezado con el desfase solicitado */}
      <div className={styles.servicesHeader}>
        <h2>NUESTROS SERVICIOS</h2>
        <p>
          Digimedia es una empresa de marketing digital que impulsa emprendimientos en línea mediante estrategias eficaces, enfocada en el crecimiento y desarrollo de cada marca.
        </p>
      </div>

      <div className={styles.servicesLayout}>
        {/* CARD MORADA IZQUIERDA */}
        <Link href="/servicios/desing-desarrollo" className={`${styles.serviceCard} ${styles.purple}`}>
          <Image src="/image-home/diseño.png" alt="Icono diseño" width={150} height={160} />
          <h3>DISEÑO Y <br /> DESARROLLO WEB</h3>
          <p>Creamos sitios atractivos y <br /> funcionales que representan <br /> tu marca.</p>
        </Link>

        {/* COLUMNA CENTRAL NARANJA */}
        <div className={styles.middleColumn}>
          <Link href="/servicios/gestion-redes" className={`${styles.serviceCard} ${styles.orange}`}>
            <div className={styles.textContent}>
              <h3>GESTIÓN DE REDES <br /> SOCIALES</h3>
              <p>Aumenta tu presencia <br /> online y conectamos<br /> con tu audiencia.</p>
            </div>
            <Image src="/image-home/redessociales.png" alt="Redes" width={100} height={100} />
          </Link>

          <Link href="/servicios/branding-desing" className={`${styles.serviceCard} ${styles.orange}`}>
            <div className={styles.textContent}>
              <h3>BRANDING Y <br /> DISEÑO</h3>
              <p>Construimos una <br />identidad fuerte y <br />memorable.</p>
            </div>
            <Image src="/image-home/branding.png" alt="Branding" width={120} height={120} />
          </Link>
        </div>

        {/* CARD MORADA DERECHA */}
        <Link href="/servicios/marketing-gestion" className={`${styles.serviceCard} ${styles.purple}`}>
          <Image src="/image-home/marketingdigital.png" alt="Marketing" width={125} height={125} />
          <h3>MARKETING Y <br /> GESTIÓN DIGITAL</h3>
          <p>Aumenta tu presencia en <br /> redes sociales con <br /> marketing digital.</p>
        </Link>
      </div>
    </section>
  );
}
