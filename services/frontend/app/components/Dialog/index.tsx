import { Modal } from '~frontend/components/Modal';

export type DialogProps = React.PropsWithChildren<{
  onClose: () => void;
  title?: string;
  footer?: React.ReactNode;
  hasCloseButton?: boolean;
  clickOutsideToClose?: boolean;
}>;

export function Dialog({
  onClose,
  children,
  title,
  hasCloseButton = true,
  clickOutsideToClose = true,
  footer,
}: DialogProps) {
  return (
    <Modal
      onClose={onClose}
      hasCloseButton={hasCloseButton}
      clickOutsideToClose={clickOutsideToClose}
      className="max-h-88vh min-h-104 flex flex-col md:max-w-2xl sm:max-w-110"
    >
      <header className="min-h-11 border-b-1 border-color-zinc-200 border-b-solid px-4 py-2 text-2xl font-bold color-zinc-700">
        {title}
      </header>
      <main className="flex-auto pa-4">{children}</main>
      {footer && (
        <footer className="mb-5 min-h-16 border-t-1 border-t-zinc-200 border-t-solid px-4 pt-3">
          {footer}
        </footer>
      )}
    </Modal>
  );
}

export default Dialog;
