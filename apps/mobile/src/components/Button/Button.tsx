import { Pressable, type PressableProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { Text } from "../Text";

const buttonStyles = cva(
  "flex-row items-center justify-center rounded-md border transition-colors duration-200",
  {
    variants: {
      variant: {
        primary:
          "border-neutral-0/30 bg-neutral-0/15 hover:bg-neutral-0/25 active:bg-neutral-0/30",
        secondary:
          "border-neutral-0/15 bg-neutral-0/5 hover:bg-neutral-0/15 active:bg-neutral-0/20",
        ghost:
          "border-transparent bg-transparent hover:bg-neutral-0/10 active:bg-neutral-0/15",
      },
      size: {
        sm: "px-md py-xs",
        md: "px-lg py-sm",
        lg: "px-xl py-md",
      },
      disabled: {
        true: "opacity-40",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      disabled: false,
    },
  },
);

const labelTone = {
  primary: "default",
  secondary: "default",
  ghost: "default",
} as const;

export interface ButtonProps
  extends Omit<PressableProps, "disabled">,
    VariantProps<typeof buttonStyles> {
  label: string;
  disabled?: boolean;
  className?: string;
}

/** Botão padrão do design system. Variantes: primary / secondary / ghost. */
export function Button({ label, variant = "primary", size, disabled, className, ...props }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      className={[buttonStyles({ variant, size, disabled }), className].filter(Boolean).join(" ")}
      {...props}
    >
      <Text variant="title-sm" tone={labelTone[variant ?? "primary"]}>
        {label}
      </Text>
    </Pressable>
  );
}
