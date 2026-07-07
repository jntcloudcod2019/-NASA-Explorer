import { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import "../../design/reanimated-interop";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { textStyles, type TextProps } from "../Text";

export interface TextTypeProps {
  text: string | string[];
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  /** Classes NativeWind de cor (ex: "text-nebula-300"), uma por sentença — nunca cor literal. */
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  reverseMode?: boolean;
  variant?: TextProps["variant"];
  tone?: TextProps["tone"];
  className?: string;
}

/**
 * Efeito de máquina de escrever (digitar/apagar) para textos de destaque.
 * Porte do padrão "TextType" (React Bits) para React Native: sem DOM/CSS/gsap —
 * usa Reanimated (já presente no projeto) para o piscar do cursor.
 */
export function TextType({
  text,
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName,
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  reverseMode = false,
  variant,
  tone,
  className,
}: TextTypeProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const colorClassName = textColors.length > 0 ? textColors[currentTextIndex % textColors.length] : undefined;

  const cursorOpacity = useSharedValue(1);
  useEffect(() => {
    if (!showCursor) return;
    cursorOpacity.value = withRepeat(
      withTiming(0, { duration: cursorBlinkDuration * 1000 }),
      -1,
      true,
    );
  }, [showCursor, cursorBlinkDuration, cursorOpacity]);
  const cursorAnimatedStyle = useAnimatedStyle(() => ({ opacity: cursorOpacity.value }));

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode ? currentText.split("").reverse().join("") : currentText;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === "") {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) return;
          onSentenceComplete?.(textArray[currentTextIndex], currentTextIndex);
          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else if (currentCharIndex < processedText.length) {
        timeout = setTimeout(
          () => {
            setDisplayedText((prev) => prev + processedText[currentCharIndex]);
            setCurrentCharIndex((prev) => prev + 1);
          },
          variableSpeed ? getRandomSpeed() : typingSpeed,
        );
      } else if (!loop && currentTextIndex === textArray.length - 1) {
        return;
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
    getRandomSpeed,
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

  return (
    <View className={["flex-row flex-wrap items-center", className].filter(Boolean).join(" ")}>
      <Animated.Text className={[textStyles({ variant, tone }), colorClassName].filter(Boolean).join(" ")}>
        {displayedText}
      </Animated.Text>
      {showCursor && !shouldHideCursor && (
        <Animated.Text
          style={cursorAnimatedStyle}
          className={[textStyles({ variant, tone }), "ml-xs", cursorClassName].filter(Boolean).join(" ")}
        >
          {cursorCharacter}
        </Animated.Text>
      )}
    </View>
  );
}
