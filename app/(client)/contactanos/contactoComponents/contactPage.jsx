import { Hero } from '../../components/page_components/Hero';
import { Information } from '../../components/page_components/Information';
import WhatsAppButton from '../../components/WhatsAppButton';
import Banner from './banner';
import ContactForm from './contactForm';
import MainSection from './mainSection';
import SocialMediaLinks from './socialMediaLinks';

const ContactPage = () => (
  <main>
    {/* <Banner /> */}
    <Hero
      backgroundImage="/contactanos/banner.webp"
      title={
        <>
          CONTÁCTANOS <br /> AHORA
        </>
      }
    />
    <Information
      subtitle="SOLUCIONAMOS TUS DUDAS"
      description="Responderemos tus dudas a la brevedad, envíanos un mensaje con tus consultas o dudas."
    />
    <ContactForm />
    <SocialMediaLinks />
    <WhatsAppButton />
    {/* <MainSection /> */}
  </main>
);

export default ContactPage;
