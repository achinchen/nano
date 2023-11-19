import Icon from '~frontend/components/Icon';
import { ENTER_KEY } from './constants';

export type CheckboxProps = {
  value: string;
  title?: string;
  subtitle?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: string, checked: boolean) => void;
};

export default function Checkbox({
  value,
  subtitle = '',
  title,
  checked,
  disabled = false,
  onChange,
}: CheckboxProps) {
  const toggleChange = () => onChange(value, !checked);

  const onClick = () => {
    if (disabled) return;
    toggleChange();
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (disabled) return;
    if (event.key !== ENTER_KEY) return;
    toggleChange();
  };
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <label
      className="mb-4 flex flex-row cursor-pointer flex-items-start"
      onClick={onClick}
    >
      <span
        role="checkbox"
        aria-checked={checked}
        className={`mr-1 flex ${
          disabled
            ? 'color-zinc-200'
            : 'color-primary-500 hover:color-primary-600 active:color-primary-800'
        }`}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={onKeyDown}
      >
        <Icon
          size="2xl"
          icon={
            checked
              ? 'i-solar-check-square-bold'
              : 'i-solar-check-square-outline'
          }
        />
      </span>
      {title && (
        <span className="flex flex-col font-normal">
          <span className="color-zinc-700">{title}</span>
          {subtitle && (
            <span className="text-sm color-zinc-500">{subtitle}</span>
          )}
        </span>
      )}
    </label>
  );
}
