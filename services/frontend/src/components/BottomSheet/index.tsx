import { default as Sheet, SheetIndicator } from '~frontend/components/Sheet';

export type BottomSheetProps = React.PropsWithChildren<{
  onClose: () => void;
  title?: string;
  footer?: React.ReactNode;
  hasCloseButton?: boolean;
  clickOutsideToClose?: boolean;
  fullScreen?: boolean;
}>;

export default function BottomSheet({
  onClose,
  children,
  title,
  hasCloseButton = true,
  clickOutsideToClose = true,
  fullScreen = false,
  footer,
}: BottomSheetProps) {
  return (
    <Sheet
      onClose={onClose}
      hasCloseButton={hasCloseButton}
      disableDrag={!clickOutsideToClose}
      clickOutsideToClose={clickOutsideToClose}
      fullScreen={fullScreen}
    >
      <div className="flex flex-col">
        <SheetIndicator />
        {title && (
          <header className="min-h-11 border-b-1 border-color-zinc-200 border-b-solid px-4 py-1 text-2xl font-bold color-zinc-700">
            {title}
          </header>
        )}
        {children}
        {footer && (
          <footer
            className={`min-h-16 px-4 mb-5 pt-3 border-t-1 border-t-solid border-t-zinc-200 w-100%`}
          >
            {footer}
          </footer>
        )}
      </div>
    </Sheet>
  );
}
