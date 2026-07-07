import { View, type ViewProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";

const cardStyles = cva("rounded-panel p-lg", {
  variants: {
    variant: {
      solid: "bg-space-800",
      glass: "bg-space-800/60 border border-space-600",
      outline: "bg-transparent border border-space-600",
    },
  },
  defaultVariants: {
    variant: "solid",
  },
});

export interface CardProps extends ViewProps, VariantProps<typeof cardStyles> {
  className?: string;
}

/** Painel base do design system (o "deck" sobre o universo). Envolve conteúdo de página. */
export function Card({ variant, className, ...props }: CardProps) {
  return <View className={[cardStyles({ variant }), className].filter(Boolean).join(" ")} {...props} />;
}
