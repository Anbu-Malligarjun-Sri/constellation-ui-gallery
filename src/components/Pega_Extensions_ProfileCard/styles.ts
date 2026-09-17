import styled, { css } from 'styled-components';

export const ProfileCardShell = styled.article<{ enableTilt: boolean }>(({ theme, enableTilt }) => css`
  --profile-card-accent: ${theme.base.palette['brand-primary']};
  --profile-card-surface: ${theme.base.palette['background-color']};
  position: relative;
  width: min(100%, 24rem);
  min-height: 32rem;
  overflow: hidden;
  isolation: isolate;
  border: 0.0625rem solid ${theme.base.palette['border-line']};
  border-radius: 1.5rem;
  background: linear-gradient(145deg, color-mix(in srgb, var(--profile-card-accent) 18%, var(--profile-card-surface)), var(--profile-card-surface) 64%);
  box-shadow: 0 1.25rem 2.5rem rgba(17, 24, 39, 0.18);
  transform-style: preserve-3d;
  transform: perspective(900px) rotateX(var(--profile-card-rotate-y, 0deg)) rotateY(var(--profile-card-rotate-x, 0deg));
  transition: transform 180ms ease, box-shadow 180ms ease;

  ${enableTilt && css`
    &:hover {
      box-shadow: 0 1.75rem 3.5rem rgba(17, 24, 39, 0.24);
    }
  `}

  &::before {
    position: absolute;
    inset: -35%;
    z-index: -1;
    content: '';
    background: radial-gradient(circle at var(--profile-card-pointer-x, 50%) var(--profile-card-pointer-y, 20%), color-mix(in srgb, var(--profile-card-accent) 36%, transparent), transparent 38%);
    filter: blur(2rem);
    opacity: 0.75;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`);

export const ProfileCardImageFrame = styled.div`
  position: relative;
  height: 21rem;
  overflow: hidden;
  background: linear-gradient(145deg, #182338, #526b91);

  &::after {
    position: absolute;
    inset: 0;
    content: '';
    background: linear-gradient(180deg, transparent 46%, rgba(5, 10, 20, 0.72));
    pointer-events: none;
  }
`;

export const ProfileCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: saturate(0.88) contrast(1.04);
  transition: transform 500ms ease, filter 500ms ease;

  ${ProfileCardShell}:hover & {
    transform: scale(1.04);
    filter: saturate(1.05) contrast(1.06);
  }
`;

export const ProfileCardFallback = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  color: white;
  font-size: 4.5rem;
  font-weight: 700;
  letter-spacing: 0;
  background: radial-gradient(circle at 35% 25%, #9ec5ff, #31527f 46%, #101b30);
`;

export const ProfileCardImageCaption = styled.div`
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  left: 1.25rem;
  z-index: 1;
  color: white;
`;

export const ProfileCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem 1.35rem 1.4rem;
`;

export const ProfileCardIdentity = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const ProfileCardHandle = styled.span`
  color: color-mix(in srgb, currentColor 68%, transparent);
  font-size: 0.875rem;
`;

export const ProfileCardStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  padding: 0.35rem 0.6rem;
  border: 0.0625rem solid color-mix(in srgb, #238636 30%, transparent);
  border-radius: 999px;
  color: #176b2d;
  font-size: 0.75rem;
  font-weight: 700;
  background: color-mix(in srgb, #8ee09d 24%, transparent);

  &::before {
    width: 0.45rem;
    height: 0.45rem;
    content: '';
    border-radius: 50%;
    background: #238636;
    box-shadow: 0 0 0 0.2rem color-mix(in srgb, #238636 16%, transparent);
  }
`;
