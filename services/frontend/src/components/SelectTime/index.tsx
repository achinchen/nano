import Select from '~frontend/components/Select';
import { UNITS, OPTION_BY_UNIT } from './constants';

export type SelectTimeProps = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  unit?: (typeof UNITS)[number];
};

export default function SelectTime({
  onValueChange,
  disabled = false,
  unit = 'hour',
  value,
  ...attributes
}: SelectTimeProps) {
  const options = OPTION_BY_UNIT[unit];

  return (
    <Select
      {...attributes}
      options={options}
      value={value}
      onValueChange={onValueChange}
      center
      clearable
    />
  );
}
