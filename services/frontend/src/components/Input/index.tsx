import type { InputHTMLAttributes } from 'react';
import { useState } from 'react';
import Icon from '~frontend/components/Icon';
import IconButton from '~frontend/components/IconButton';
import Counter from '~frontend/components/Counter';

export type InputProps = {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  onSuffixClick?: () => void;
  placeholder?: string;
  center?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  prefixIcon?: string;
  suffixIcon?: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  value,
  onChange,
  onValueChange,
  placeholder,
  disabled = false,
  readOnly = false,
  center = false,
  className = '',
  errorMessage = '',
  clearable: propClearable = false,
  onSuffixClick,
  prefixIcon,
  suffixIcon,
  maxLength,
  ...attributes
}: InputProps) {
  const [valid, setValid] = useState(true);
  const hasErrorMessage = Boolean(errorMessage);
  const isError = hasErrorMessage || !valid;
  const iconColor = disabled ? 'color-neutral-400' : 'color-zinc-700';
  const clearable = propClearable && Boolean(value);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (maxLength && event.target.value.length > maxLength) return;
    onChange?.(event);
    onValueChange?.(event.target.value);
  };

  const onClear = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.stopPropagation();
    onChange?.({
      target: {
        value: '',
      },
    } as React.ChangeEvent<HTMLInputElement>);
    onValueChange?.('');
  };

  return (
    <div className={className}>
      <div
        className={`relative flex items-center py-2 px-3 border-solid border-1 rounded-3 overflow-auto focus-within:border-zinc-700  ${
          disabled ? ' bg-zinc-100  cursor-not-allowed' : 'cursor-pointer'
        } ${
          isError
            ? 'border-red-500'
            : 'border-zinc-400 hover:border-zinc-700 active:border-zinc-700'
        } 
      `}
      >
        {prefixIcon && (
          <Icon size="base" icon={prefixIcon} className={`mr-2 ${iconColor}`} />
        )}
        <input
          value={value}
          className={`w-full flex-1 focus:outline-none appearance-none border-none text-sm placeholder:color-zinc-500 color-zinc-700 disabled:color-zinc-400 disabled:bg-transparent 
          ${readOnly ? 'cursor-pointer' : ''}
          ${center ? 'text-center placeholder:text-center' : ''}
          `}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onInputChange}
          placeholder={placeholder}
          {...attributes}
        />
        {clearable ? (
          <IconButton
            className={`${
              clearable ? 'visible' : 'invisible'
            } absolute right-0 translate-x--25%`}
            size="xs"
            icon="i-custom-close"
            color="dark"
            rounded
            variant="text"
            onClick={onClear}
          />
        ) : (
          suffixIcon && (
            <Icon
              size="base"
              icon={suffixIcon}
              className={`${iconColor} absolute right-0 translate-x--50%`}
            />
          )
        )}
      </div>
      <div className="ma-1 min-h-4 flex justify-between text-xs">
        {isError && (
          <div className="flex-auto break-words color-red-500">
            {errorMessage}
          </div>
        )}
        {maxLength ? (
          <Counter setValid={setValid} value={value} maxLength={maxLength} />
        ) : null}
      </div>
    </div>
  );
}
