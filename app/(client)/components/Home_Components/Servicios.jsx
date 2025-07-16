import React from 'react';
import Link from 'next/link';

function services() {
    return (
        <section id="services">
            <div className="services-main">
                <div className="services-text">
                    <h2>NUESTROS SERVICIOS</h2>
                    <p>Digimedia es una empresa de marketing digital, que se enfoca en potenciar tu empredimiento a nivel online. Ademas, le brinda a tu empredimiento estrategias que ayuden a cumplir los objetivos de manera eficaz. Somos un grupo de personas comprometidas con el desarollo de cada marca que nos contacta.</p>
                </div>
                <div className="services-4">
                    <div className="services">
                        <Link href="/servicios/desing-desarrollo" className="service">
                            <img src="/image-home/icon1.svg" alt="Icono de una computadora con un pincel de color morado con fondo oscuro" />
                            <h3>Diseño y Desarrollo Web</h3>
                            <p>"Creamos sitios atractivos y funcionales que representan tu marca"</p>
                        </Link>

                        <Link href="/servicios/gestion-redes" className="service">
                            <img src="/image-home/icon2.svg" alt="Icono de una mano con círculos de like, corazón y play color morado con fondo oscuro" />
                            <h3>Gestión de Redes Sociales</h3>
                            <p>"Aumenta tu presencia online y conectamos con tu audiencia"</p>
                        </Link>

                        <Link href="/servicios/branding-desing" className="service">
                            <img src="/image-home/icon3.svg" alt="Icono de grafico a la alza color morado con fondo oscuro" />
                            <h3>Branding y Diseño</h3>
                            <p>"Construimos una identidad visual fuerte y memorable"</p>
                        </Link>

                        <Link href="/servicios/marketing-gestion" className="service">
                            <img src="/image-home/icon4.svg" alt="Icono de un círculo con un lápiz y una regla en cruz de color morado y fondo oscuro" />
                            <h3>Marketing y Gestión Digital</h3>
                            <p>"Aumenta tu presencia en redes sociales y con marketing digital"</p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default services;
