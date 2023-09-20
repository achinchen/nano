import {
  ChangeEvent,
  HTMLAttributes,
  useState,
  useEffect,
  useRef,
} from 'react';
import Counter from '~frontend/components/Counter';
import { LINE_HEIGHT, PADDING_HEIGHT } from './constants';

export type TextareaProps = {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  autoSize?: boolean;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  errorMessage?: string;
  onValueChange: (value: string) => void;
} & HTMLAttributes<HTMLTextAreaElement>;

export function Textarea({
  value,
  placeholder,
  disabled = false,
  autoSize = true,
  minRows = 2,
  maxRows = 5,
  maxLength,
  errorMessage,
  onValueChange,
  ...attrs
}: TextareaProps) {
  const [valid, setValid] = useState(false);
  const hasErrorMessage = Boolean(errorMessage);
  const isError = hasErrorMessage || !valid;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onValueChange(event.target.value);
  };

  const resize = () => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  const length = {
    current: value?.length || 0,
    max: maxLength || 0,
  };

  const getHeightByRows = (rows: number) =>
    `${PADDING_HEIGHT + rows * LINE_HEIGHT}px`;
  const minHeight = getHeightByRows(minRows);
  const maxHeight = getHeightByRows(maxRows);

  useEffect(() => {
    if (!textAreaRef.current) return;
    textAreaRef.current.value = value || '';
    if (autoSize) resize();
  }, [value, autoSize]);

  return (
    <div className="w-full flex flex-col">
      <textarea
        ref={textAreaRef}
        disabled={disabled}
        rows={minRows}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`
          w-full border-1 rounded-3 
           hover:border-zinc-700 active:border-zinc-700 text-sm overflow-auto resize-y px-3 py-2 mb-1 color-zinc-700 placeholder:color-zinc-500 border-zinc-400 
          ${disabled ? 'bg-zinc-100 cursor-not-allowed' : 'cursor-pointer'}
          ${isError ? 'border-red-500' : ''}
          `}
        onChange={onTextAreaChange}
        style={{ minHeight, maxHeight }}
        {...attrs}
      />
      <div className="flex px-2 text-xs">
        {hasErrorMessage && (
          <div className="flex-auto break-words color-red-500">
            {errorMessage}
          </div>
        )}
        {maxLength && <Counter length={length} setValid={setValid} />}
      </div>
    </div>
  );
}
