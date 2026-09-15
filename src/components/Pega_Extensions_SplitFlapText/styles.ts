import type { CSSProperties } from 'react';

export type SplitFlapTextStyleProps = {
  flipDuration?: number;
  tileColor?: string;
  textColor?: string;
  tileRadius?: number;
  gap?: number;
  fontSize?: number;
};

export const getSplitFlapTextStyle = ({
  flipDuration = 0.12,
  tileColor = '#111827',
  textColor = '#f8fafc',
  tileRadius = 8,
  gap = 6,
  fontSize = 52,
}: SplitFlapTextStyleProps): CSSProperties =>
  ({
    '--split-flap-flip-duration': `${flipDuration}s`,
    '--split-flap-tile-color': tileColor,
    '--split-flap-text-color': textColor,
    '--split-flap-radius': `${tileRadius}px`,
    '--split-flap-gap': `${gap}px`,
    '--split-flap-font-size': `${fontSize}px`,
  }) as CSSProperties;