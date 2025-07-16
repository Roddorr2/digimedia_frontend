"use client";

import React from "react";

const Banner = () => (
  <div className="banner">
    <img id="bannerImg" src="/contactanos/banner.webp" alt="Dos personas trabajando en la computadora" />
    <div className="overlay">
        <img
          className="iconBanner"
          src="/contactanos/iconContact.svg"
          alt="Icono de contacto"
        />
      <h2 className="titleBanner">CONTÁCTANOS AHORA</h2>
    </div>
  </div>
);

export default Banner;
