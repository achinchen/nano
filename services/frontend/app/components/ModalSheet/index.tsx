import Sheet from 'react-modal-sheet';
import IconButton from '~frontend/components/IconButton';

export type ModalSheetProps = {
  onClose: () => void;
  opened: boolean;
  onSnap?: (index: number) => void;
  snapPoints?: number[];
  fullScreen?: boolean;
  disableDrag?: boolean;
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
  disableDrag = false,
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
        disableDrag={disableDrag}
        onSnap={onSnap}
        detent={fullScreen ? 'full-height' : 'content-height'}
      >
        <Sheet.Container
          style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
        >
          <Sheet.Content>
            {hasCloseButton && (
              <IconButton
                icon="i-solar-close-circle-outline"
                color="dark"
                size="sm"
                variant="text"
                rounded
                className="absolute right-3 top-3"
                onClick={onClose}
              />
            )}
            {children}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop className={hasBackdrop ? 'display-none' : ''} />
      </Sheet>
    </>
  );
}

export default ModalSheet;
