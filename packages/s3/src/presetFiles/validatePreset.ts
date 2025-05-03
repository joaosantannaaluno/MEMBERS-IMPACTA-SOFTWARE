import { selectPreset } from "./selectPreset.js";
import { MimeType } from "./presets.js";

export const validatePreset = async ({
  mimeType,
  presetName,
  size,
}: {
  presetName: string;
  mimeType: MimeType;
  size: number;
}): Promise<boolean> => {
  const preset = selectPreset(presetName);

  if (!preset) {
    throw new Error(`Preset "${presetName}" não encontrado.`);
  }
  if (!preset.mimeTypes.includes(mimeType)) {
    console.log(
      `MimeType "${mimeType}" não é suportado pelo preset "${presetName}". Tipos suportados: ${preset.mimeTypes.join(", ")}`
    );

    throw new Error(
      `Tipo de arquivo inválido. Tipos suportados: ${preset.mimeTypes.join(", ")}`
    );
  }

  if (size > preset.max) {
    throw new Error(
      `O tamanho "${size}" excede o máximo permitido (${preset.max} bytes) para o preset "${presetName}".`
    );
  }

  return true;
};
