import Sheet from 'react-modal-sheet';
import IconButton from '~frontend/components/IconButton';

export type ModalSheetProps = {
  onClose: () => void;
  opened: boolean;
  onSnap?: (index: number) => void;
  snapPoints?: number[];
  fullScreen?: boolean;
  hasCloseButton?: boolean;
  hasBackdrop?: boolean;
};

export function ModalSheetIndicator() {
  return (
    <span className="mx-auto my-2 inline-block h-1 w-10 rounded bg-zinc-500" />
  );
}

export function ModalSheet({
  onClose,
  onSnap,
  snapPoints,
  opened,
  children,
  hasCloseButton = false,
  fullScreen = false,
  hasBackdrop = false,
}: React.PropsWithChildren<ModalSheetProps>) {
  return (
    <>
      <Sheet
        isOpen={opened}
        onClose={onClose}
        snapPoints={snapPoints}
        onSnap={onSnap}
        detent={fullScreen ? 'full-height' : 'content-height'}
      >
        <Sheet.Container>
          {hasCloseButton && (
            <IconButton
              icon="i-solar-close-circle-outline"
              color="dark"
              size="sm"
              variant="text"
              rounded
              className="ml-auto"
              onClick={onClose}
            />
          )}
          <Sheet.Content>{children}</Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop className={hasBackdrop ? 'display-none' : ''} />
      </Sheet>
    </>
  );
}
