import { View } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { Text } from "../Text";

const badgeStyles = cva("self-start rounded-full px-sm py-xs", {
  variants: {
    tone: {
      neutral: "bg-space-700",
      accent: "bg-nebula-700",
      live: "bg-danger/20",
      success: "bg-success/20",
      warning: "bg-warning/20",
    },
  },
  defaultVariants: {
    tone: "neutral",
  },
});

const labelTone = {
  neutral: "muted",
  accent: "accent",
  live: "danger",
  success: "default",
  warning: "default",
} as const;

export interface BadgeProps extends VariantProps<typeof badgeStyles> {
  label: string;
  className?: string;
}

/** Selo curto para status/categoria (ex: "AO VIVO", "NeoWs", "Novo"). */
export function Badge({ label, tone, className }: BadgeProps) {
  return (
    <View className={[badgeStyles({ tone }), className].filter(Boolean).join(" ")}>
      <Text variant="caption" tone={labelTone[tone ?? "neutral"]}>
        {label}
      </Text>
    </View>
  );
}
