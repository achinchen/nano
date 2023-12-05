import { Fragment, useState } from 'react';
import IconButton from '~frontend/components/IconButton';
import NotifySheet from '~frontend/components/Notify/Sheet';
import NotifyModal from '~frontend/components/Notify/Modal';
import Button from '~frontend/components/Button';
import { getIsMobile } from '~frontend/utils/device';
import i from './i.json';

type Props = {
  onClose: () => void;
};

function Footer({ onClose }: { onClose: () => void }) {
  return (
    <Button className="flex-1" onClick={onClose}>
      {i.cta}
    </Button>
  );
}

function QueueDescriptionPrompt({ onClose }: Props) {
  const isMobile = getIsMobile();
  return isMobile ? (
    <NotifySheet
      severity="info"
      title={i.title}
      onClose={onClose}
      description={i.description}
    >
      <Footer onClose={onClose} />
    </NotifySheet>
  ) : (
    <NotifyModal
      severity="info"
      title={i.title}
      description={i.description}
      onClose={onClose}
    >
      <Footer onClose={onClose} />
    </NotifyModal>
  );
}

export default function QueueDescription() {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);
  return (
    <Fragment>
      <IconButton
        icon="i-solar-info-circle-bold"
        size="xs"
        color="dark"
        variant="text"
        rounded
        className="ml--1"
        onClick={onOpen}
      />
      {open && <QueueDescriptionPrompt onClose={onClose} />}
    </Fragment>
  );
}
