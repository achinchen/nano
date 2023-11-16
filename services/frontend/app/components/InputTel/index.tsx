import type { InputHTMLAttributes } from 'react';
import Icon from '~frontend/components/Icon';
import IconButton from '~frontend/components/IconButton';

const REGEX = /\d|Backspace|Enter/;

export type InputTelProps = {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  prefixIcon?: string;
  suffixIcon?: string;
  errorMessage?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export function InputTel({
  value,
  onChange,
  onValueChange,
  placeholder,
  disabled = false,
  readOnly = false,
  className = '',
  errorMessage = '',
  prefixIcon,
  suffixIcon,
  maxLength,
  ...attributes
}: InputTelProps) {
  const isError = Boolean(errorMessage);
  const clearable = Boolean(String(value).length);

  const iconColor = disabled ? 'color-neutral-400' : 'color-zinc-700';

  const onClear = () => {
    onChange?.({
      target: {
        value: '',
      },
    } as React.ChangeEvent<HTMLInputElement>);
    onValueChange?.('');
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.key, event.key.match(REGEX));
    if (event.key.match(REGEX)) return;
    event.preventDefault();
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    onValueChange?.(event.target.value);
  };

  return (
    <div>
      <div
        className={`relative flex items-center py-2 px-3 border-solid border-1  rounded-3 overflow-auto focus-within:border-zinc-700  ${
          disabled ? ' bg-zinc-100  cursor-not-allowed' : 'cursor-pointer'
        } ${
          isError
            ? 'border-red-500'
            : 'border-zinc-400 hover:border-zinc-700 active:border-zinc-700 '
        } 
      ${className}`}
      >
        {prefixIcon && (
          <Icon size="base" icon={prefixIcon} className={`mr-2 ${iconColor}`} />
        )}
        <input
          value={value}
          className={`w-full focus:outline-none appearance-none border-none text-sm placeholder:color-zinc-500 color-zinc-700 disabled:color-zinc-400 disabled:bg-transparent ${
            readOnly ? 'cursor-pointer' : ''
          }`}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onInputChange}
          placeholder={placeholder}
          type="tel"
          pattern="\d*"
          autoComplete="tel"
          onKeyDownCapture={onKeyDown}
          {...attributes}
        />
        <IconButton
          className={clearable ? 'visible' : 'invisible'}
          size="xs"
          icon="i-solar-close-circle-outline"
          color="dark"
          variant="text"
          onClick={onClear}
        />
      </div>
      <div className="ma-1 min-h-4 break-words text-xs color-red-500">
        {errorMessage}
      </div>
    </div>
  );
}

export default InputTel;
