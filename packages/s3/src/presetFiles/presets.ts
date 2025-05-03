export type MimeType =
  | "image/png"
  | "image/jpeg"
  | "image/gif"
  | "image/webp"
  | "image/svg+xml"
  | "image/bmp"
  | "image/tiff"
  | "image/heif"
  | "image/heic"
  | "application/pdf";

export interface Preset {
  name: string;
  mimeTypes: MimeType[];
  max: number;
  permission: string;
}

const presets: Preset[] = [
  {
    name: "default",
    mimeTypes: ["image/png", "image/jpeg"],
    max: 1 * 1024 * 1024,
    permission: "upload_*",
  },
  // {
  //   name: "banner_artigo",
  //   mimeTypes: ["image/png", "image/jpeg"],
  //   max: 5 * 1024 * 1024,
  //   permission: "upload_banner_artigo",
  // },
  // {
  //   name: "artigo",
  //   mimeTypes: ["image/png", "image/jpeg"],
  //   max: 5 * 1024 * 1024,
  //   permission: "upload_artigo",
  // },
  // {
  //   name: "midia",
  //   mimeTypes: ["image/png", "image/jpeg"],
  //   max: 5 * 1024 * 1024,
  //   permission: "upload_midia",
  // },
  {
    name: "pdf",
    mimeTypes: ["application/pdf"],
    max: 5 * 1024 * 1024,
    permission: "upload_*",
  },
  {
    name: "pdf_50_mb",
    mimeTypes: ["application/pdf"],
    max: 50 * 1024 * 1024,
    permission: "upload_*",
  },
];

export default presets;
