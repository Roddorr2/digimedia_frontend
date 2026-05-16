import { Card, CardTitle } from './TabButton';

export function PlantillasList({
  tipo,
  loading,
  servicios,
  plantillas,
  selectedPlantilla,
  handleSelectPlantilla,
  getPlantillaId,
  getTiempoEnvio,
}) {
  return (
    <div className="lg:col-span-3">
      <Card>
        <CardTitle>
          Plantillas {tipo === 'whatsapp' ? 'WhatsApp' : 'Email'}
        </CardTitle>

        {loading ? (
          <div className="mt-4 flex justify-center p-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            {servicios.map((servicio) => {
              const plantillasServicio = plantillas.filter(
                (p) => p.id_servicio === servicio.id,
              );

              return (
                <div
                  key={servicio.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/50"
                >
                  <h3 className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {servicio.nombre}
                  </h3>
                  <div className="space-y-1">
                    {[1, 2, 3].map((numero) => {
                      const plantilla = plantillasServicio.find(
                        (p) => p.numero_plantilla === numero,
                      );
                      const isSelected =
                        getPlantillaId(selectedPlantilla) ===
                        getPlantillaId(plantilla);

                      return (
                        <button
                          key={numero}
                          onClick={() =>
                            plantilla && handleSelectPlantilla(plantilla)
                          }
                          disabled={!plantilla}
                          className={`w-full rounded-md px-3 py-2 text-left text-xs transition ${
                            isSelected
                              ? 'bg-cyan-500 text-white'
                              : plantilla
                                ? 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/50'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800/50 dark:text-slate-600'
                          }`}
                        >
                          {getTiempoEnvio(numero, servicio.id)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
