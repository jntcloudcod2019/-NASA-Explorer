import { Pressable, View } from "react-native";

export interface HamburgerButtonProps {
  onPress: () => void;
  className?: string;
}

/** Gatilho do menu lateral — três barras, estilo branco-transparente com hover. */
export function HamburgerButton({ onPress, className }: HamburgerButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Abrir menu"
      onPress={onPress}
      className={[
        "h-11 w-11 items-center justify-center gap-xs rounded-md border border-neutral-0/20 bg-neutral-0/10 transition-colors duration-200 hover:bg-neutral-0/20 active:bg-neutral-0/25",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <View className="h-0.5 w-5 rounded-full bg-neutral-0" />
      <View className="h-0.5 w-5 rounded-full bg-neutral-0" />
      <View className="h-0.5 w-5 rounded-full bg-neutral-0" />
    </Pressable>
  );
}
