export const TIEMPOS = [
  { value: 3, label: "3s - Muy inmediato" },
  { value: 5, label: "5s - Rápido" },
  { value: 8, label: "8s - Normal" },
];

export const TRIGGER_TYPES = [
  { value: "time", label: "Por tiempo (segundos)" },
  { value: "click", label: "Por clic (botón)" },
];

export const GRADIENT_DIRS = [
  { value: "to bottom", label: "↓ Arriba a Abajo" },
  { value: "to top", label: "↑ Abajo a Arriba" },
  { value: "to right", label: "→ Izq a Der" },
  { value: "to left", label: "← Der a Izq" },
  { value: "to bottom right", label: "↘ Diagonal" },
  { value: "to bottom left", label: "↙ Diagonal" },
];

export const LAYOUTS = [
  { value: "left-image", label: "Imagen izquierda | Formulario derecha" },
  { value: "right-image", label: "Formulario izquierda | Imagen derecha" },
  { value: "split", label: "Dividido 43/57 (izq + der sin fondo)" },
];

export const MAX_ALT = 80;

export const DEFAULT_FORM = {
  button_text: "HAZLO YA",
  button_color: "#6e26db",
  service_color: "#8B5CF6",
  service_color_2: "#F97316",
  gradient_direction: "to bottom",
  trigger_time: 5,
  trigger_type: "time",
  layout: "left-image",
  show_logo: true,
  left_text: "",
  left_opacity: 80,
  right_opacity: 100,
  mobile_opacity: 100,
  left_alt: "",
  right_alt: "",
  mobile_alt: "",
};

export const getBg = (formData) => {
  if (
    formData.service_color_2 &&
    formData.service_color_2 !== formData.service_color
  ) {
    return `linear-gradient(${formData.gradient_direction || "to bottom"}, ${formData.service_color}, ${formData.service_color_2})`;
  }
  return formData.service_color;
};
