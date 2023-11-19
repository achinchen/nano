import type { InputProps } from '~frontend/components/Input';
import Input from '~frontend/components/Input';

export type InputDateProps = Omit<InputProps, 'type' | 'center'>;

export function InputDate(props: InputDateProps) {
  return <Input type="date" center {...props} />;
}

export default InputDate;
