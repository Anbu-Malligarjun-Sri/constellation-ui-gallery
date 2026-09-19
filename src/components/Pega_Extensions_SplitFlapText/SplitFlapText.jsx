import { useEffect, useMemo, useRef, useState } from 'react';
import './SplitFlapText.css';

const CHARSETS = {
  alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  numeric: '0123456789'
};

const resolveCharset = charset => {
  if (CHARSETS[charset]) return CHARSETS[charset];
  return typeof charset === 'string' && charset.length > 0 ? charset : CHARSETS.alphanumeric;
};

const normalizePhrase = (phrase, width) => {
  const safe = String(phrase ?? '');
  return safe.padEnd(width, ' ').slice(0, width);
};

let nextTileId = 0;

const createTiles = phrase =>
  phrase.split('').map(char => ({
    id: `tile-${nextTileId++}`,
    current: char,
    next: char,
    flipping: false,
    tick: 0
  }));

const sampleChar = charset => charset.charAt(Math.floor(Math.random() * charset.length)) || ' ';

const buildSequence = (target, flips, charset) => {
  const steps = [];
  for (let i = 0; i < flips; i += 1) {
    steps.push(sampleChar(charset));
  }
  steps.push(target);
  return steps;
};

const SplitFlapText = ({
  text,
  flipDuration = 0.12,
  stagger = 0.06,
  charset = 'alphanumeric',
  flipsPerChar = 8,
  className = '',
  style = {},
  ...props
}) => {
  const prefersReducedMotion = false;
  const rafRef = useRef(null);
  const currentTextRef = useRef('');

  const phrases = useMemo(() => {
    if (typeof text === 'string' && text.length > 0) return [text];
    return ['HELLO'];
  }, [text]);

  const width = useMemo(() => {
    if (typeof text === 'string') return text.length;
    return phrases.reduce((max, phrase) => Math.max(max, phrase.length), 1);
  }, [text, phrases]);

  const normalizedPhrases = useMemo(
    () => phrases.map(phrase => normalizePhrase(phrase, width)),
    [phrases, width]
  );

  const [tiles, setTiles] = useState(() => createTiles(normalizedPhrases[0] || ''));

  useEffect(() => {
    const clearAnimation = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    clearAnimation();

    const firstPhrase = normalizedPhrases[0] || '';
    currentTextRef.current = normalizePhrase('', width);
    setTiles(createTiles(currentTextRef.current));
    let cancelled = false;

    const safeFlipMs = Math.max(40, flipDuration * 1000);
    const safeStaggerMs = Math.max(0, stagger * 1000);
    const safeFlips = Math.max(0, Math.floor(flipsPerChar));
    const activeCharset = resolveCharset(charset);

    const animateTo = targetPhrase => {
      if (prefersReducedMotion) {
        setTiles(createTiles(targetPhrase));
        currentTextRef.current = targetPhrase;
        return 0;
      }

      const fromPhrase = normalizePhrase(currentTextRef.current, width);
      const targetChars = targetPhrase.split('');

      const plans = targetChars
        .map((targetChar, index) => {
          const fromChar = fromPhrase[index] || ' ';
          if (fromChar === targetChar) return null;

          return {
            index,
            from: fromChar,
            target: targetChar,
            sequence: buildSequence(targetChar, safeFlips, activeCharset),
            start: index * safeStaggerMs,
            step: -1,
            done: false
          };
        })
        .filter(Boolean);

      const startedAt = performance.now();

      const tick = now => {
        if (cancelled) return;

        const elapsed = now - startedAt;
        const updates = [];

        plans.forEach(plan => {
          const localElapsed = elapsed - plan.start;
          const step = Math.floor(localElapsed / safeFlipMs);

          if (step < plan.sequence.length) {
            updates.push({
              index: plan.index,
              current: step === 0 ? plan.from : plan.sequence[step - 1],
              next: plan.sequence[step],
              done: false
            });
          }
        });

        if (updates.length > 0) {
          setTiles(prev => {
            const next = [...prev];
            updates.forEach(u => {
              next[u.index] = {
                id: prev[u.index].id,
                current: u.current,
                next: u.next,
                flipping: true,
                tick: prev[u.index].tick + 1
              };
            });
            return next;
          });
        } else {
          currentTextRef.current = targetPhrase;
          setTiles(prev =>
            prev.map(tile => ({
              ...tile,
              current: tile.next,
              flipping: false
            }))
          );
          rafRef.current = null;
          return;
        }

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    animateTo(firstPhrase);

    return () => {
      cancelled = true;
      clearAnimation();
    };
  }, [charset, flipDuration, flipsPerChar, normalizedPhrases, prefersReducedMotion, stagger, width]);

  return (
    <div className={`split-flap-text ${className}`} style={style} {...props}>
      {tiles.map(tile => (
        <span key={tile.id} className="split-flap-text__tile" aria-hidden="true">
          <span className="split-flap-text__half split-flap-text__half--top">
            <span className="split-flap-text__char">{tile.current}</span>
          </span>
          <span className="split-flap-text__half split-flap-text__half--bottom">
            <span className="split-flap-text__char">{tile.next}</span>
          </span>
          {tile.flipping && (
            <>
              <span key={`${tile.id}-front-${tile.tick}`} className="split-flap-text__flap split-flap-text__flap--front">
                <span className="split-flap-text__char">{tile.current}</span>
              </span>
              <span key={`${tile.id}-back-${tile.tick}`} className="split-flap-text__flap split-flap-text__flap--back">
                <span className="split-flap-text__char">{tile.next}</span>
              </span>
            </>
          )}
        </span>
      ))}
    </div>
  );
};

export default SplitFlapText;