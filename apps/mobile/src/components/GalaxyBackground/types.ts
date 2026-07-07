/**
 * Props do background "Galaxy" (React Bits — https://reactbits.dev/backgrounds/galaxy).
 * Defaults idênticos ao componente original; ver GalaxyBackground.web.tsx.
 */
export interface GalaxyBackgroundProps {
  /** Ponto focal do efeito como [x, y] de 0 a 1 */
  focal?: [number, number];
  /** Matriz de rotação da galáxia como [x, y] */
  rotation?: [number, number];
  /** Velocidade de movimento das estrelas */
  starSpeed?: number;
  /** Densidade de estrelas */
  density?: number;
  /** Deslocamento de matiz de todas as estrelas em graus (0-360) */
  hueShift?: number;
  /** Pausa todas as animações baseadas em tempo */
  disableAnimation?: boolean;
  /** Multiplicador global de velocidade */
  speed?: number;
  /** Habilita interação com o mouse */
  mouseInteraction?: boolean;
  /** Intensidade do brilho das estrelas */
  glowIntensity?: number;
  /** Saturação de cor (0 = tons de cinza, 1 = cor total) */
  saturation?: number;
  /** Estrelas são repelidas pelo cursor */
  mouseRepulsion?: boolean;
  /** Força da repulsão do mouse */
  repulsionStrength?: number;
  /** Intensidade da cintilação (0 a 1) */
  twinkleIntensity?: number;
  /** Velocidade da rotação automática */
  rotationSpeed?: number;
  /** Repulsão a partir do centro do canvas; sobrepõe a do mouse quando > 0 */
  autoCenterRepulsion?: number;
  /** Fundo transparente (mostra só as estrelas) */
  transparent?: boolean;
  className?: string;
}
