import type { Service } from '~frontend/features/studio/types';
import { Fragment, useState, lazy, startTransition } from 'react';
import TextButton from '~frontend/components/TextButton';
import sharedI from '~frontend/shared/i.json';
import { getIsMobile } from '~frontend/utils/device';
import i from './i.json';

const Info = lazy(
  () => import('~frontend/features/studio/components/ServiceSummary')
);

const Dialog = lazy(() => import('~frontend/components/Dialog'));
const BottomSheet = lazy(() => import('~frontend/components/BottomSheet'));

type Props = {
  className?: string;
  footer?: React.ReactNode;
  service: Service;
};

export default function ServiceInfo({
  className = '',
  footer,
  service,
}: Props) {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    startTransition(() => {
      setOpen(true);
    });
  };
  const onClose = () => setOpen(false);

  return (
    <Fragment>
      <TextButton
        className={`ml-auto flex-shrink-0 flex-grow-0 font-medium ${className}`}
        onClick={onClick}
      >
        {i.title}
      </TextButton>
      {open &&
        (getIsMobile() ? (
          <BottomSheet onClose={onClose} title={service.name} footer={footer}>
            <div className="my-2 h-112 overflow-y-scroll px-4 font-normal">
              <Info {...service} title={sharedI.description} />
            </div>
          </BottomSheet>
        ) : (
          <Dialog onClose={onClose} title={service.name} footer={footer}>
            <div className="my-2 h-112 overflow-y-scroll px-4 font-normal">
              <Info {...service} title={sharedI.description} />
            </div>
          </Dialog>
        ))}
    </Fragment>
  );
}
