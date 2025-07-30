"use client";

import React from "react";
import styles from "../contacto.module.css";

const Banner = () => (
  <div className={styles.banner}>
    <img className={styles.bannerImg} src="/contactanos/banner.webp" alt="Dos personas trabajando en la computadora" />
    <div className={styles.overlay}>
      <img
        className={styles.iconBanner}
        src="/contactanos/iconContact.svg"
        alt="Icono de contacto"
      />
      <h2 className={styles.titleBanner}>CONTÁCTANOS AHORA</h2>
    </div>
  </div>
);

export default Banner;
