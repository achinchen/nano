import { useEffect, useMemo } from 'react';

type CounterProps = {
  length: {
    current: number;
    max: HTMLTextAreaElement['maxLength'];
  };
  setValid: (value: boolean) => void;
};

export function Counter({ length, setValid }: CounterProps) {
  const { current, max } = length;

  const valid = useMemo(() => {
    return current <= max;
  }, [current, max]);

  useEffect(() => {
    setValid(valid);
  }, [valid, setValid]);

  return <span className="ml-auto color-zinc-500">{`${current}/${max}`}</span>;
}

export default Counter;
