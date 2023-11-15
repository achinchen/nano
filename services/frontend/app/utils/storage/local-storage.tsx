
export function getLocalStorage(key: string) {
  const payload = localStorage.getItem(key);
  if (!payload) return null;
  return JSON.parse(payload);
}

export function setLocalStorage(key: string, payload: any) {
  localStorage.setItem(key, payload ? JSON.stringify(payload) : '');
}

export class ScopedLocalStorage {
  constructor(public scope: string) {
    this.scope = scope;
  }

  private getScopedKey(key: string) {
    return `${this.scope}:${key}`;
  }

  public get(key: string) {
    return getLocalStorage(this.getScopedKey(key));
  }

  public set(key: string, payload: any) {
    setLocalStorage(this.getScopedKey(key), payload);
  }
}
