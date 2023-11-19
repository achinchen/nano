type SwitchProps = {
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
};

export default function Switch({
  checked,
  onChange,
  disabled = false,
}: SwitchProps) {
  const onClick = () => {
    if (disabled) return;
    onChange();
  };

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      className={`relative inline-block h-7 w-12 border-2 border-solid duration-100 border-rounded-3xl cursor-pointer ${
        checked
          ? disabled
            ? 'bg-primary-200 border-primary-200'
            : 'bg-primary-500 border-primary-500'
          : disabled
          ? ' bg-zinc-900 opacity-5 border-zinc-900'
          : ' bg-zinc-900 opacity-20 border-zinc-900'
      }`}
      onClick={onClick}
    >
      <span
        className={`absolute top-0 h-6 w-6 rounded-50% bg-white duration-150 shadow-default
        ${checked ? 'left-0' : 'translate-x-100% left--1'}
        `}
      />
    </div>
  );
}
