import { Fragment, useState, lazy, startTransition } from 'react';
import TextButton from '~frontend/components/TextButton';
import { useRequestOrderContext } from '~frontend/features/studio/OrderRequestContent/context';
import sharedI from '~frontend/shared/i.json';
import i from './i.json';

const Info = lazy(
  () => import('~frontend/features/studio/components/ServiceInfo')
);

const Dialog = lazy(() => import('~frontend/components/Dialog'));

export default function ServiceInfo() {
  const { service } = useRequestOrderContext();
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
        className="ml-auto flex-shrink-0 flex-grow-0"
        onClick={onClick}
      >
        {i.title}
      </TextButton>
      {open && (
        <Dialog onClose={onClose} title={service.name}>
          <Info {...service} title={sharedI.description} />
        </Dialog>
      )}
    </Fragment>
  );
}
