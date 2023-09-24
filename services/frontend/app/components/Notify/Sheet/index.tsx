import type { NotifyProps } from '~frontend/components/Notify/types';
import './style.module.css';
import { getPassiveClose } from '~frontend/components/Notify/utils';
import { Sheet } from '~frontend/components/Sheet';

export function NotifySheet({
  onClose,
  children,
  title,
  picture = null,
  description,
  actionVertical,
  hasCloseButton,
  severity,
}: NotifyProps) {
  const passiveClose = getPassiveClose(severity);

  return (
    <Sheet
      onClose={onClose}
      hasCloseButton={hasCloseButton}
      disableDrag={passiveClose}
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
    </Sheet>
  );
}
