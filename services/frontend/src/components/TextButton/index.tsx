import type { Color } from './constants';
import { THEME_CONFIG } from './constants';

export type TextButtonProps = {
  color?: Color;
  children: string;
  onClick: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function TextButton({
  children,
  color = 'primary',
  onClick,
  className = '',
  ...attributes
}: TextButtonProps) {
  return (
    <button
      className={`${THEME_CONFIG[color]} ${className} px-0`}
      {...attributes}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
