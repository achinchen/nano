import type { NotifyProps } from '~frontend/components/Notify/types';
import { Modal } from '~frontend/components/Modal';
import { getPassiveClose } from '~frontend/components/Notify/utils';

export function NotifyModal({
  onClose,
  children,
  title,
  picture = null,
  description,
  actionVertical,
  hasCloseButton,
  severity,
}: React.PropsWithChildren<NotifyProps>) {
  const passiveClose = getPassiveClose(severity);

  return (
    <Modal
      onClose={onClose}
      hasCloseButton={hasCloseButton}
      clickOutsideToClose={!passiveClose}
    >
      <div className="mt-4 flex flex-col items-center gap-2">
        {picture && <picture className="h-20 w-20">{picture}</picture>}
        <header className="text-base font-bold color-zinc-700 md:text-lg">
          {title}
        </header>
        <div className="mx-4 text-sm color-zinc-700 md:text-base">
          {description}
        </div>
        <footer
          className={`flex pt-3 px-4 mb-5 border-t-1 border-t-solid border-t-zinc-200 w-100% ${
            actionVertical ? 'flex-col gap-1' : 'gap-2'
          }`}
        >
          {children}
        </footer>
      </div>
    </Modal>
  );
}
