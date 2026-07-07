/**
 * Escala de espaçamento e raio do NASA Explorer.
 * Consumida pelo tailwind.config.js — usar sempre via className (ex: "p-md", "rounded-panel").
 */
export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
} as const;

export const borderRadius = {
  sm: "8px",
  md: "12px",
  lg: "20px",
  panel: "24px",
  full: "9999px",
} as const;
