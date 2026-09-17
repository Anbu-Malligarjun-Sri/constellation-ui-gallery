import { useEffect, useRef, useState } from 'react';
import { Text, withConfiguration } from '@pega/cosmos-react-core';
import { getMappedKey } from '../shared/utils';
import {
  ProfileCardBody,
  ProfileCardFallback,
  ProfileCardHandle,
  ProfileCardIdentity,
  ProfileCardImage,
  ProfileCardImageCaption,
  ProfileCardImageFrame,
  ProfileCardShell,
  ProfileCardStatus,
} from './styles';
import '../shared/create-nonce';

export type ProfileCardProps = {
  name: string;
  title?: string;
  handle?: string;
  status?: string;
  imageProperty?: string;
  imageUrl?: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  className?: string;
  getPConnect: () => typeof PConnect;
};

const isDirectImageSource = (value: string) =>
  /^(data:image\/|blob:|https?:\/\/|\/)/i.test(value) ||
  /^(?:\/9j\/|iVBORw0KGgo|R0lGOD|PHN2Zy)/.test(value);

const getImageSource = (value: unknown): string => {
  if (typeof value === 'string') return value.trim();
  if (!value || typeof value !== 'object') return '';

  const imageObject = value as Record<string, unknown>;
  const candidateKeys = ['url', 'src', 'imageUrl', 'imageURL', 'value', 'content', 'data', 'ID', 'id'];
  for (const key of candidateKeys) {
    const candidate = getImageSource(imageObject[key]);
    if (candidate) return candidate;
  }

  return '';
};

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('') || '?';

export const PegaExtensionsProfileCard = (props: ProfileCardProps) => {
  const {
    name = '',
    title = '',
    handle = '',
    status = '',
    imageProperty = '',
    imageUrl = '',
    showUserInfo = true,
    enableTilt = true,
    enableMobileTilt = false,
    className = '',
    getPConnect,
  } = props;
  const shellRef = useRef<HTMLElement>(null);
  const [resolvedImageUrl, setResolvedImageUrl] = useState(imageUrl);

  useEffect(() => {
    let objectUrl = '';
    let cancelled = false;
    const pConnect = getPConnect();
    const mappedProperty = imageProperty.trim() ? getMappedKey(imageProperty.trim()) : '';
    const propertyValue = mappedProperty ? pConnect.getValue(mappedProperty) : '';
    const imageValue = getImageSource(imageUrl || propertyValue);

    setResolvedImageUrl(
      isDirectImageSource(imageValue)
        ? imageValue.startsWith('data:image/') || imageValue.startsWith('blob:') || imageValue.startsWith('/') || imageValue.startsWith('http')
          ? imageValue
          : `data:image/*;base64,${imageValue}`
        : '',
    );
    if (!imageValue || isDirectImageSource(imageValue)) return undefined;

    const assetLoader = PCore?.getAssetLoader?.();
    if (!assetLoader?.getSvcImage) return undefined;

    assetLoader
      .getSvcImage(imageValue)
      .then((blob: Blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setResolvedImageUrl(objectUrl);
      })
      .catch(() => {
        if (!cancelled) setResolvedImageUrl('');
      });

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [getPConnect, imageProperty, imageUrl]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || !enableTilt) return undefined;

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = shell.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;
      shell.style.setProperty('--profile-card-pointer-x', `${x}%`);
      shell.style.setProperty('--profile-card-pointer-y', `${y}%`);
      shell.style.setProperty('--profile-card-rotate-x', `${((x - 50) / 18).toFixed(2)}deg`);
      shell.style.setProperty('--profile-card-rotate-y', `${((50 - y) / 22).toFixed(2)}deg`);
    };
    const resetTilt = () => {
      shell.style.setProperty('--profile-card-rotate-x', '0deg');
      shell.style.setProperty('--profile-card-rotate-y', '0deg');
    };

    shell.addEventListener('pointermove', handlePointerMove);
    shell.addEventListener('pointerleave', resetTilt);
    return () => {
      shell.removeEventListener('pointermove', handlePointerMove);
      shell.removeEventListener('pointerleave', resetTilt);
    };
  }, [enableTilt]);

  return (
    <ProfileCardShell
      ref={shellRef}
      className={className}
      enableTilt={enableTilt || enableMobileTilt}
      aria-label={`${name}${title ? `, ${title}` : ''}`}
    >
      <ProfileCardImageFrame>
        {resolvedImageUrl ? (
          <ProfileCardImage
            src={resolvedImageUrl}
            alt={`${name || 'Profile'} profile`}
            onError={() => setResolvedImageUrl('')}
          />
        ) : (
          <ProfileCardFallback aria-hidden='true'>{getInitials(name)}</ProfileCardFallback>
        )}
        <ProfileCardImageCaption>
          <Text variant='h2' style={{ color: 'inherit' }}>
            {name}
          </Text>
          {title && <ProfileCardHandle>{title}</ProfileCardHandle>}
        </ProfileCardImageCaption>
      </ProfileCardImageFrame>
      {showUserInfo && (
        <ProfileCardBody>
          <ProfileCardIdentity>
            {handle ? <ProfileCardHandle>@{handle}</ProfileCardHandle> : <span />}
            {status && <ProfileCardStatus>{status}</ProfileCardStatus>}
          </ProfileCardIdentity>
        </ProfileCardBody>
      )}
    </ProfileCardShell>
  );
};

export default withConfiguration(PegaExtensionsProfileCard);
