"use client";

import React from "react";
import styles from "../contacto.module.css";
import Image from "next/image";

const Banner = () => (
  <div className={styles.banner}>
    <Image
      loading = "lazy"
      className={styles.bannerImg}
      src="/contactanos/banner.webp"
      alt="Dos personas trabajando en la computadora"
      layout="fill"
      objectFit="cover"
    />
    <div className={styles.overlay}>
      <Image
        className={styles.iconBanner}
        src="/contactanos/iconContact.svg"
        alt="Icono de contacto"
        width={50}
        height={50}
      />
      <h1 className={styles.titleBanner}>CONTÁCTANOS AHORA</h1>
    </div>
  </div>
);

export default Banner;
