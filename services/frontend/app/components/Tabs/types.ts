export type Value = string | number | null;
export type ContextState = {
  defaultValue: Value;
  current: Value;
  setCurrent: (value: Value) => void;
  onChange: (value?: Value) => void;
};
