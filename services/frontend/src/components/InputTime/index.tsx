import type { InputProps } from '~frontend/components/Input';
import Input from '~frontend/components/Input';
import { ERROR_PLACEHOLDER } from './constants';

export type InputTimeProps = Omit<
  InputProps,
  'type' | 'center' | 'errorMessage'
> & {
  invalid?: boolean;
};

export function InputTime({ invalid, ...props }: InputTimeProps) {
  return (
    <Input
      type="time"
      center
      {...props}
      errorMessage={invalid ? ERROR_PLACEHOLDER : ''}
    />
  );
}

export default InputTime;
