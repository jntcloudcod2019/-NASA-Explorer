/**
 * Paleta de cores do NASA Explorer.
 * Única fonte da verdade — consumida pelo tailwind.config.js.
 * Componentes nunca declaram cores literais; sempre via className (ex: "bg-space-900").
 */
export const colors = {
  // Fundo do universo — do vácuo profundo à superfície dos painéis
  space: {
    950: "#05060A",
    900: "#0A0C14",
    800: "#12141F",
    700: "#1B1E2E",
    600: "#262A3D",
    500: "#3A3F58",
  },
  // Acento primário — nebulosa (roxo/azul)
  nebula: {
    100: "#E4E1FF",
    300: "#B4ABFF",
    500: "#7C6CFF",
    600: "#5F4EE8",
    700: "#4736BE",
  },
  // Acento secundário — aurora (ciano)
  aurora: {
    100: "#D6FBFF",
    300: "#8DEEFB",
    500: "#3FCFE8",
    600: "#25A9C2",
  },
  // Destaque estelar — usado com parcimônia (CTAs, badges "ao vivo")
  star: {
    300: "#FFF3C4",
    500: "#FFD866",
    600: "#F2B705",
  },
  // Texto e superfícies neutras
  neutral: {
    0: "#FFFFFF",
    100: "#F4F5F9",
    300: "#C7CADA",
    500: "#8A8EA8",
    700: "#565A73",
  },
  // Semântica
  success: "#3FE0A5",
  warning: "#F2B705",
  danger: "#FF5C6C",
} as const;
