/**
 * Escala tipográfica do NASA Explorer.
 * Única fonte da verdade — consumida pelo tailwind.config.js.
 * Componentes usam className (ex: "text-display-lg font-display"), nunca fontSize inline.
 */
export const fontFamily = {
  display: ["Archivo_700Bold", "System"],
  body: ["OpenSans_400Regular", "System"],
  "body-medium": ["OpenSans_600SemiBold", "System"],
  mono: ["JetBrainsMono-Regular", "System"],
};

export const fontSize = {
  "display-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em" }],
  "display-md": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em" }],
  "display-sm": ["24px", { lineHeight: "32px" }],
  "title-lg": ["20px", { lineHeight: "28px" }],
  "title-sm": ["17px", { lineHeight: "24px" }],
  body: ["15px", { lineHeight: "22px" }],
  caption: ["13px", { lineHeight: "18px" }],
  mono: ["13px", { lineHeight: "20px" }],
} as const;
