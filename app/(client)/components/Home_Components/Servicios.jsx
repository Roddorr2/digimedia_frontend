import React from "react";
import Link from "next/link";
import styles from "./services.module.css";
import Image from "next/image";

function services() {
  return (
    <section id="services">
      <div className={styles["services-main"]}>
        <div className={styles["services-text"]}>
          <h2>NUESTROS SERVICIOS</h2>
          <p>
            Digimedia es una empresa de marketing digital, que se enfoca en
            potenciar tu emprendimiento a nivel online. Además, brinda
            estrategias que ayudan a cumplir objetivos de manera eficaz. Somos
            un grupo comprometido con el desarrollo de cada marca que nos
            contacta.
          </p>
        </div>

        <div className={styles["services-4"]}>
          <div className={styles.services}>
            {/* Diseño y Desarrollo Web */}
            <Link
              href="/servicios/desing-desarrollo"
              className={`${styles.service} !bg-[#FFA000] !text-[#1e1874]`}
            >
              <Image
                src="/image-home/icon1.svg"
                alt="Icono diseño web"
                width={100}
                height={100}
              />
              <h3 className="!text-[#1E1773]">Diseño y Desarrollo Web</h3>
              <p className="!text-[#1E1773]">
                Creamos sitios atractivos y funcionales que representan tu marca
              </p>
            </Link>

            {/* Gestión de Redes Sociales */}
            <Link
              href="/servicios/gestion-redes"
              className={`${styles.service} !bg-[#1E1773] !text-white`}
            >
              <Image
                src="/image-home/icon2.svg"
                alt="Icono redes sociales"
                width={100}
                height={100}
              />
              <h3 className="!text-white">Gestión de Redes Sociales</h3>
              <p>
                Aumenta tu presencia online y conectamos con tu audiencia
              </p>
            </Link>

            {/* Branding y Diseño */}
            <Link
              href="/servicios/branding-desing"
              className={`${styles.service} !bg-[#b525fe] !text-white`}
            >
              <Image
                src="/image-home/icon3.svg"
                alt="Icono branding"
                width={100}
                height={100}
              />
              <h3 className="!text-white">Branding y Diseño</h3>
              <p>
                Construimos una identidad visual fuerte y memorable
              </p>
            </Link>

            {/* Marketing y Gestión Digital */}
            <Link
              href="/servicios/marketing-gestion"
              className={`${styles.service} !bg-white !text-[#b525fe]`}
            >
              <Image
                width={100}
                height={100}
                src="/image-home/icon4.svg"
                alt="Icono marketing digital"
              />
              <h3 className="!text-[#b525fe]">Marketing y Gestión Digital</h3>
              <p>
                Aumenta tu presencia en redes sociales con marketing digital
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default services;
