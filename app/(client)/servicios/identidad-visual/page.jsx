import Image from "next/image";
import Contactanos from "../components/Contactanos";
import { UxUiSection } from "../components/uxui-section";
import WhatsAppButton from "../../components/WhatsAppButton";
import MayaChatbot from "../../components/MayaChatbot";

export default function IdentidadVisualCorporativa() {
  const featuresuxui = [
    {
      icon: (
        <Image
          // src="/servicios/marketing_gestion_digital/identidad_visual/icons/identidad-visual_card1-IVC.webp"
          src="/servicios/marketing_gestion_digital/identidad_visual/icons/concepto-creativo-identidad-visual-digimedia.webp"
          title="Concepto creativo e identidad visual | Digimedia Marketing"
          alt=" Ícono de bombilla representando concepto creativo y desarrollo de identidad visual"
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      ),
      title: "IVC",
      description:
        "A través de ella comunicaremos su personalidad, valores y propuesta de valor, estableciendo un posicionamiento claro y distintivo en la mente de sus clientes.",
    },
  ];

  return (
    <div>
      {/* Servicio: Marketing y Gestión Digital, Subservicio: Identidad Visual y Corporativa */}

      <UxUiSection
        features={featuresuxui}
        mainDescription="Desarrollamos la manifestación visual de su marca, creando un sistema gráfico coherente que incluye logotipos, colores y tipografías. Esta identidad estratégica asegura el reconocimiento, la diferenciación y el posicionamiento de su empresa en el mercado."
        backgroundImage="/servicios/DisenoUI/Identidad-visual-y-corporativa.webp"
        heroTitle=<>
          IDENTIDAD VISUAL <br />Y CORPORATIVA
        </>
        category="Marketing y gestión digital"
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
      <WhatsAppButton />
      <MayaChatbot />
    </div>
  );
}
