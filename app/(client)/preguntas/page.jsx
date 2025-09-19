'use client'

import { useState } from "react"
import Principal from "./components/Principal"
import Pregunta from "./components/Pregunta"


export default function Page() {
  const data = [
    {
      question: "¿Cómo me ayuda una agencia de marketing digital a vender más?",
      answer: "Estamos convencidos que los principales propósitos de una agencia de marketing digital son: mejorar el posicionamiento de una marca y aumentar la rentabilidad, haciendo uso de diferentes herramientas y estrategias de comunicación, diseño y contenido eligiendo los canales correctos para su difusión y efectividad."
    },
    {
      question: "¿Cómo pueden ayudar a mi empresa a mejorar su presencia en línea?",
      answer: "Nuestros servicios de marketing digital están diseñados para ayudar a las empresas a mejorar su presencia en línea a través de estrategias efectivas de SEO, publicidad en línea, marketing de contenido, marketing de redes sociales y más."
    },
    {
      question: "¿Cuál es la diferencia entre diseño web y desarrollo web?",
      answer: "La diferencia entre diseño y desarrollo web puede ser confusa, pero en resumen, el desarrollo web se refiere a la creación de sitios y aplicaciones web, mientras el diseño web es responsable de la estética y la usabilidad del sitio, ambas se complementan para crear un sitio web exitoso que atraiga tráfico y generen conversiones."
    },
    {
      question: "¿Cuál es la diferencia entre una agencia de publicidad y agencia de marketing digital?",
      answer: "Una agencia de marketing digital ofrece un servicio más integral, así como la de producción en diferentes canales de comunicación digital. Entre los servicios que destacan están el diseño, branding, gestión de redes sociales, posicionamiento web, entre otros. Mientras una agencia de publicidad tiene como finalidad el desarrollo de una campaña de comunicación con un objetivo específico, marcando una ruta de acción que no solo indique la idea y mensaje creativo sino también los canales de comunicación para su correcta difusión y efectividad."
    },
    {
      question: "¿Por qué es importante la creación de tu marca?",
      answer: "Una marca te diferencia de la competencia, permite posicionarte en la mente de tus consumidores, refleja la personalidad de tu empresa y transmite tus valores."
    },
    {
      question: "¿Por qué refrescar mi marca?",
      answer: "Cuando queremos comunicar un nuevo mensaje y una renovación profunda es importante hacerlo desde las bases, un cambio en tu marca creará un pensamiento de transformación en la mente de tus clientes."
    },
    {
      question: "¿Cómo se mide el éxito de la marca corporativa?",
      answer: "Medir la marca corporativa es una tarea compleja. Se trata de evaluar la percepción que tienen los clientes potenciales y actuales de la marca, así como el impacto que tiene en el mercado. Para medir la marca corporativa de manera efectiva, es importante considerar una variedad de factores, desde las menciones en las redes sociales hasta la cantidad de tráfico web que genera la marca."
    },
    {
      question: "¿Con qué frecuencia debo publicar en redes sociales?",
      answer: "La frecuencia con la que debes publicar en las redes sociales depende de varios factores, incluyendo el tipo de red social, el objetivo de la campaña de marketing digital y el público objetivo, pero hay que tener en cuenta que publicar con demasiada frecuencia puede resultar en un alto nivel de engagement, mientras que publicar con poca frecuencia puede hacer que se pierda la oportunidad de llegar a un número significativo de personas."
    },
    {
      question: "¿Cuáles son las herramientas de Marketing en las redes sociales?",
      answer: "Existe una gran variedad de herramientas de marketing en redes sociales disponibles para ayudar a las empresas a maximizar su impacto. Algunas de las herramientas incluyen el marketing de contenido, el marketing de influencers, el marketing de anuncios y la analítica. Cada una de estas herramientas tiene sus propias ventajas y desventajas, por lo que es importante seleccionar las que mejor se adapten a las necesidades de la empresa."
    },
    {
      question: "¿Qué es SEO?",
      answer: "El SEO implica optimizar tanto el contenido como la estructura del sitio web para que coincida con las consultas de los usuarios. También puede incluir el marketing de contenidos orientado a atraer tráfico de calidad desde un motor de búsqueda (como Google, Bing o Yahoo) o desde fuentes externas, como las redes sociales."
    },
    {
      question: "¿Qué ventajas aporta la inversión publicitaria online?",
      answer: "La publicidad online ofrece una serie de ventajas sobre otros medios publicitarios convencionales, como la televisión, la radio o el periódico. Pero las principales son: Es más económica la publicidad online. Permite llegar a clientes potencialmente más eficientemente. Puedes medir el impacto de las campañas y ajustarlas en función de los resultados."
    }
  ]
  

  // Group questions into categories for better organization
  const categories = [
    { name: "Marketing Digital", items: [0, 1, 8, 10] },
    { name: "Diseño y Desarrollo", items: [2] },
    { name: "Branding", items: [4, 5, 6] },
    { name: "Estrategia", items: [3, 7, 9] }
  ]

  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <Principal />
    
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
       <div className="flex overflow-x-auto py-4 scrollbar-hide gap-3 px-4 lg:justify-center">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeCategory === index
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-200"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Agreagamos el titulo de cada categoría */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8 text-center">
          {categories[activeCategory].name}
        </h2>

        <div className="grid grid-cols-1 gap-8">
          {categories[activeCategory].items.map((itemIndex) => (
            <Pregunta 
              key={itemIndex}
              question={data[itemIndex].question} 
              answer={data[itemIndex].answer}
            />
          ))}
        </div>
      </section>
      
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl p-8 sm:p-12 shadow-xl text-center">
          <h2 className="text-white text-2xl sm:text-3xl font-medium mb-4">¿No encuentras la respuesta que buscas?</h2>
          <p className="text-teal-50 mb-8 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Contáctanos directamente y un especialista responderá todas tus dudas.
          </p>
          <a href="https://wa.me/983027828?text=Hola, quisiera realizar una pregunta sobre su negocio." className="bg-white text-teal-600 px-8 py-3 rounded-full font-medium hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Contáctanos
          </a>
        </div>
      </div>
    </div>
  )
}
