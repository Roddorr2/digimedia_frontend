import ContactHero from "./ContactHero";
import InfoCard from "./InfoCard";
import ContactForm from "./contactForm";
import WhatsAppButton from "../../components/WhatsAppButton";
import MayaChatbot from "../../components/Chatbot";

const ContactPage = () => (
  <main
    className="relative w-full overflow-x-hidden"
    style={{
      background: "linear-gradient(143.3deg, #000118 0%, #410C89 50%, #000118 100%)",
    }}
  >
    <ContactHero />
    <InfoCard />
    {/* SocialMediaLinks ahora se renderiza embebido dentro de ContactForm
        (columna izquierda, debajo del formulario) para que la imagen de la
        columna derecha pueda alinearse contra la altura de form+redes juntos. */}
    <ContactForm />
    <WhatsAppButton />
    <MayaChatbot />
  </main>
);

export default ContactPage;
