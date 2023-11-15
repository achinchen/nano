import ReactSheet from 'react-modal-sheet';
import IconButton from '~frontend/components/IconButton';

export type SheetProps = {
  onClose: () => void;
  onSnap?: (index: number) => void;
  snapPoints?: number[];
  fullScreen?: boolean;
  disableDrag?: boolean;
  hasCloseButton?: boolean;
  hasBackdrop?: boolean;
  clickOutsideToClose?: boolean;
};

export function SheetIndicator() {
  return (
    <span className="mx-auto my-1 inline-block h-1 w-10 rounded bg-zinc-500" />
  );
}

export function Sheet({
  onClose,
  onSnap,
  snapPoints,
  children,
  clickOutsideToClose = true,
  disableDrag = false,
  hasCloseButton = true,
  fullScreen = false,
  hasBackdrop = false,
}: React.PropsWithChildren<SheetProps>) {
  return (
    <>
      <ReactSheet
        isOpen
        onClose={onClose}
        snapPoints={snapPoints}
        disableDrag={disableDrag}
        onSnap={onSnap}
        detent={fullScreen ? 'full-height' : 'content-height'}
      >
        <ReactSheet.Container
          style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
        >
          <ReactSheet.Content>
            {hasCloseButton && (
              <IconButton
                icon="i-solar-close-circle-outline"
                color="dark"
                size="sm"
                variant="text"
                rounded
                className="absolute right-4 top-3"
                onClick={onClose}
              />
            )}
            {children}
          </ReactSheet.Content>
        </ReactSheet.Container>
        <ReactSheet.Backdrop
          className={hasBackdrop ? 'display-none' : ''}
          onTap={clickOutsideToClose ? onClose : undefined}
        />
      </ReactSheet>
    </>
  );
}

export default Sheet;
