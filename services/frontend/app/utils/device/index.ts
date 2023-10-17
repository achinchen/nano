import { CSS_VARIABLE } from './constants';

export function getIsMobile(fallback = true) {
  if (typeof window === 'undefined') return fallback;
  const isMobileCSSVariable = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(CSS_VARIABLE);
  if (!isMobileCSSVariable) return fallback;
  return isMobileCSSVariable === 'true';
}
