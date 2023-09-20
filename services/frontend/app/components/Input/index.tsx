import type { InputHTMLAttributes } from 'react';
import { useState } from 'react';
import Icon from '~frontend/components/Icon';
import IconButton from '~frontend/components/IconButton';
import Counter from '~frontend/components/Counter';

export type InputProps = {
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
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({
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
}: InputProps) {
  const [valid, setValid] = useState(false);
  const hasErrorMessage = Boolean(errorMessage);
  const isError = hasErrorMessage || !valid;

  const hasHint = maxLength || isError;

  const iconColor = disabled ? 'color-neutral-400' : 'color-zinc-700';

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    onValueChange?.(event.target.value);
  };

  const length = {
    current: value?.length || 0,
    max: maxLength || 0,
  };

  return (
    <div>
      <div
        className={`relative flex items-center py-2 px-3 border-solid border-1 rounded-3 overflow-auto focus-within:border-zinc-700  ${
          disabled ? ' bg-zinc-100  cursor-not-allowed' : 'cursor-pointer'
        } ${
          isError
            ? 'border-red-500'
            : 'border-zinc-400 hover:border-zinc-700 active:border-zinc-700'
        } 
      ${className}`}
      >
        {prefixIcon && (
          <Icon size="base" icon={prefixIcon} className={`mr-2 ${iconColor}`} />
        )}
        <input
          value={value}
          className={`w-full focus:outline-none appearance-none border-none text-sm placeholder:color-zinc-500 color-zinc-700 disabled:color-zinc-400 disabled:bg-transparent 
          ${readOnly ? 'cursor-pointer' : ''}
          `}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onInputChange}
          placeholder={placeholder}
          {...attributes}
        />
        {suffixIcon && (
          <IconButton size="xs" icon={suffixIcon} color="dark" variant="text" />
        )}
      </div>
      {hasHint && (
        <div className="ma-1 flex justify-between text-xs">
          {isError && (
            <div className="flex-auto break-words color-red-500">
              {errorMessage}
            </div>
          )}
          {maxLength && <Counter setValid={setValid} length={length} />}
        </div>
      )}
    </div>
  );
}

export default Input;