"use client";

import { getBg } from "./constants";

// Simula un input con ícono como en el popup real
const PreviewInput = ({ placeholder }) => (
  <div className="relative w-full">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gray-300" />
    <div className="w-full rounded-full pl-7 pr-3 py-1.5 text-[10px] text-gray-400 border border-gray-200 bg-white/90 shadow-sm">
      {placeholder}
    </div>
  </div>
);


export function PopupPreview({ formData, imagePreviews, view }) {
  if (view === "desktop") {
    const hasBgImage = !!imagePreviews.right;

    return (
      <div
        className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-600 shadow-lg flex flex-row"
        style={{ background: getBg(formData), minHeight: 240 }}
      >
        {/* Fondo derecho — solo en left-image layout */}
        {hasBgImage && formData.layout !== "right-image" && (
          <div className="absolute inset-0 z-0">
            <img
              src={imagePreviews.right}
              alt="fondo"
              className="w-full h-full object-cover"
              style={{ opacity: formData.right_opacity / 100 }}
            />
          </div>
        )}

        {/* Imagen izquierda — solo en left-image layout */}
        {imagePreviews.left && formData.layout !== "right-image" && (
          <div className="w-[42%] flex-shrink-0 relative z-10">
            <img
              src={imagePreviews.left}
              alt="preview"
              className="w-full h-full object-cover"
              style={{ opacity: formData.left_opacity / 100 }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)",
              }}
            />
            {formData.show_logo && (
              <img
                src="/servicios/digimedia-logo-modal.webp"
                alt="Digimedia"
                className="absolute top-2 left-2 w-8 z-10"
              />
            )}
            {formData.left_text && (
              <p className="absolute bottom-3 right-2 text-white text-right font-bold text-[9px] z-10 max-w-[85%] drop-shadow-lg leading-tight">
                {formData.left_text}
              </p>
            )}
          </div>
        )}

        {/* Formulario — siempre en el medio */}
        <div className="flex-1 flex flex-col items-center justify-end px-4 pb-5 relative z-10">
          <button className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/50 flex items-center justify-center text-gray-500 text-[10px] font-bold">
            ✕
          </button>
          <div className="w-full space-y-1.5">
            {["Nombre", "Teléfono", "Correo"].map((ph) => (
              <PreviewInput key={ph} placeholder={ph} />
            ))}
          </div>
          <div
            className="mt-2 w-3/4 mx-auto rounded-full py-1 text-[10px] font-bold text-white text-center uppercase tracking-wide shadow-sm"
            style={{ backgroundColor: formData.button_color }}
          >
            {formData.button_text || "HAZLO YA"}
          </div>
        </div>

        {/* Imagen derecha — columna lateral solo en right-image layout */}
        {imagePreviews.right && formData.layout === "right-image" && (
          <div className="w-[42%] flex-shrink-0 relative z-10">
            <img
              src={imagePreviews.right}
              alt="preview derecha"
              className="w-full h-full object-cover"
              style={{ opacity: formData.right_opacity / 100 }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)",
              }}
            />
            {formData.show_logo && (
              <img
                src="/servicios/digimedia-logo-modal.webp"
                alt="Digimedia"
                className="absolute top-2 left-2 w-8 z-10"
              />
            )}
            {formData.left_text && (
              <p className="absolute bottom-3 right-2 text-white text-right font-bold text-[9px] z-10 max-w-[85%] drop-shadow-lg leading-tight">
                {formData.left_text}
              </p>
            )}
          </div>
        )}
        {/* Fondo izquierdo — solo en right-image layout */}
        {imagePreviews.left && formData.layout === "right-image" && (
          <div className="absolute inset-0 z-0">
            <img
              src={imagePreviews.left}
              alt="fondo izquierda"
              className="w-full h-full object-cover"
              style={{ opacity: formData.left_opacity / 100 }}
            />
          </div>
        )}
      </div>
    );
  }

  // Mobile
  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-600 shadow-lg mx-auto flex flex-col justify-end"
      style={{
        background: imagePreviews.mobile ? "transparent" : getBg(formData),
        minHeight: 280,
        maxWidth: 200,
      }}
    >
      {imagePreviews.mobile && (
        <div className="absolute inset-0 z-0">
          <img
            src={imagePreviews.mobile}
            alt="preview mobile"
            className="w-full h-full object-cover"
            style={{ opacity: formData.mobile_opacity / 100 }}
          />
        </div>
      )}
      <div className="flex flex-col items-center gap-1.5 px-4 pb-5 w-full relative z-10 mt-auto">
        <button className="absolute top-0 right-2 w-5 h-5 rounded-full bg-white/50 flex items-center justify-center text-gray-500 text-[10px] font-bold">
          ✕
        </button>
        <div className="w-full space-y-1.5 mt-6">
          {["Nombre", "Teléfono", "Correo"].map((ph) => (
            <PreviewInput key={ph} placeholder={ph} />
          ))}
        </div>
        <div
          className="w-3/4 mx-auto rounded-full py-1 text-[10px] font-bold text-white text-center uppercase tracking-wide mt-1"
          style={{ backgroundColor: formData.button_color }}
        >
          {formData.button_text || "HAZLO YA"}
        </div>
      </div>
    </div>
  );
}
