import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import "../../design/reanimated-interop";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Text } from "../Text";

export interface SideMenuItem {
  /** Rótulo exibido no menu */
  label: string;
  /** Identificador da rota/página (para navegação futura) */
  route: string;
}

export interface SideMenuProps {
  open: boolean;
  onClose: () => void;
  items: SideMenuItem[];
  onSelect?: (item: SideMenuItem) => void;
}

const MENU_WIDTH = 288; // w-72

/**
 * Menu lateral retrátil (drawer). Oculto por padrão; desliza da esquerda com
 * overlay escurecido. Fecha ao tocar no overlay, no ✕ ou ao selecionar um item.
 */
export function SideMenu({ open, onClose, items, onSelect }: SideMenuProps) {
  const progress = useSharedValue(0);
  // Mantém montado durante a animação de saída
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) setVisible(true);
    progress.value = withTiming(open ? 1 : 0, { duration: 260 });
    if (!open) {
      const timeout = setTimeout(() => setVisible(false), 280);
      return () => clearTimeout(timeout);
    }
  }, [open, progress]);

  const overlayStyle = useAnimatedStyle(() => ({ opacity: progress.value * 0.6 }));
  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (progress.value - 1) * MENU_WIDTH }],
  }));

  if (!visible) return null;

  return (
    <View className="absolute inset-0 z-50">
      <Animated.View style={overlayStyle} className="absolute inset-0 bg-space-950">
        <Pressable accessibilityLabel="Fechar menu" onPress={onClose} className="flex-1" />
      </Animated.View>

      <Animated.View
        style={drawerStyle}
        className="absolute bottom-0 left-0 top-0 w-72 border-r border-neutral-0/10 bg-space-900/95 px-md py-lg"
      >
        <View className="mb-lg flex-row items-center justify-between px-sm">
          <Text variant="title-lg">NASA Explorer</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Fechar menu"
            onPress={onClose}
            className="h-9 w-9 items-center justify-center rounded-md border border-neutral-0/20 bg-neutral-0/10 transition-colors duration-200 hover:bg-neutral-0/20 active:bg-neutral-0/25"
          >
            <Text variant="body">✕</Text>
          </Pressable>
        </View>

        <View className="gap-xs">
          {items.map((item) => (
            <Pressable
              key={item.route}
              accessibilityRole="button"
              onPress={() => {
                onSelect?.(item);
                onClose();
              }}
              className="rounded-md border border-transparent px-sm py-sm transition-colors duration-200 hover:border-neutral-0/15 hover:bg-neutral-0/10 active:bg-neutral-0/15"
            >
              <Text variant="title-sm">{item.label}</Text>
            </Pressable>
          ))}
        </View>

        <View className="mt-auto px-sm">
          <Text variant="caption" tone="subtle">
            Powered by NASA APIs
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}
