import {
  CONTAINER_CLASS_UNCHECKED,
  CONTAINER_CLASS_CHECKED,
  BUTTON_CLASS_CHECKED,
  BUTTON_CLASS_UNCHECKED,
} from './constants';
type SwitchProps = {
  checked: boolean;
  onChange: () => void;
};

export function Switch({ checked, onChange }: SwitchProps) {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      className={checked ? CONTAINER_CLASS_CHECKED : CONTAINER_CLASS_UNCHECKED}
      onClick={onChange}
    >
      <span
        className={checked ? BUTTON_CLASS_CHECKED : BUTTON_CLASS_UNCHECKED}
      />
    </div>
  );
}
