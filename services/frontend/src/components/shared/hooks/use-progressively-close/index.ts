import { useEffect, useCallback } from 'react';
import { ESCAPE_KEY } from './constants';

type UseProgressivelyCloseProps = {
  onClose: () => void;
  disableClose?: boolean;
  targetRef?: React.RefObject<HTMLElement>;
};

export function useProgressivelyClose({
  onClose,
  disableClose = false,
  targetRef,
}: UseProgressivelyCloseProps) {
  const onClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isClickOutside =
        targetRef?.current && !targetRef.current.contains(target);

      if (!isClickOutside) return;
      event.stopPropagation();
      onClose();
    },
    [onClose, targetRef]
  );
  const onKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== ESCAPE_KEY) return;
      event.stopPropagation();
      onClose();
    },
    [onClose]
  );
  useEffect(() => {
    if (disableClose) return;

    document.addEventListener('keydown', onKeydown, true);
    document.addEventListener('click', onClickOutside, true);

    return () => {
      document.removeEventListener('keydown', onKeydown, true);
      document.removeEventListener('click', onClickOutside, true);
    };
  }, [disableClose, onClose, onClickOutside, onKeydown]);
}

export default useProgressivelyClose;
