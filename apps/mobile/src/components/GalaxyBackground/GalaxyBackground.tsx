import { View } from "react-native";
import type { GalaxyBackgroundProps } from "./types";

/**
 * Fallback nativo (iOS/Android) do background "Galaxy": o efeito WebGL existe
 * apenas na web (GalaxyBackground.web.tsx). Aqui renderiza somente a camada
 * vazia — o fundo escuro da tela (bg-space-950) permanece visível.
 */
export function GalaxyBackground({ className }: GalaxyBackgroundProps) {
  return <View className={["absolute inset-0", className].filter(Boolean).join(" ")} />;
}
