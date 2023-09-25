import type { MouseEvent } from 'react';
import { Fragment } from 'react';
import { IconButton } from '~frontend/components/IconButton';

export type ModalProps = React.PropsWithChildren<{
  onClose?: () => void;
  title?: string;
  className?: string;
  hasCloseButton?: boolean;
  clickOutsideToClose?: boolean;
  footer?: JSX.Element;
}>;

export function Modal({
  onClose,
  title = '',
  className = '',
  hasCloseButton = true,
  clickOutsideToClose = true,
  children,
  footer,
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
        className={`flex flex-col absolute w-screen sm:max-w-100 h-screen sm:h-auto top-1/2 translate-y--1/2 z-3 pa-0 border-none sm:rounded-4 shadow-dialog ${className}`}
        onClick={onModalClick}
      >
        {hasCloseButton && (
          <IconButton
            className="absolute right-3 top-3 sm:right-2 sm:top-2"
            icon="i-solar-close-circle-outline"
            size="sm"
            color="dark"
            variant="text"
            rounded
            onClick={onClose}
          />
        )}
        {title && (
          <h2 className="m-0 mr-9 flex overflow-hidden whitespace-nowrap pb-2 text-base text-neutral-700 sm:pb-3 sm:text-lg">
            {title}
          </h2>
        )}
        {children && <div className="flex-1">{children}</div>}
        {footer && (
          <div className="mt-2 flex items-center sm:mt-3">{footer}</div>
        )}
      </dialog>
    </Fragment>
  );
}

export default Modal;
