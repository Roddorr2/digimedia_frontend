"use client";
import { useMemo } from "react";
import {
  Clock,
  ArrowRight,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";

// Configuración de plantillas
import { getPlantillaConfig } from "../../config/index";

/**
 * TemplateRenderer - Renderizador dinámico de blogs según plantilla y datos
 * 
 * Este componente toma los datos del blog y la plantilla seleccionada para
 * renderizar una vista previa en tiempo real del blog final.
 *
 * @param {number} plantillaId - ID de la plantilla a usar (1, 2, 3)
 * @param {object} blogData - Datos completos del blog
 * @param {object} blogData.header - Datos del header (formEncabezadoHeader + formImagenHeader)
 * @param {object} blogData.body - Datos del body con todas las sub-secciones
 * @param {object} blogData.footer - Datos del footer (formEncabezadoFooter + formImagenFooter)
 * @param {string} mode - Modo de renderizado: 'preview' | 'published'
 * @param {boolean} showPlaceholders - Si mostrar placeholders para datos vacíos
 * @param {string} className - Clases CSS adicionales
 */
export default function TemplateRenderer({
  plantillaId = 1,
  blogData = {},
  mode = "preview",
  showPlaceholders = true,
  className = "",
}) {
  // Obtener configuración de la plantilla
  const plantillaConfig = getPlantillaConfig(plantillaId);
  const { layoutType, styles = {}, sectionsConfig = {} } = plantillaConfig;

  // Destructurar datos del blog con valores por defecto
  const {
    header = {},
    body = {},
    footer = {},
  } = blogData;

  // Datos específicos del body
  const {
    header: bodyHeader = {},
    consejos = {},
    galeria = {},
    informacion = [],
  } = body;

  // Obtener colores de fondo por sección
  const headerBgColor = header.bg_color || "#1E40AF";
  const headerBgType = header.bg_type || "solid";
  const headerBgColors = header.bg_colors || "";
  const bodyBgColor = bodyHeader.bg_color || "#5A37A6";
  const bodyBgType = bodyHeader.bg_type || "solid";
  const bodyBgColors = bodyHeader.bg_colors || "";
  const footerBgColor = footer.bg_color || "#374151";
  const footerBgType = footer.bg_type || "solid";
  const footerBgColors = footer.bg_colors || "";

  const getBackgroundStyle = (bgColor, bgType, bgColors) => {
    if (bgType === "gradient" && bgColors) {
      const colors = bgColors.split(",").map(c => c.trim()).filter(Boolean);
      if (colors.length >= 2) {
        if (colors.length >= 3) {
          return { backgroundImage: `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})` };
        }
        return { backgroundImage: `linear-gradient(to right, ${colors[0]}, ${colors[1]})` };
      }
    }
    return { backgroundColor: bgColor };
  };

  const headerBgStyle = getBackgroundStyle(headerBgColor, headerBgType, headerBgColors);
  const bodyBgStyle = getBackgroundStyle(bodyBgColor, bodyBgType, bodyBgColors);
  const footerBgStyle = getBackgroundStyle(footerBgColor, footerBgType, footerBgColors);


  // Verificar visibilidad de secciones según flags
  const sectionsVisibility = useMemo(() => ({
    header: true, // Header siempre visible
    consejos: bodyHeader.flag_consejos ?? true,
    galeria: bodyHeader.flag_galeria ?? true,
    informacion: bodyHeader.flag_informacion ?? true,
    footer: footer.estado ?? false,
  }), [bodyHeader.flag_consejos, bodyHeader.flag_galeria, bodyHeader.flag_informacion, footer.estado]);


 const renderHeaderSection = () => {
  const headerData = header || {};
  const imageUrl = headerData.public_image || "/blog/blog-4.webp";

  return (
    <div className="relative h-[520px] overflow-hidden rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.25)]">
      
      <img
        src={imageUrl}
        alt={headerData.alt || "Imagen principal"}
        className="w-full h-full object-cover scale-[1.05] opacity-90"
      />

      
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/10"></div>

     
      <div className="absolute bottom-0 left-0 right-0 p-12">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-xl leading-tight tracking-tight">
          {headerData.titulo || "Título Principal Elegante"}
        </h1>

        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mt-6 leading-relaxed">
          {headerData.texto_frase || "Una frase impactante y memorable"}
        </p>

        <p className="text-lg text-gray-200 max-w-4xl mt-4 leading-relaxed">
          {headerData.texto_descripcion ||
            "Descripción envolvente del contenido del blog con un tono profesional"}
        </p>

        <div className="mt-6 w-24 h-1 bg-yellow-400 rounded-full"></div>
  
         
          {layoutType === "tabs" && (
            <div className="flex items-center space-x-4 text-gray-300 text-sm">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{bodyHeader.fecha || "Fecha de publicación"}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };


  const renderBodyHeaderSection = () => {
    if (!bodyHeader.titulo && !showPlaceholders) return null;

    return (
      <div className="relative h-[400px] overflow-hidden rounded-lg shadow-lg mb-8">
        <img
          src={bodyHeader.public_image1 || "/blog/blog-4.webp"}
          alt={bodyHeader.alt_image1 || bodyHeader.titulo || "Imagen del cuerpo"}
          title={bodyHeader.title_image1}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {bodyHeader.titulo || (showPlaceholders ? "Título del Cuerpo" : "")}
          </h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            {bodyHeader.descripcion || (showPlaceholders ? "Descripción del contenido principal" : "")}
          </p>
          {layoutType !== "tabs" && (
            <div className="flex items-center mt-4 text-gray-300 text-sm">
              <Clock className="w-4 h-4 mr-2" />
              <span>{bodyHeader.fecha || "Fecha de publicación"}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Renderizar sección de consejos
  const renderConsejosSection = () => {
    if (!sectionsVisibility.consejos) return null;

    const maxConsejos = plantillaConfig.features?.consejos?.maxItems || 3;
    const consejosData = [];
    
    // Recopilar consejos disponibles
    for (let i = 1; i <= maxConsejos; i++) {
      const texto = consejos[`texto${i}`];
      if (texto || showPlaceholders) {
        consejosData.push({
          id: i,
          texto: texto || (showPlaceholders ? `Consejo número ${i} - Contenido útil para el lector` : "")
        });
      }
    }

    if (consejosData.length === 0) return null;

    return (
      <div className="mb-16">
        {consejos.titulo && (
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
            {consejos.titulo}
          </h3>
        )}
        
        {layoutType === "tabs" ? (
          // Plantilla 2: Grid moderno
<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
  {consejosData.map((consejo) => (
    <div
      key={consejo.id}
      className="relative p-8 pl-28 rounded-3xl bg-white shadow-xl border border-gray-200 
                 hover:shadow-2xl transition-all duration-500 group"
    >
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-t-3xl" />

      {/* Número fijo a la izquierda */}
      <div className="absolute top-1/2 left-6 -translate-y-1/2 flex items-center justify-center
                      w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-700
                      text-white font-extrabold text-2xl shadow-lg">
        {String(consejo.id).padStart(2, "0")}
      </div>

      {/* Texto con margen suficiente para no tapar el número */}
      <p className="text-gray-700 leading-relaxed text-lg font-medium">
  {consejo.texto}
</p>

    </div>
  ))}
</div>

        ) : (
          // Plantilla 1 y 3: Layout lineal
          <div className="mb-16 p-10 px-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-2xl text-center text-gray-100 max-w-4xl mx-auto">
            <div className="space-y-6">
              {consejosData.map((consejo) => (
                <div key={consejo.id} className="flex items-start text-left">
                  <span className="flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-full text-gray-900 font-bold text-sm mr-6 mt-1 flex-shrink-0">
                    {consejo.id}
                  </span>
                  <p className="text-gray-100 leading-relaxed text-lg">{consejo.texto}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Renderizar sección de galería
  const renderGaleriaSection = () => {
    if (!sectionsVisibility.galeria) return null;

    const imagenes = [];
    
    // Recopilar imágenes disponibles
    for (let i = 2; i <= 3; i++) {
      const imageUrl = galeria[`public_image${i}`];
      if (imageUrl || showPlaceholders) {
        imagenes.push({
          id: i,
          url: imageUrl || "/blog/blog-4.webp",
          alt: galeria[`alt_image${i}`] || `Imagen ${i}`,
          title: galeria[`title_image${i}`] || ""
        });
      }
    }

    if (imagenes.length === 0) return null;

    return (
      <div className="mb-16">
        {layoutType === "tabs" ? (
          // Plantilla 2: Cards modernas
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {imagenes.map((imagen) => (
                <div key={imagen.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={imagen.url}
                      alt={imagen.alt}
                      title={imagen.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Plantilla 1 y 3: Grid simple
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
            {imagenes.map((imagen) => (
              <div key={imagen.id} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <img
                    src={imagen.url}
                    alt={imagen.alt}
                    title={imagen.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Renderizar sección de información
  const renderInformacionSection = () => {
    if (!sectionsVisibility.informacion) return null;

    const infoData = informacion.filter((item) => 
      item.titulo || item.descripcion || showPlaceholders
    );

    if (infoData.length === 0 && !showPlaceholders) return null;

    // Si no hay datos pero se deben mostrar placeholders
    const displayData = infoData.length > 0 ? infoData : [
      { titulo: "Información 1", descripcion: "Descripción detallada del primer punto importante", palabra: "Más info", enlace: "#" },
      { titulo: "Información 2", descripcion: "Descripción detallada del segundo punto importante", palabra: "Ver más", enlace: "#" },
      { titulo: "Información 3", descripcion: "Descripción detallada del tercer punto importante", palabra: "Leer más", enlace: "#" },
      { titulo: "Información 4", descripcion: "Descripción detallada del cuarto punto importante", palabra: "Descubrir", enlace: "#" }
    ];

    return (
      <div className="mb-16">
        {layoutType === "tabs" ? (
          // Plantilla 2: Cards con gradientes
          <div className="space-y-6 max-w-4xl mx-auto">
            {displayData.map((item, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-r from-teal-50 to-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {item.titulo || `Información ${index + 1}`}
                      </h4>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {item.descripcion || "Descripción detallada del contenido"}
                      </p>
                    </div>
                  </div>
                  {item.enlace && item.palabra && (
                    <div className="flex justify-end">
                      <a
                        href={item.enlace}
                        className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors"
                      >
                        {item.palabra}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Plantilla 1 y 3: Cards alternadas
          <div className="grid grid-cols-1 gap-28 pt-8 max-w-5xl mx-auto">
            {displayData.map((item, index) => (
              <div key={index} className="group bg-white/90 dark:bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-12`}>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {item.titulo || `Información ${index + 1}`}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed mb-6">
                      {item.descripcion || "Descripción detallada del contenido importante"}
                    </p>
                    {item.enlace && item.palabra && (
                      <a
                        href={item.enlace}
                        className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all"
                      >
                        {item.palabra}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </a>
                    )}
                  </div>
                  <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Renderizar sección del footer
  const renderFooterSection = () => {
  if (!sectionsVisibility.footer) return null;

    return (
      <div className="mt-20 p-16 rounded-3xl text-white shadow-[0_8px_40px_rgb(0,0,0,0.5)] space-y-14" style={footerBgStyle}>


      <div className="text-center">
        <h3 className="text-4xl font-bold tracking-tight">
          {footer.titulo || "Título del Footer"}
        </h3>
        <p className="text-gray-300 text-lg mt-4 max-w-3xl mx-auto leading-relaxed">
          {footer.descripcion || "Descripción elegante del pie de página"}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        { [1,2,3].map((i) => {
          const imageUrl = footer[`public_image${i}`];
          if (!imageUrl && !showPlaceholders) return null;
          
          return (
            <div key={i} className="relative group w-60 h-40 rounded-3xl overflow-hidden shadow-lg">
              <img
                src={imageUrl || "/blog/blog-4.webp"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


  // Renderizar el contenido principal según el layout
  const renderMainContent = () => {
    if (layoutType === "tabs") {
      // Plantilla 2: Layout con tabs
      return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            {renderBodyHeaderSection()}
            
            <div className="space-y-16">
              {renderConsejosSection()}
              {renderGaleriaSection()}
              {renderInformacionSection()}
            </div>
          </div>
        </div>
      );
    } else {
      // Plantilla 1 y 3: Layout lineal
      return (
        <div className="space-y-16">
          {renderBodyHeaderSection()}
          {renderConsejosSection()}
          {renderGaleriaSection()}
          {renderInformacionSection()}
        </div>
      );
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Header con color de fondo */}
      <div style={headerBgStyle}>

        {/* Preview Badge */}
        {mode === "preview" && (
          <div className="fixed mr-36 mt-1 top-4 right-4 z-50">
            <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              Vista Previa
            </span>
          </div>
        )}

        {/* Header Principal */}
        <div className="mb-16">
          {renderHeaderSection()}
        </div>
      </div>

      {/* Body con color de fondo */}
      <div 
        className="container mx-auto px-6 py-12"
        style={bodyBgStyle}
      >

        {/* Contenido Principal */}
        <div className="mb-16">
          {renderMainContent()}
        </div>

        {/* Footer */}
        {renderFooterSection()}
      </div>
    </div>
  );
}

