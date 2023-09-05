import type { Color, Variant, Size } from './constants';
import type { ButtonHTMLAttributes } from 'react';
import { Icon } from '~frontend/components/Icon';
import { THEME_CONFIG, SIZE_CONFIG, LOADING_ICON } from './constants';

export type ButtonProps = {
  children?: React.ReactNode;
  color?: Color;
  prefixIcon?: string;
  suffixIcon?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  size?: Size;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  color = 'primary',
  prefixIcon,
  suffixIcon,
  loading = false,
  disabled = false,
  onClick,
  children,
  variant = 'solid',
  size = 'md',
  className = '',
  style,
  ...attributes
}: ButtonProps) {
  const themeConfig = THEME_CONFIG[color][variant];
  const sizeConfig = SIZE_CONFIG[size];

  const classNames = [sizeConfig.container, themeConfig, className].join(' ');

  const onButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (loading) return;
    onClick(event);
  };

  return (
    <button
      className={classNames}
      disabled={disabled}
      onClick={onButtonClick}
      {...attributes}
    >
      <span className="inline-flex items-center justify-center">
        {loading ? (
          <Icon icon={LOADING_ICON} size={sizeConfig.icon} className="mr-2" />
        ) : prefixIcon ? (
          <Icon icon={prefixIcon} size={sizeConfig.icon} className="mr-2" />
        ) : null}
        {children}
      </span>
    </button>
  );
}

export default Button;
