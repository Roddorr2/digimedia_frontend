"use client";

import { ImageUploadZone } from "./ImageUploadZone";
import { ColorSection } from "./ColorSection";
import { SeoSection } from "./SeoSection";

export function MobileEditor({
  formData,
  setFormData,
  imagePreviews,
  handleImageChange,
  handleRemoveImage,
  handleDrop,
}) {
  const hasImage = !!imagePreviews.mobile;

  return (
    <div className="space-y-4">
      <div className="max-w-xs space-y-2">
        <ImageUploadZone
          label="Imagen Mobile (única)"
          hint="1150 × 1350 px — fondo completo mobile"
          maxSizeLabel="600 KB"
          preview={imagePreviews.mobile}
          onFile={(f) => handleImageChange("mobile", f)}
          onDrop={(e) => handleDrop("mobile", e)}
          onRemove={() => handleRemoveImage("mobile")}
        />
        <div>
          <div className="flex justify-between text-xs text-slate-500 mb-0.5">
            <span>Opacidad</span>
            <span>{formData.mobile_opacity}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={formData.mobile_opacity}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                mobile_opacity: Number(e.target.value),
              }))
            }
            className="w-full accent-violet-600"
          />
        </div>
      </div>

      <ColorSection
        hasImage={hasImage}
        formData={formData}
        setFormData={setFormData}
      />
      <SeoSection
        type="mobile"
        imagePreviews={imagePreviews}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
