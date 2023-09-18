const CONTAINER_CLASS =
  'relative inline-block h-7 w-12 border-2 border-solid duration-100 border-rounded-3xl cursor-pointer';
export const CONTAINER_CLASS_UNCHECKED = `${CONTAINER_CLASS} bg-zinc-900 opacity-20 border-zinc-900`;
export const CONTAINER_CLASS_CHECKED = `${CONTAINER_CLASS} bg-primary-500 border-primary-500`;

const BUTTON_CLASS =
  'absolute top-0 h-6 w-6 rounded-50% bg-white duration-150 shadow-default';
export const BUTTON_CLASS_UNCHECKED = `${BUTTON_CLASS} translate-x-100% left--1`;
export const BUTTON_CLASS_CHECKED = `${BUTTON_CLASS} left-0`;
