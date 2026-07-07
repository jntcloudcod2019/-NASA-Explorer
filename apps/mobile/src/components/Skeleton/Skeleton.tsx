import { useEffect } from "react";
import "../../design/reanimated-interop";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export interface SkeletonProps {
  className?: string;
}

/** Placeholder de carregamento com pulso suave. Usar no lugar de spinners para dados assíncronos. */
export function Skeleton({ className }: SkeletonProps) {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 900 }), -1, true);
  }, [opacity]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      className={["rounded-md bg-space-700", className].filter(Boolean).join(" ")}
      style={style}
    />
  );
}
