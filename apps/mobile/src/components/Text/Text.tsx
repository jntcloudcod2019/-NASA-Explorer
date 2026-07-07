import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";

export const textStyles = cva("text-neutral-0", {
  variants: {
    variant: {
      "display-lg": "font-display text-display-lg",
      "display-md": "font-display text-display-md",
      "display-sm": "font-display text-display-sm",
      "title-lg": "font-body-medium text-title-lg",
      "title-sm": "font-body-medium text-title-sm",
      body: "font-body text-body",
      caption: "font-body text-caption",
      mono: "font-mono text-mono",
    },
    tone: {
      default: "text-neutral-0",
      muted: "text-neutral-300",
      subtle: "text-neutral-500",
      accent: "text-nebula-300",
      danger: "text-danger",
    },
  },
  defaultVariants: {
    variant: "body",
    tone: "default",
  },
});

export interface TextProps extends RNTextProps, VariantProps<typeof textStyles> {
  className?: string;
}

/** Texto padrão do design system. Sempre via variant/tone — nunca fontSize/color inline. */
export function Text({ variant, tone, className, ...props }: TextProps) {
  return (
    <RNText
      className={[textStyles({ variant, tone }), className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
