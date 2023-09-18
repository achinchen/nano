const BASE_CLASS_NAMES =
  'text-base appearance-none outline-none border-none rounded-2.5 min-w-20 px-3 py-1 flex-1 inline-flex items-center justify-center font-normal transition duration-150 ease-in-out cursor-pointer';

export const CONTAINER = {
  active: `bg-primary-500 color-white shadow-default color-opacity-100 ${BASE_CLASS_NAMES}`,
  inactive: `bg-white color-zinc-400 hover:color-primary-500 hover:bg-zinc-50 hover:opacity-100 active:color-primary-500 active:bg-zinc-100 active:opacity-100 ${BASE_CLASS_NAMES}`,
};
