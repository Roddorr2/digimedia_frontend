import ContactHero from "./ContactHero";
import InfoCard from "./InfoCard";
import ContactForm from "./contactForm";
import SocialMediaLinks from "./socialMediaLinks";
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
    <ContactForm />
    <SocialMediaLinks />
    <WhatsAppButton />
    <MayaChatbot />
  </main>
);

export default ContactPage;
