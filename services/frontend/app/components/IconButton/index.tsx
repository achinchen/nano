import type { Color, Variant, Size } from './constants';
import { ButtonHTMLAttributes } from 'react';
import { Icon, IconProps } from '~frontend/components/Icon';
import { THEME_CONFIG, SIZE_CONFIG, LOADING_ICON } from './constants';

type IconButtonProps = {
  size?: Size;
  color?: Color;
  variant?: Variant;
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
} & Omit<IconProps, 'size'> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton({
  icon,
  size = 'md',
  color = 'primary',
  variant = 'solid',
  className = '',
  disabled = false,
  rounded = false,
  loading = false,
  ...attributes
}: IconButtonProps) {
  const themeConfig = THEME_CONFIG[color][variant];
  const { icon: iconSize, rounded: sizeRounded, container } = SIZE_CONFIG[size];
  const classNames = [
    container,
    themeConfig,
    rounded ? 'rounded-50%' : sizeRounded,
    className,
  ].join(' ');
  return (
    <button className={classNames} disabled={disabled} {...attributes}>
      {loading ? (
        <Icon icon={LOADING_ICON} size={iconSize} className="ma-auto" />
      ) : (
        <Icon icon={icon} size={iconSize} className="ma-auto" />
      )}
    </button>
  );
}

export default IconButton;
