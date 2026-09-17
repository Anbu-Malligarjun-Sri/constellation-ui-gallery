import SplitFlapText from './SplitFlapText.jsx';
import { getSplitFlapTextStyle, type SplitFlapTextStyleProps } from './styles';
import '../shared/create-nonce';

export type SplitFlapTextProps = SplitFlapTextStyleProps & {
  text?: string;
  words?: string[] | string;
  stagger?: number;
  cycleDelay?: number;
  charset?: string;
  flipsPerChar?: number;
  loop?: boolean;
  padTo?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function PegaExtensionsSplitFlapText({
  text = 'LAUNCH READY',
  words = ['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE'],
  flipDuration = 0.12,
  stagger = 0.06,
  cycleDelay = 2400,
  charset = 'alphanumeric',
  flipsPerChar = 8,
  tileColor = '#111827',
  textColor = '#f8fafc',
  tileRadius = 8,
  gap = 6,
  fontSize = 52,
  loop = true,
  padTo = 12,
  className,
  style,
}: SplitFlapTextProps) {
  const normalizedWords = Array.isArray(words) ? words : words.split('|');

  return (
    <SplitFlapText
      text={text}
      words={normalizedWords}
      flipDuration={flipDuration}
      stagger={stagger}
      cycleDelay={cycleDelay}
      charset={charset}
      flipsPerChar={flipsPerChar}
      loop={loop}
      padTo={padTo}
      className={className}
      aria-label={text}
      role="status"
      style={{ ...getSplitFlapTextStyle({ tileColor, textColor, tileRadius, gap, fontSize, flipDuration }), ...style }}
    />
  );
}