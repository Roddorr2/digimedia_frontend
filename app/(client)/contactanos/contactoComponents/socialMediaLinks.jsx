"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
// Importa el componente y los iconos que vas a usar
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";

import styles from "../contacto.module.css";


const SocialMediaLinks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={styles.formContainer}
      initial={{ opacity: 0, y: "30%" }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.5 }}
      style={{ overflow: "hidden" }}
    >
      <div className={styles["tarjeta-redes"]}>
        <h3>Conéctate con nosotros</h3>
        <div className={styles["contenedor-redes"]}>
          <div className={styles.red}>
            <a href="https://www.facebook.com/DigiMedia.Marketing1" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
          </div>
          <div className={styles.red}>
            <a href="https://www.instagram.com/digimediamkt/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
          <div className={styles.red}>
            <a href="https://www.linkedin.com/company/digimedia-mkt/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </div>
          <div className={styles.red}>
            <a href="https://www.tiktok.com/@digimediamkt" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTiktok} size="2x" />
            </a>
          </div>
          <div className={styles.red}>
            <a href="https://www.youtube.com/@digimediamarketing" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SocialMediaLinks;
