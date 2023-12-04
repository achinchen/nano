import { ENTER_KEY } from './constants';

type Option = {
  value: string;
  title?: string;
  subtitle?: string;
  disabled?: boolean;
};

export type RadioGroupProps = {
  direction?: 'vertical' | 'horizontal';
  value?: string;
  options: Option[];
  onChange: (value: string) => void;
  renderChildren?: (payload: Option & { index: number }) => React.ReactNode;
};

export default function RadioGroup({
  direction = 'vertical',
  value: currentValue,
  options,
  onChange,
  renderChildren,
}: RadioGroupProps) {
  const onOptionChosen = (value: string) => onChange(value);

  const onKeyDown =
    (disabled: Option['disabled'], value: Option['value']) =>
    (event: React.KeyboardEvent<HTMLLabelElement>) => {
      if (disabled) return;
      if (event.key !== ENTER_KEY) return;
      onOptionChosen(value);
    };

  const onClick =
    (disabled: Option['disabled'], value: Option['value']) => () => {
      if (disabled) return;
      onOptionChosen(value);
    };

  return (
    <div
      role="radiogroup"
      className={`flex gap-4 flex-col flex-wrap ${
        direction === 'horizontal' ? 'sm:flex-row' : ''
      }
  `}
    >
      {options.map((option, index) => {
        const { value, title, subtitle, disabled } = option;

        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <label
            key={value}
            className="flex flex-row cursor-pointer"
            onClick={onClick(disabled, value)}
          >
            <span
              role="radio"
              aria-checked={value === currentValue}
              className={`mr-1 h-5 w-5 flex items-center justify-center rounded-full ${
                disabled
                  ? 'bg-zinc-200'
                  : 'bg-primary-500 active:bg-primary-800 hover:bg-primary-600'
              }`}
              tabIndex={disabled ? -1 : 0}
              onKeyDown={onKeyDown(disabled, value)}
            >
              <span
                className={`h-4 w-4 border-2 border-color-white rounded-full border-solid ${
                  value === currentValue ? 'bg-inherit' : 'bg-white'
                }`}
              />
            </span>
            {renderChildren?.({ ...option, index }) ||
              (title && (
                <span className="flex flex-col font-normal">
                  <span className="color-zinc-700">{title}</span>
                  {subtitle && (
                    <span className="text-sm color-zinc-500">{subtitle}</span>
                  )}
                </span>
              ))}
          </label>
        );
      })}
    </div>
  );
}
