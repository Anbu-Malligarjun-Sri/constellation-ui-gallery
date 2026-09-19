import SplitFlapText from './SplitFlapText.jsx';
import { getSplitFlapTextStyle, type SplitFlapTextStyleProps } from './styles';
import '../shared/create-nonce';

export type SplitFlapTextProps = SplitFlapTextStyleProps & {
  text?: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function PegaExtensionsSplitFlapText({
  text = 'LAUNCH READY',
  tileColor = '#111827',
  textColor = '#f8fafc',
  tileRadius = 8,
  gap = 6,
  fontSize = 52,
  className,
  style,
}: SplitFlapTextProps) {
  return (
    <SplitFlapText
      text={text}
      className={className}
      aria-label={text}
      role="status"
      style={{ ...getSplitFlapTextStyle({ tileColor, textColor, tileRadius, gap, fontSize }), ...style }}
    />
  );
}