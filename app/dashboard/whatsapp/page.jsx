"use client";

import { useMemo, useState } from "react";
import { TabButton, Card, CardTitle, UploadIcon } from "./components/TabButton";

export default function WhatsAppPage() {
  const [tab, setTab] = useState("conexion"); 
  const [isConnected, setIsConnected] = useState(true);

  const [product, setProduct] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [image, setImage] = useState(null);

  const services = useMemo(
    () => [
      { id: "p1", name: "Diseño y Desarrollo Web" },
      { id: "p2", name: "Gestión de Redes Sociales" },
      { id: "p3", name: "Marketing y Gestión Digital" },
      { id: "p4", name: "Branding y Diseño" },
    ],
    []
  );

  const subservices = useMemo(
  () => ({
    p1: [
      { id: "p1_1", name: "Creación y desarrollo web" },
      { id: "p1_2", name: "Experiencia de usuario y diseño" },
      { id: "p1_3", name: "Dominio y hosting web" },
      { id: "p1_4", name: "Optimización para buscadores" },
    ],
    p2: [
      { id: "p2_1", name: "Estrategia de contenido" },
      { id: "p2_2", name: "Diseño de pautas" },
      { id: "p2_3", name: "Producción de pautas" },
      { id: "p2_4", name: "Diseño UX/UI" },
    ],
    p3: [
      { id: "p3_1", name: "Identidad y posicionamiento" },
      { id: "p3_2", name: "Naming" },
      { id: "p3_3", name: "Identidad visual y eslogan" },
      { id: "p3_4", name: "Desarrollo de identidad visual y manual de marca" },
    ],
    p4: [
      { id: "p4_1", name: "Desarrollo de brief" },
      { id: "p4_2", name: "Planificación estratégica" },
      { id: "p4_3", name: "Publicidad digital" },
      { id: "p4_4", name: "Monitoreo y reporting" },
    ],
  }),
  []
);

  const statusText = isConnected ? "WhatsApp Conectado" : "WhatsApp Desconectado";
  const statusHint = isConnected
    ? "Tu cuenta está vinculada y lista para enviar mensajes."
    : "Vincula tu cuenta para poder enviar mensajes.";

  const canSaveTemplate = Boolean(product && paragraph.trim().length > 0 && image);
  const canActivate = Boolean(product && isConnected);

  const handlePickFile = (file) => {
    if (!file) return;

    const under2mb = file.size <= 2 * 1024 * 1024;

    if (!under2mb) return alert("La imagen debe pesar menos de 2 MB.");

    setImage(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handlePickFile(e.dataTransfer?.files?.[0]);
  };

  const handleSaveTemplate = () => {
    if (!canSaveTemplate) return;

    console.log({
      product,
      paragraph,
      imageName: image?.name ?? null,
    });

    alert("Plantilla guardada (mock).");
  };

  const handleActivateCampaign = () => {
    if (!canActivate) return;

    console.log("Activar campaña", { product });
    alert("Campaña activada (mock).");
  };

  const handleRestartSession = () => {
    setIsConnected(false);
    setTimeout(() => setIsConnected(true), 900);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="w-full px-4 py-4">
          {/* ✅ Wrapper centrado (funciona mejor en dashboards con sidebar) */}
          <div className="mx-auto w-full max-w-5xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
                  Envío de Whatsapp
                </h1>
                <p className="text-sm text-slate-500">
                  Configura la conexión y la plantilla para tus envíos.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      isConnected ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                  />
                  {statusText}
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-4">
              <div className="flex gap-6 border-b border-slate-200">
                <TabButton
                  active={tab === "conexion"}
                  onClick={() => setTab("conexion")}
                  label="Conexión"
                />
                <TabButton
                  active={tab === "plantilla"}
                  onClick={() => setTab("plantilla")}
                  label="Plantilla"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mb-12 flex-1 w-full px-4 py-8 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl">
          {tab === "conexion" ? (
            <section className="space-y-6">
              <Card>
                <CardTitle>Estado de Conexión WhatsApp</CardTitle>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-3 w-3 rounded-full ${
                          isConnected ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                      />
                      <div>
                        <p className="font-semibold text-slate-900">{statusText}</p>
                        <p className="text-sm text-slate-500">{statusHint}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleRestartSession}
                      className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-600 active:bg-cyan-700"
                    >
                      Reiniciar Sesión
                    </button>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="font-semibold text-emerald-600">
                      {isConnected
                        ? "WhatsApp conectado correctamente"
                        : "Conecta WhatsApp para continuar"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {isConnected
                        ? "Tu cuenta está vinculada y lista para enviar mensajes."
                        : "Escanea el QR o inicia el flujo de vinculación en tu backend."}
                    </p>
                  </div>
                </div>
              </Card>
            </section>
          ) : (
            <section className="space-y-6">
              <Card>
                <CardTitle>Selección de Producto</CardTitle>

                <div className="mt-4">
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Selecciona un producto
                  </label>
                  <select
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                  >
                    <option value="">--- Selecciona una opción ---</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-xs text-slate-500">
                    Esto define el contexto del mensaje y la plantilla asociada.
                  </p>
                </div>
              </Card>

              <Card>
                <CardTitle>Sección Whatsapp</CardTitle>

                {/* Image Upload */}
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Imagen Principal <span className="text-rose-500">*</span>
                      </p>
                      <p className="text-xs text-slate-500">
                        Esta imagen aparece como portada.
                      </p>
                    </div>

                    {image ? (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          {image.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => setImage(null)}
                          className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                        >
                          Quitar
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">Sin imagen</span>
                    )}
                  </div>

                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={handleDrop}
                    className="mt-4 rounded-2xl border-2 border-dashed border-slate-200 bg-white p-8 text-center"
                  >
                    <div className="mx-auto flex max-w-md flex-col items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                        <UploadIcon />
                      </div>
                      <p className="text-sm text-slate-700">
                        Arrastra tu imagen aquí o{" "}
                        <label className="cursor-pointer font-semibold text-cyan-600 hover:text-cyan-700">
                          haz click para subir
                          <input
                            type="file"
                            accept=".webp,image/webp"
                            className="hidden"
                            onChange={(e) => handlePickFile(e.target.files?.[0])}
                          />
                        </label>
                      </p>
                      <p className="text-xs text-slate-500">
                        Cada imagen debe pesar menos de 2 MB. Formato JPG, PNG o WEBP.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Paragraph */}
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-slate-900">
                    Párrafo <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    value={paragraph}
                    onChange={(e) => setParagraph(e.target.value)}
                    placeholder="Escribe el párrafo"
                    rows={6}
                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    Descripción o contenido de la sección.
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    onClick={handleSaveTemplate}
                    disabled={!canSaveTemplate}
                    className={[
                      "inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold text-white",
                      canSaveTemplate
                        ? "bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700"
                        : "bg-slate-300 cursor-not-allowed",
                    ].join(" ")}
                  >
                    Guardar Plantilla
                  </button>

                  <button
                    onClick={handleActivateCampaign}
                    disabled={!canActivate}
                    className={[
                      "inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold text-white",
                      canActivate
                        ? "bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700"
                        : "bg-slate-300 cursor-not-allowed",
                    ].join(" ")}
                  >
                    Activar Campaña
                  </button>

                  <button
                    onClick={() => {
                      setProduct("");
                      setParagraph("");
                      setImage(null);
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800 active:bg-slate-900"
                  >
                    Cancelar
                  </button>
                </div>

                {/* Hint debajo de botones */}
                {!canSaveTemplate && (
                  <p className="mt-3 text-xs text-slate-500">
                    Completa producto, imagen (WEBP &lt; 2MB) y párrafo para guardar.
                  </p>
                )}
              </Card>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
