import type { Color } from './constants';
import { THEME_CONFIG } from './constants';

export type TextButtonProps = {
  color?: Color;
  children: string;
  onClick: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function TextButton({
  children,
  color = 'primary',
  onClick,
  className = '',
  ...attributes
}: TextButtonProps) {
  return (
    <button
      className={`${THEME_CONFIG[color]} ${className}`}
      {...attributes}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default TextButton;
