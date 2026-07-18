import Image from "next/image";
import logoLegales from "@/public/headerFooter/logoFooter.webp";

export const metadata = {
  title: "Términos y Condiciones - DigiMedia",
  description:
    "Consulta los términos y condiciones de uso de los servicios de marketing digital, diseño web y branding de Digimedia Marketing.",
  alternates: {
    canonical: "https://digimedia-marketing.com/terminos-condiciones/",
  },
};

export default function Page() {
  return (
    <div className='h-screen'>
      {/* Section with logo */}
      <div className='bg-gradient-to-r from-[#1e033f] from-80%  to-[#410C89] flex justify-center items-center'>
        <Image src={logoLegales} className='my-10' alt="Digimedia" width={160} height={120} />
      </div>
      {/* Section text */}
      <section className='flex-grow grid mx-0 p-10 justify-items-center bg-legales'>
          <div className='w-full md:w-2/3 border-b mb-4 text-center md:text-left py-4'>
              <h1 className='text-4xl pb-2'>Terminos y Condiciones</h1>
              <p>
                  El uso del sitio web de la Agencia de Marketing Digimedia está sujeto 
                  a los siguientes Términos y condiciones. De no estar de acuerdo con 
                  todos los puntos señalados a continuación, por favor, no continúe 
                  utilizando este sitio web.
              </p>
              <p className='font-bold py-3'>
                Actualizado, el 19 de marzo del 2024
              </p>
          </div>
          <div className='w-full md:w-2/3'>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <span className="font-bold text-black">Descripción de los Servicios:</span>
                  <span className="text-gray-700">La Agencia de Marketing DigiMedia proporcionará servicios de marketing digital, incluyendo pero no limitado a estrategias de redes sociales, SEO, publicidad en línea y creación de contenido, según lo acordado con el cliente en el contrato correspondiente.</span>
                </li>
                <li>
                  <span className="font-bold text-black">Responsabilidades del Cliente:</span>
                  <span className="text-gray-700">El Cliente deberá proporcionar acceso oportuno a la información, cuentas y materiales necesarios para la ejecución de los servicios acordados. Además, el Cliente será responsable de revisar y aprobar el contenido y las estrategias propuestas en un plazo acordado.</span>
                </li>
                <li>
                  <span className="font-bold text-black">Pago y Facturación:</span>
                  <span className="text-gray-700">El cliente coordina pagar a Digimedia según los términos acordados en el contrato. En caso de retraso en el pago, Digimedia se reserva el derecho de suspender los servicios hasta recibir el pago completo.</span>
                </li>
                <li>
                  <span className="font-bold text-black">Propiedad Intelectual:</span>
                  <span className="text-gray-700">Todo el contenido creado por Digimedia en el curso de la prestación de servicios será propiedad exclusiva del cliente una vez que se haya completado el pago correspondiente.</span>
                </li>
                <li>
                  <span className="font-bold text-black">Confidencialidad:</span>
                  <span className="text-gray-700">Ambas partes acuerdan mantener la confidencialidad de la información comercial y estratégica intercambiada durante la relación comercial.</span>
                </li>
                <li>
                  <span className="font-bold text-black">Limitación de Responsabilidad:</span>
                  <span className="text-gray-700">Digimedia no será responsable de pérdidas o daños indirectos, incidentales, especiales o consecuentes derivados del uso de los servicios, salvo en casos de negligencia grave o incumplimiento deliberado.</span>
                </li>
                <li>
                  <span className="font-bold text-black">Modificaciones en los Términos:</span>
                  <span className="text-gray-700">Digimedia se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios entrarán en vigencia una vez que se publiquen en nuestro sitio web.</span>
                </li>
                <li>
                  <span className="font-bold text-black">Legislación Aplicable:</span>
                  <span className="text-gray-700">Estos términos y condiciones se regirán e interpretarán de acuerdo a las leyes del estado peruano, y cualquier disputa estará sujeta a la jurisdicción exclusiva de los tribunales de Lima-Perú.</span>
                </li>
              </ol>
          </div>
      </section>
    </div>
  );
}