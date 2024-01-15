import { useEffect } from 'react';

export default function useBg(url: string) {
  useEffect(() => {
    document.documentElement.style.setProperty('--bg-url', `url(${url})`);
  }, [url]);
}
