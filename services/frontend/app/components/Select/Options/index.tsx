import type { SelectOption } from '~frontend/components/Select/types';
import { useRef } from 'react';
import { useProgressivelyClose } from '~frontend/components/shared/hooks/use-progressively-close';

export type OptionsProps = {
  value: string;
  options: SelectOption[];
  noOptionsLabel: string;
  onOptionClick: (option: SelectOption) => () => void;
  onClose: () => void;
  children?: React.ReactNode[];
  center?: boolean;
};

export function Options({
  value,
  options,
  noOptionsLabel,
  onOptionClick,
  onClose,
  children,
  center,
}: OptionsProps) {
  const optionsRef = useRef<HTMLDivElement>(null);
  const withoutOptions = options.length === 0;
  useProgressivelyClose({
    onClose,
    targetRef: optionsRef,
  });

  return (
    <div ref={optionsRef}>
      {children || (
        <ul
          className={`absolute top-full z-1 m-0 max-h-80 w-full list-none overflow-y-scroll border border-gray-300 rounded-b-md bg-white px-0 py-2 shadow-md ${
            center ? ' text-center' : 'text-left'
          }`}
          role="listbox"
        >
          {withoutOptions ? (
            <li className="px-4 py-2 text-sm text-neutral-500">
              {noOptionsLabel}
            </li>
          ) : (
            options.map((option) => (
              <li
                key={option.value}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                onClick={onOptionClick(option)}
                onKeyDown={onOptionClick(option)}
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default Options;
