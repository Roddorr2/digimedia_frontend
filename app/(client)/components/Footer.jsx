import Link from 'next/link';
import './Footer.css';

export default function Footer() {
  return (
    <>
      <footer>
        <div className="mainFooter">
          <div className="footerContenido">
            <div className="imgFooter my-4">
              <img
                src="/headerFooter/logoFooter.webp"
                alt="Digimedia"
                width="250px"
                height="120px"
                loading="lazy"
              /> 
            </div>
            <div className="contactoFooter listaFooter">
              <h3>Contacto</h3>
              <ul>
                <li>
                  <Link href="https://wa.me/983027828?text=Hola, me gustaría obtener más información sobre sus servicios." target="_blank">
                    <img
                      src="/headerFooter/phone.webp"
                      alt="Celular"
                      width="24px"
                      height="24px"
                    />
                    983 027 828
                  </Link>
                </li>
                <li>
                  <Link href="mailto:digimediamkt@gmail.com" target="_blank">
                    <img
                      src="/headerFooter/correo.webp"
                      alt="Correo"
                      width="24px"
                      height="24px"
                    />
                    digimediamkt@gmail.com
                  </Link>
                </li>
                <li>
                  <Link href="https://maps.app.goo.gl/T8D8KJT3mWworgCo7">
                    <img
                      src="/headerFooter/location.webp"
                      alt="Ubicacion"
                      width="24px"
                      height="24px"
                    />
                    Jr. Paruro 1401, Cercado de Lima - Lima
                  </Link>
                </li>
              </ul>
            </div>
            <div className="legalesFooter listaFooter">
              <h3>Legales</h3>
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
                  <Link href="/reclamaciones">
                    Libro de reclamaciones
                  </Link>
                </li>
                
                <li>
                  <Link href="/nosotros">
                  Trabaja con nosotros
                  </Link>
                </li>
              </ul>
            </div>
            <div className="redesFooter listaFooter">
              <h3>Redes Sociales</h3>
              <ul>
                <li>
                  <Link
                    href="https://www.tiktok.com/@digimediamkt"
                    target="_blank"
                  >
                    <img
                      src="/headerFooter/tiktok.webp"
                      alt="tiktok"
                      width="24px"
                      height="24px"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/digimediamkt/"
                    target="_blank"
                  >
                    <img
                      src="/headerFooter/instagram.webp"
                      alt="Instagram"
                      width="24px"
                      height="24px"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/@digimediamarketing"
                    target="_blank"
                  >
                    <img
                      src="/headerFooter/youtube.webp"
                      alt="YouTube"
                      width="24px"
                      height="24px"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/company/digimedia-mkt/"
                    target="_blank"
                  >
                    <img
                      src="/headerFooter/linkedin.webp"
                      alt="Linkedin"
                      width="24px"
                      height="24px"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.facebook.com/DigiMedia.Marketing1"
                    target="_blank"
                  >
                    <img
                      src="/headerFooter/facebook.webp"
                      alt="Facebook"
                      width="24px"
                      height="24px"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="barraFooter">
            <hr />
          </div>
          <div className="rucFooter text-white">
            <div className="ruc">
              <p>RUC: 20605116559</p>
            </div>
            <div className="derechosFooter">
              <p>@digimedia.com. Derechos reservados</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}