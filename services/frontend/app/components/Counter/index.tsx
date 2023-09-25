import { useEffect, useMemo } from 'react';

type CounterProps = {
  value: string;
  maxLength: HTMLTextAreaElement['maxLength'];
  setValid: (value: boolean) => void;
};

export function Counter({ value = '', maxLength, setValid }: CounterProps) {
  const current = useMemo(() => {
    if (!value) return 0;
    return [...value].length;
  }, [value]);

  const valid = useMemo(() => {
    return current <= maxLength;
  }, [current, maxLength]);

  useEffect(() => {
    setValid(valid);
  }, [valid, setValid]);

  return (
    <span className="ml-auto color-zinc-500">{`${current}/${maxLength}`}</span>
  );
}

export default Counter;
