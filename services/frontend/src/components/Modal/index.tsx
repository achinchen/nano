import type { MouseEvent } from 'react';
import { Fragment } from 'react';
import IconButton from '~frontend/components/IconButton';

export type ModalProps = React.PropsWithChildren<{
  onClose: () => void;
  className?: string;
  hasCloseButton?: boolean;
  clickOutsideToClose?: boolean;
}>;

export function Modal({
  onClose,
  className = '',
  hasCloseButton = true,
  clickOutsideToClose = true,
  children,
}: ModalProps) {
  const onModalClick = (event: MouseEvent) => event.stopPropagation();
  const onCloseBackdrop = () => clickOutsideToClose && onClose?.();

  return (
    <Fragment>
      <div
        role="presentation"
        className="fixed left-0 top-0 z-2 h-screen w-screen bg-gray-4 bg-opacity-30 backdrop-blur-4"
        onClick={onCloseBackdrop}
      />
      <dialog
        open
        className={`flex flex-col absolute w-screen h-screen sm:h-auto top-1/2 translate-y--1/2 z-3 pa-0 border-none sm:rounded-4 shadow-dialog ${className}`}
        onClick={onModalClick}
      >
        {hasCloseButton && (
          <IconButton
            className="absolute right-3 top-3 sm:right-2 sm:top-2"
            icon="i-custom-close"
            size="sm"
            color="dark"
            variant="text"
            rounded
            onClick={onClose}
          />
        )}
        {children}
      </dialog>
    </Fragment>
  );
}

export default Modal;
