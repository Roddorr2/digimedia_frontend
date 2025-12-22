import Link from 'next/link';
import styles from './Footer.module.css';
import Image from 'next/image';

export default function Footer() {
  return (
    <>
      <footer>
        <div className={styles.mainFooter}>
          <div className={styles.footerContenido}>
            <div className={`${styles.imgFooter} my-4`}>
              <Image
                src="/headerFooter/logoFooter.webp"
                alt="Logo DigiMedia Marketing con fondo oscuro"
                width={250}
                height={120}
              />
            </div>
            <div className={`${styles.contactoFooter} ${styles.listaFooter}`}>
              <h2>Contacto</h2>
              <ul>
                <li>
                  <Link
                    href="https://wa.me/983027828?text=Hola, me gustaría obtener más información sobre sus servicios."
                    target="_blank"
                  >
                    <Image
                      src="/headerFooter/phone.webp"
                      alt="Icono de teléfono de color blanco con fondo oscuro"
                      width={24}
                      height={24}
                    />
                    983 027 828
                  </Link>
                </li>
                <li>
                  <Link href="mailto:digimediamkt@gmail.com" target="_blank">
                    <Image
                      src="/headerFooter/correo.webp"
                      alt="Icono de correo color blanco con fondo oscuro"
                      width={24}
                      height={24}
                    />
                    digimediamkt@gmail.com
                  </Link>
                </li>
                <li>
                  <Link href="https://maps.app.goo.gl/T8D8KJT3mWworgCo7">
                    <Image
                      src="/headerFooter/location.webp"
                      alt="Icono de Ubicación color blanco con fondo oscuro"
                      width={24}
                      height={24}
                    />
                    Jr. Paruro 1401, Cercado de Lima - Lima
                  </Link>
                </li>
              </ul>
            </div>
            <div className={`${styles.legalesFooter} ${styles.listaFooter}`}>
              <h2>Legales</h2>
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
              <h3>Redes Sociales</h3>
              <ul>
                <li>
                  <Link
                    href="https://www.tiktok.com/@digimediamkt"
                    target="_blank"
                  >
                    <Image
                      src="/headerFooter/tiktok.webp"
                      alt="Icono de TikTok color blanco con fondo oscuro"
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
                      src="/headerFooter/instagram.webp"
                      alt="Icono de Instagram color blanco con fondo oscuro"
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
                      src="/headerFooter/youtube.webp"
                      alt="Icono de YouTube color blanco con fondo oscuro"
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
                      src="/headerFooter/linkedin.webp"
                      alt="Icono de Linkedin color blanco con fondo oscuro"
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
                      src="/headerFooter/facebook.webp"
                      alt="Icono de Facebook color blanco con fondo oscuro"
                      width={24}
                      height={24}
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.barraFooter}>
            <hr />
          </div>
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
      </footer>
    </>
  );
}
