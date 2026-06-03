"use client";

import { ImageUploadZone } from "./ImageUploadZone";
import { ColorSection } from "./ColorSection";
import { SeoSection } from "./SeoSection";

export function DesktopEditor({
  formData,
  setFormData,
  imagePreviews,
  handleImageChange,
  handleRemoveImage,
  handleDrop,
}) {
  const hasImage = !!imagePreviews.right;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <ImageUploadZone
            label="Imagen Izquierda"
            hint="(450 × 700 px recomendado)"
            maxSizeLabel="400 KB"
            preview={imagePreviews.left}
            onFile={(f) => handleImageChange("left", f)}
            onDrop={(e) => handleDrop("left", e)}
            onRemove={() => handleRemoveImage("left")}
          />
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-0.5">
              <span>Opacidad</span>
              <span>{formData.left_opacity}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={formData.left_opacity}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  left_opacity: Number(e.target.value),
                }))
              }
              className="w-full accent-violet-600"
            />
          </div>
        </div>
        <div className="space-y-2">
          <ImageUploadZone
            label="Imagen Derecha"
            hint="(550 × 600 px recomendado)"
            maxSizeLabel="400 KB"
            preview={imagePreviews.right}
            onFile={(f) => handleImageChange("right", f)}
            onDrop={(e) => handleDrop("right", e)}
            onRemove={() => handleRemoveImage("right")}
          />
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-0.5">
              <span>Opacidad</span>
              <span>{formData.right_opacity}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={formData.right_opacity}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  right_opacity: Number(e.target.value),
                }))
              }
              className="w-full accent-violet-600"
            />
          </div>
        </div>
      </div>

      <ColorSection
        hasImage={hasImage}
        formData={formData}
        setFormData={setFormData}
      />
      <SeoSection
        type="desktop"
        imagePreviews={imagePreviews}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
