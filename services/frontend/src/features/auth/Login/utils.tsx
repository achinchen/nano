import { ScopedLocalStorage } from '~frontend/utils/storage/local-storage';

const FEATURE_SCOPED = 'auth';
const KEY = 'prev-path';

const scopedLocalStorage = new ScopedLocalStorage(FEATURE_SCOPED);

export function getAuthPrevPath() {
  return scopedLocalStorage.get(KEY);
}

export function settAuthPrevPath(payload: string) {
  return scopedLocalStorage.set(KEY, payload);
}

export function removeAuthPrevPath() {
  return scopedLocalStorage.set(KEY, '');
}
