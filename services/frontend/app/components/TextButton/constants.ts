export const COLORS = ['primary', 'dark'] as const;

export type Color = (typeof COLORS)[number];

type ThemeConfig = {
  [key in Color]: string;
};

export const THEME_CONFIG: ThemeConfig = {
  primary: 'color-primary-500 active:color-primary-800 hover:color-primary-600',
  dark: 'color-zinc-700 active:color-zinc-900 hover:color-zinc-800',
};
