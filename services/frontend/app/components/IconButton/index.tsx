import type { Color, Variant } from './constants';
import type { Size } from '../Icon';
import { ButtonHTMLAttributes } from 'react';
import { Icon, IconProps } from '~frontend/components/Icon';
import { BUTTON_BASE_CONFIG, THEME_CONFIG } from './constants';

type LoadingProps = { size: Size };

function Loading({ size }: LoadingProps) {
  return (
    <Icon
      icon="i-mdi-loading"
      size={size}
      className="ma-auto rotate-360 animate-spin"
    />
  );
}

type IconButtonProps = {
  size?: Size;
  color?: Color;
  variant?: Variant;
  hasPadding?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
} & IconProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton({
  icon,
  size = 'xl',
  color = 'primary',
  variant = 'solid',
  className = '',
  hasPadding = true,
  disabled = false,
  rounded = false,
  loading = false,
  ...attributes
}: IconButtonProps) {
  const themeConfig = THEME_CONFIG[color][variant];
  const classNames = [
    BUTTON_BASE_CONFIG,
    themeConfig,
    rounded ? (size === 'base' ? 'rounded-3' : 'rounded-4') : '',
    hasPadding && 'p-1.75',
    className,
  ].join(' ');
  return (
    <button className={classNames} disabled={disabled} {...attributes}>
      {loading ? (
        <Loading size={size} />
      ) : (
        <Icon icon={icon} size={size} className="ma-auto" />
      )}
    </button>
  );
}

export default IconButton;
