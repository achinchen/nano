import { Select } from '~frontend/components/Select';
// import { UNITS, OPTION_BY_UNIT } from './constants';
import { DateOptions } from './DateOptions';

export type SelectDateProps = {
  value: Date;
  onValueChange: (value: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function SelectDate({
  onValueChange,
  disabled = false,
  value,
  ...attributes
}: SelectDateProps) {
  return (
    <Select {...attributes} value={value.toDateString()} center options={[]}>
      <div>
        今日
        <DateOptions selectedDate={value} onSelect={onValueChange} />
      </div>
    </Select>
  );
}

export default Select;
