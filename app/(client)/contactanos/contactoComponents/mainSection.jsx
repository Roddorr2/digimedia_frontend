"use client";

import ContactForm from "./contactForm";
import SocialMediaLinks from "./socialMediaLinks";
import { motion } from "framer-motion";
import styles from "../contacto.module.css";
import Image from "next/image";

const MainSection = () => (
  <section className={styles.mainSection}>
    <div className={styles.firstContent}>
      <h2>
        <b className={styles.subtitle}>
          <span className={styles.sectionLine}>—</span> Solucionamos tus dudas
        </b>
      </h2>
      <p className={styles.textContent}>
        Responderemos tus dudas a la brevedad, envíanos un mensaje con tus consultas o dudas.
      </p>
    </div>

    <div className={styles.secondContent}>
      <ContactForm />
      <motion.div
        className={styles.srta}
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        style={{ overflow: "hidden" }}
      >
        <Image src="/contactanos/srta.webp" alt="srta hablando por telefono" width={300} height={300} />
      </motion.div>
    </div>

    <br />

    <div className={styles.firstContent}>
      <h2>
        <b className={styles.subtitle}>
          <span className={styles.sectionLine}>—</span> Tenemos redes sociales
        </b>
      </h2>
      <p className={styles.textContent}>
        Visita y revisa el contenido de nuestras redes sociales.
      </p>
    </div>

    <SocialMediaLinks />
  </section>
);

export default MainSection;
