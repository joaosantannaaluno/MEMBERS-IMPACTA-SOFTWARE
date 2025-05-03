import presets from "./presets.js";
export function selectPreset(presetName: string) {
  return presets.find((preset) => preset.name === presetName);
}
