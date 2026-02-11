"use client";

import { getCookie } from "cookies-next";
import { useMemo, useState, useEffect } from "react";
<<<<<<< HEAD
import { TabButton, Card, CardTitle, UploadIcon } from "./components/TabButton";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/api/fetchApiWhatsApp";
import { useWhatsAppSocket } from "@/api/socket";
import { QrDisplay } from "./components/QrDisplay";
import Swal from "sweetalert2";
=======
import { TabButton, Card, CardTitle } from "./components/TabButton";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, whatsappApi } from "@/api/fetchApiWhatsApp";
import { useWhatsAppSocket } from "@/api/socket";
import { QrDisplay } from "./components/QrDisplay";
import Swal from "sweetalert2";
import { TestSendTab } from "./components/TestSendTab";
>>>>>>> origin/rama-kevin

export default function WhatsAppPage() {
  const [tab, setTab] = useState("conexion");
  const [isConnected, setIsConnected] = useState(false);
<<<<<<< HEAD
  const [qrCode, setQrCode] = useState(null);
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [service, setService] = useState("");
  const [subservice, setSubservice] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [image, setImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  // Estados para manejo de cliente/hidratación
=======
  const { isLoading: isAuthLoading } = useAuth();

  // Token cliente (para socket)
>>>>>>> origin/rama-kevin
  const [clientToken, setClientToken] = useState(null);

  const services = useMemo(
    () => [
      { id: "p1", name: "Diseño y Desarrollo Web" },
      { id: "p2", name: "Gestión de Redes Sociales" },
      { id: "p3", name: "Marketing y Gestión Digital" },
      { id: "p4", name: "Branding y Diseño" },
    ],
    []
  );

<<<<<<< HEAD
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

  const subServices = useMemo(() => {
    if (!service) return [];
    return subservices[service] ?? [];
  }, [service, subservices]);

  const canSaveTemplate = Boolean(service && subservice && paragraph.trim().length > 0 && image && phoneNumber);
  const canActivate = Boolean(service && subservice && isConnected && phoneNumber);

  // Hook de socket
  const { isConnected: wsConnected, qrData, loading: wsLoading } = useWhatsAppSocket(clientToken);

  const connectedNumber = qrData?.me?.id?.split(":")[0] || qrData?.me?.id?.split("@")[0];
=======
  // Socket WhatsApp
  const { isConnected: wsConnected, qrData, loading: wsLoading } =
    useWhatsAppSocket(clientToken);

  const connected = Boolean(wsConnected);
  const connectedNumber =
    qrData?.me?.id?.split(":")[0] || qrData?.me?.id?.split("@")[0];
>>>>>>> origin/rama-kevin

  const statusText = isConnected
    ? `Conectado: ${connectedNumber || "WhatsApp"}`
    : "WhatsApp Desconectado";

  const statusHint = isConnected
    ? `Tu cuenta (${connectedNumber}) está vinculada y lista para enviar mensajes.`
    : "Vincula tu cuenta para poder enviar mensajes.";

  useEffect(() => {
<<<<<<< HEAD
    // Solo cargamos el token en el cliente. Prioridad a la cookie del dashboard.
=======
>>>>>>> origin/rama-kevin
    const token = getCookie("token") || localStorage.getItem("token");
    setClientToken(token);
  }, []);

  useEffect(() => {
    if (wsConnected !== undefined) setIsConnected(wsConnected);
<<<<<<< HEAD
    if (qrData?.image) setQrCode(qrData.image);
    else if (!wsConnected) setQrCode(null);
  }, [wsConnected, qrData]);

  useEffect(() => {
    setSubservice(""); 
  }, [service]);

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

  const handleSaveTemplate = async () => {
    if (!canSaveTemplate) return;
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("service", service);
      formData.append("subservice", subservice);
      formData.append("paragraph", paragraph);
      formData.append("phone", phoneNumber);
      if (image) formData.append("image", image);
      
      const data = await apiRequest("/api/whatsapp/template", {
        method: "POST",
        body: formData
      });

      if (data) {
        Swal.fire({
          title: "¡Éxito!",
          text: "Plantilla guardada correctamente.",
          icon: "success",
          confirmButtonColor: "rgba(140,82,255,1)"
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo guardar la plantilla", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleActivateCampaign = async () => {
    if (!canActivate) return;
    setIsActivating(true);
    try {
      const data = await apiRequest("/api/whatsapp/activate", {
        method: "POST",
        body: JSON.stringify({ service, subservice, phone: phoneNumber })
      });
      if (data.success) {
        Swal.fire("Campaña Activada", "El envío de mensajes ha comenzado.", "success");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo activar la campaña", "error");
    } finally {
      setIsActivating(false);
    }
  };

  const handleRestartSession = async () => {
    try {
      await apiRequest("/api/whatsapp/restart", { method: "POST" });
      setIsConnected(false);
      setQrCode(null);
      Swal.fire("Reiniciando", "La sesión se está reiniciando...", "info");
    } catch (error) {
      console.error(error);
    }
  };

  // Renderizado defensivo para evitar errores de hidratación
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => setIsLoaded(true), []);

=======
  }, [wsConnected]);

  const handleRestartSession = async () => {
    try {
      await whatsappApi.restart();
      setIsConnected(false);
      Swal.fire("Reiniciando", "La sesión se está reiniciando...", "info");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo reiniciar la sesión.", "error");
    }
  };

  // Renderizado defensivo para evitar hidratación rara
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => setIsLoaded(true), []);
>>>>>>> origin/rama-kevin
  if (!isLoaded) return <div className="p-10 text-center">Iniciando Dashboard...</div>;

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="w-full px-4 py-4">
          <div className="mx-auto w-full max-w-5xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
                  Envío de Whatsapp
                </h1>
                <p className="text-sm text-slate-500">
<<<<<<< HEAD
                  Configura la conexión y la plantilla para tus envíos.
=======
                  Conecta tu cuenta y ejecuta pruebas reales de campaña.
>>>>>>> origin/rama-kevin
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
<<<<<<< HEAD
                  active={tab === "plantilla"}
                  onClick={() => setTab("plantilla")}
                  label="Plantilla"
=======
                  active={tab === "prueba"}
                  onClick={() => setTab("prueba")}
                  label="Prueba"
>>>>>>> origin/rama-kevin
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mb-12 flex-1 w-full px-4 py-8 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl">
          {isAuthLoading ? (
            <div className="flex flex-col items-center justify-center p-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[rgba(140,82,255,1)] border-t-transparent" />
              <p className="mt-4 text-slate-500">Cargando sesión...</p>
            </div>
          ) : tab === "conexion" ? (
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
                      className="inline-flex items-center justify-center rounded-full bg-[rgba(140,82,255,1)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[rgba(140,82,255,0.9)] active:bg-[rgba(140,82,255,0.8)]"
                    >
                      Reiniciar Sesión
                    </button>
                  </div>

<<<<<<< HEAD
                    <div className="mt-6 flex justify-center">
                      <QrDisplay 
                        qrData={qrData} 
                        isConnected={isConnected} 
                        loading={wsLoading} 
                      />
                    </div>
=======
                  <div className="mt-6 flex justify-center">
                    <QrDisplay
                      qrData={qrData}
                      isConnected={isConnected}
                      loading={wsLoading}
                    />
                  </div>
>>>>>>> origin/rama-kevin
                </div>
              </Card>
            </section>
          ) : (
<<<<<<< HEAD
            <section className="space-y-6">
              <Card>
                <CardTitle>Número Telefónico a enviar</CardTitle>
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Número Telefónico
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Ej: 51987654321"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[rgba(140,82,255,1)] focus:ring-4 focus:ring-[rgba(140,82,255,0.18)]"
                  />
                </div>
                <CardTitle>Selección de Servicio</CardTitle>

                <div className="mt-4">
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Selecciona un servicio
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[rgba(140,82,255,1)] focus:ring-4 focus:ring-[rgba(140,82,255,0.18)]"
                  >
                    <option value="">--- Selecciona una opción ---</option>
                    {services.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-xs text-slate-500">
                    Esto define el contexto del mensaje y la plantilla asociada.
                  </p>
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Selecciona un subservicio
                  </label>

                  <select
                    value={subservice}
                    onChange={(e) => setSubservice(e.target.value)}
                    disabled={!service}
                    className={[
                      "w-full rounded-xl border px-4 py-3 text-slate-900 outline-none focus:ring-4",
                      service
                        ? "border-slate-200 bg-white focus:border-[rgba(140,82,255,1)] focus:ring-[rgba(140,82,255,0.18)]"
                        : "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed",
                    ].join(" ")}
                  >
                    <option value="">
                      {service
                        ? "--- Selecciona una opción ---"
                        : "Primero selecciona un servicio"}
                    </option>

                    {subServices.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>

                  <p className="mt-2 text-xs text-slate-500">
                    Este campo se adapta según el servicio elegido.
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
                        <label className="cursor-pointer font-semibold text-[rgba(140,82,255,1)] hover:text-[rgba(140,82,255,0.9)]">
                          haz click para subir
                          <input
                            type="file"
                            accept=".webp,image/webp, .jpg, .jpeg, .png"
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
                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[rgba(140,82,255,1)] focus:ring-4 focus:ring-[rgba(140,82,255,0.18)]"
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    Descripción o contenido de la sección.
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    onClick={handleSaveTemplate}
                    disabled={!canSaveTemplate || isSaving}
                    className={[
                      "inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold text-white",
                      (canSaveTemplate && !isSaving)
                        ? "bg-[rgba(140,82,255,1)] hover:bg-[rgba(140,82,255,0.9)] active:bg-[rgba(140,82,255,0.8)]"
                        : "bg-slate-300 cursor-not-allowed",
                    ].join(" ")}
                  >
                    {isSaving ? "Guardando..." : "Guardar Plantilla"}
                  </button>

                  <button
                    onClick={handleActivateCampaign}
                    disabled={!canActivate || isActivating}
                    className={[
                      "inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold text-white",
                      (canActivate && !isActivating)
                        ? "bg-[rgba(140,82,255,1)] hover:bg-[rgba(140,82,255,0.9)] active:bg-[rgba(140,82,255,0.8)]"
                        : "bg-slate-300 cursor-not-allowed",
                    ].join(" ")}
                  >
                    {isActivating ? "Activando..." : "Activar Campaña"}
                  </button>

                  <button
                    onClick={() => {
                      setService("");
                      setSubservice("");
                      setParagraph("");
                      setImage(null);
                      setPhoneNumber("");
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800 active:bg-slate-900"
                  >
                    Cancelar
                  </button>
                </div>

                {/* Hint debajo de botones */}
                {!canSaveTemplate && (
                  <p className="mt-3 text-xs text-slate-500">
                    Completa número, servicio, imagen (WEBP, JPG, PNG &lt; 2MB) y párrafo para guardar.
                  </p>
                )}
              </Card>
            </section>
=======
            <TestSendTab
              services={services}
              isConnected={isConnected}
              connectedNumber={connectedNumber}
            />
>>>>>>> origin/rama-kevin
          )}
        </div>
      </main>
    </div>
  );
}
