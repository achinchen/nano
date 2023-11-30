import { forwardRef } from 'react';

export const SIZES = ['base', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'] as const;

export type Size = (typeof SIZES)[number];

export type IconProps = {
  icon: string;
  size?: Size;
  className?: string;
} & JSX.IntrinsicElements['span'];

const SIZE_CONFIG: Record<Size, string> = {
  base: 'text-4',
  xl: 'text-5',
  '2xl': 'text-6',
  '3xl': 'text-7',
  '4xl': 'text-8',
  '5xl': 'text-9',
  '6xl': 'text-10',
};

export default function Icon({
  icon,
  size = 'base',
  className = '',
  ...attributes
}: IconProps) {
  const fontSize = SIZE_CONFIG[size];
  return (
    <span
      role="img"
      aria-label="icon-label"
      className={`inline-block vertical-middle leading-6 lg:drop-shadow ${fontSize} ${icon} ${className}`}
      {...attributes}
    />
  );
}

export const IconWithRef = forwardRef<HTMLSpanElement, IconProps>(
  (
    { icon, size = 'base', className = '', ...attributes }: IconProps,
    ref: React.Ref<HTMLElement>
  ) => {
    const fontSize = SIZE_CONFIG[size];
    return (
      <span
        role="img"
        aria-label="icon-label"
        className={`inline-block vertical-middle leading-6 lg:drop-shadow ${fontSize} ${icon} ${className}`}
        ref={ref}
        {...attributes}
      />
    );
  }
);
IconWithRef.displayName = 'IconWithRef';
