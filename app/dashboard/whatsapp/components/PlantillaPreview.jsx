export function PlantillaPreview({ selectedPlantilla, formData, imagePreview }) {
    return (
        <div className="lg:col-span-4 sticky top-6">
            {selectedPlantilla ? (
                <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 shadow-sm">
                    <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Vista Previa Final
                    </p>

                    <div className="mx-auto max-w-[350px] overflow-hidden bg-white shadow-lg">
                        {/* Encabezado Púrpura (Igual a tu imagen) */}
                        <div className="bg-[#9333ea] p-4 text-center">
                            <h2 className="text-sm font-bold text-white leading-tight">
                                {formData.encabezado || "¿Listo para incrementar el valor?"}
                            </h2>
                        </div>

                        {/* Imagen */}
                        <div className="bg-white">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Header" className="w-full object-cover" />
                            ) : (
                                <div className="flex h-32 items-center justify-center bg-slate-100 text-[10px] text-slate-400 italic">
                                    Sin imagen seleccionada
                                </div>
                            )}
                        </div>

                        {/* Mensaje */}
                        <div className="p-6">
                            <div
                                className="prose prose-sm prose-slate max-w-none text-[13px] leading-relaxed text-slate-700 whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{
                                    __html: (formData.mensaje || "Escribe un mensaje...")
                                        .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
                                        .replace(/_(.*?)_/g, '<em>$1</em>')
                                        .replace(/~(.*?)~/g, '<del>$1</del>')
                                        .replace(/{nombre}/g, '<b class="text-[#9333ea]">[Nombre]</b>')
                                }}
                            />

                            {/* Botón dinámico */}
                            {formData.mensaje_boton && (
                                <div className="mt-6 text-center">
                                    <div className="inline-block rounded-md bg-[#9333ea] px-6 py-2.5 text-[11px] font-bold text-white uppercase tracking-wider">
                                        {formData.mensaje_boton}
                                    </div>
                                </div>
                            )}

                            {/* Footer con Rich Text */}
                            <div
                                className="mt-6 border-t pt-4 text-[11px] text-slate-500"
                                dangerouslySetInnerHTML={{
                                    __html: (formData.footer || "").replace(/{nombre}/g, '<b>[Nombre]</b>')
                                }}
                            />
                        </div>

                        {/* Redes Sociales (Simuladas) */}
                        <div className="bg-slate-50 p-4 text-center">
                            <div className="mb-2 flex justify-center gap-3 grayscale opacity-70">
                                {formData.red_facebook && <div className="h-4 w-4 bg-blue-600 rounded-full" />}
                                {formData.red_instagram && <div className="h-4 w-4 bg-pink-500 rounded-full" />}
                                {formData.red_linkedin && <div className="h-4 w-4 bg-blue-800 rounded-full" />}
                                {formData.red_tiktok && <div className="h-4 w-4 bg-black rounded-full" />}
                            </div>
                            <p className="text-[8px] text-slate-400">© 2026 DigiMedia Marketing</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="rounded-xl border-2 border-dashed border-slate-200 p-12 text-center text-slate-400 text-sm italic">
                    Selecciona una plantilla para ver la previsualización
                </div>
            )}
        </div>
    );
}
