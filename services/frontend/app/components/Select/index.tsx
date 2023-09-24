import type { SelectOption } from './types';
import { useState, useEffect, useMemo } from 'react';
import { Input } from '~frontend/components/Input';
import { Options } from './Options';
import { DEFAULT_PLACEHOLDER, NO_OPTIONS_LABEL } from './constants';

export type SelectProps = {
  value: string;
  options: SelectOption[];
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  prefixIcon?: string;
  suffixIcon?: string;
  noOptionsLabel?: string;
  filterable?: boolean;
  children?: React.ReactNode[];
  optionCenter?: boolean;
};

export function Select({
  value,
  children,
  options,
  onValueChange,
  placeholder = DEFAULT_PLACEHOLDER,
  disabled = false,
  prefixIcon = '',
  className = '',
  noOptionsLabel = NO_OPTIONS_LABEL,
  filterable = false,
  optionCenter,
  ...attributes
}: SelectProps) {
  const [opened, setOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>([]);
  const [inputKeyword, setInputKeyword] = useState<string | null>(null);

  const toggleOpened = () => {
    if (disabled) return;
    setOpened((opened) => !opened);
  };

  const suffixIcon = useMemo(() => {
    return opened
      ? 'i-solar-alt-arrow-up-linear'
      : 'i-solar-alt-arrow-down-linear';
  }, [opened]);

  const inputValue = useMemo(() => {
    return inputKeyword ?? (selectedOption?.label || '');
  }, [inputKeyword, selectedOption]);

  useEffect(() => {
    if (!inputKeyword) {
      setFilteredOptions(options);
      return;
    }
    const filteredOptions = options.filter((option) =>
      option.label.includes(inputKeyword)
    );
    setFilteredOptions(filteredOptions);
  }, [inputKeyword, options]);

  useEffect(() => {
    if (!value || !filteredOptions.length) return;

    const option = filteredOptions.find((option) => option.value === value);
    if (!option) return;
    setSelectedOption(option);
  }, [filteredOptions, value]);

  const onOptionClick = (option: SelectOption) => () => {
    setSelectedOption(option);
    setInputKeyword(null);
    setOpened(false);
    onValueChange?.(option.value);
  };

  const onClose = () => {
    setOpened(false);
  };

  return (
    <div className="relative">
      <div
        role="button"
        tabIndex={0}
        onClick={toggleOpened}
        className="box-content"
      >
        <Input
          value={inputValue}
          disabled={disabled}
          readOnly={!filterable}
          className={className}
          placeholder={placeholder}
          prefixIcon={prefixIcon}
          suffixIcon={suffixIcon}
          onValueChange={setInputKeyword}
          {...attributes}
        />
      </div>
      {opened && (
        <Options
          value={value}
          options={filteredOptions}
          noOptionsLabel={noOptionsLabel}
          onOptionClick={onOptionClick}
          onClose={onClose}
          center={optionCenter}
        >
          {children}
        </Options>
      )}
    </div>
  );
}

export default Select;
