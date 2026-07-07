import { cssInterop } from "nativewind";
import Animated from "react-native-reanimated";

/**
 * Componentes Animated do Reanimated não são reconhecidos pelo NativeWind
 * por padrão (className não vira estilo). Registrar uma vez por componente;
 * import idempotente via cache de módulos ES — seguro importar de vários lugares.
 */
cssInterop(Animated.View, { className: "style" });
cssInterop(Animated.Text, { className: "style" });
