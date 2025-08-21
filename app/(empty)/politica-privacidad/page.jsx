import Image from "next/image";
import logoLegales from "@/public/headerFooter/logoFooter.webp";

export default function Page() {
  return (
    <div>
      {/* Section with logo */}
      <div className='bg-[#6f4be8] flex justify-center items-center'>
        <Image src={logoLegales} className='my-10' alt="Digimedia" width={160} height={120} />
      </div>
      {/* Section text */}
      <section className='flex-grow grid mx-0 p-10 justify-items-center bg-white h-full'>
        <div className='w-full md:w-2/3 border-b mb-4 text-center md:text-left py-4'>
          <h1 className='text-4xl pb-2'>Politicas de Privacidad</h1>
          <p>
            Digimedia marketing se compromete a proteger la privacidad de nuestros usuarios. 
            Esta Política de Privacidad describe cómo recopilamos, usamos y compartimos la 
            información personal que obtenemos a través de nuestro sitio web.
          </p>
        </div>
        <div className='w-full md:w-2/3'>
          <h2 className='text-2xl p-3'>1. Información que Recopilamos</h2>
          <p>Cuando usted visita nuestro sitio, recopilamos cierta información 
            automáticamente, como su dirección IP, tipo de navegador, páginas 
            visitadas, tiempo de visita y otros datos de uso del sitio.
          </p>
          <h2 className='text-2xl p-3'>2. Compartir Información</h2>
          <p>No compartiremos su información personal con terceros, excepto en las siguientes circunstancias:</p>
          <ul className='list-inside list-disc pl-5 space-y-2'>
            <li>Con proveedores de servicios que nos ayudan a operar nuestro sitio web y proporcionar nuestros servicios, como proveedores de alojamiento web, procesadores de pagos y servicios de análisis de datos.</li>
            <li>Cuando sea necesario para cumplir con la ley o proteger nuestros derechos, su seguridad o la seguridad de otro.</li>
          </ul>
          <h2 className='text-2xl p-3'>3. Cookies y Tecnologías Similares</h2>
          <p>Utilizamos cookies y otras tecnologías de seguimiento para mejorar la 
            funcionalidad de nuestro sitio web y para comprender mejor cómo los usuarios
            interactúan con él.
          </p>
          <p className='py-2'>Razón Social: DIIMEDIA MARKETING S.A.C.</p>
          <p className='py-2'>RUC: 20605116559</p>
        </div>
      </section>
    </div>
  );
}
