import Img from 'next/image';
export const SIZES = ['sm', 'base', 'lg'] as const;

export type Size = (typeof SIZES)[number];

export type AvatarProps = {
  size?: Size;
  className?: string;
  src: string;
};

const SIZE_CONFIG: Record<Size, string> = {
  sm: 'w-6 h-6',
  base: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function Avatar({ size = 'base', className = '', src }: AvatarProps) {
  return (
    <picture
      className={`inline-flex rounded-50% overflow-hidden ${SIZE_CONFIG[size]} ${className}`}
    >
      <Img className="h-100% w-100% flex-1" src={src} alt="avatar" />
    </picture>
  );
}

export default Avatar;
