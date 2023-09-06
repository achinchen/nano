import type { Size as IconSize } from '~frontend/components/Icon';
export const COLORS = ['primary', 'dark'] as const;
export const VARIANTS = ['solid', 'outline', 'text'] as const;
export const SIZES = ['sm', 'md'] as const;
export const LOADING_ICON = 'i-svg-spinners-180-ring';

export type Color = (typeof COLORS)[number];
export type Variant = (typeof VARIANTS)[number];
export type Size = (typeof SIZES)[number];

type ThemeConfig = {
  [key in Color]: {
    [key in Variant]: string;
  };
};

type SizeConfig = {
  [key in Size]: {
    container: string;
    icon: IconSize;
    rounded: string;
  };
};

const SOLID_CLASS_NAME = 'color-light color-opacity-100';
const OUTLINE_CLASS_NAME = 'bg-white';
const TEXT_CLASS_NAME =
  'border-transparent bg-transparent active:bg-dark active:bg-opacity-20 hover:bg-dark hover:bg-opacity-5';

export const THEME_CONFIG: ThemeConfig = {
  primary: {
    solid: `border-primary-500 bg-primary-500 active:bg-primary-800 active:border-primary-800 hover:bg-primary-600 hover:border-primary-600 disabled:border-primary-200 disabled:bg-primary-200 ${SOLID_CLASS_NAME}`,
    outline: `border-primary-500 color-primary-500 active:color-primary-800 active:border-primary-800 active:bg-primary-200 hover:color-primary-600 hover:border-primary-600 hover:bg-primary-100 disabled:border-primary-200 disabled:color-primary-200 ${OUTLINE_CLASS_NAME}`,
    text: `color-primary-500 active:color-primary-800 hover:color-primary-600 disabled:color-primary-200 ${TEXT_CLASS_NAME}`,
  },
  dark: {
    solid: `border-zinc-700 bg-zinc-700 active:bg-zinc-900 active:border-zinc-900 hover:bg-zinc-800 hover:border-zinc-800 disabled:border-zinc-200 disabled:bg-zinc-200 ${SOLID_CLASS_NAME}`,
    outline: `border-zinc-500 color-zinc-700 active:color-zinc-900 active:border-zinc-500 active:bg-dark active:bg-opacity-20 hover:color-zinc-800 hover:border-zinc-500 hover:bg-dark hover:bg-opacity-5 disabled:border-zinc-200 disabled:color-zinc-200 ${OUTLINE_CLASS_NAME}`,
    text: `color-zinc-700 active:color-zinc-900 hover:color-zinc-800 disabled:color-zinc-200 ${TEXT_CLASS_NAME}`,
  },
};

const BASE_SIZE_CLASS_NAMES =
  'text-3 p-0.25 cursor-pointer appearance-none border rounded border-solid outline-none transition duration-150 ease-in-out disabled:cursor-not-allowed focus:outline-none';

export const SIZE_CONFIG: SizeConfig = {
  sm: {
    container: `min-h-9 min-w-9 ${BASE_SIZE_CLASS_NAMES}`,
    icon: 'xl',
    rounded: 'rounded-3',
  },
  md: {
    container: `min-h-12 min-w-12 ${BASE_SIZE_CLASS_NAMES}`,
    icon: '2xl',
    rounded: 'rounded-4',
  },
};
