import { useState, lazy, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getIsMobile } from '~frontend/utils/device';
import Button from '~frontend/components/Button';
import KnockImg from '~frontend/assets/knock.svg';
import i from './i.json';

const Modal = lazy(() => import('~frontend/components/Notify/Modal'));
const Sheet = lazy(() => import('~frontend/components/Notify/Sheet'));

const PROPS = {
  title: i.title,
  description: i.content,
  severity: 'info',
  hasClearButton: true,
  picture: <img src={KnockImg} alt="Knock" />,
} as const;

const isGranted = () => Notification.permission === 'granted';

export default function NotificationPrompt() {
  const [searchParams] = useSearchParams();
  const [opened, setOpened] = useState(false);

  const onClose = () => setOpened(false);
  const onClick = () => {
    Notification.requestPermission().then((permission) => {
      onClose();
    });
  };

  useEffect(() => {
    if (searchParams.get('prompt') && !isGranted()) setOpened(true);
  }, [searchParams]);

  if (!opened) return null;

  const props = { ...PROPS, onClose };
  const isMobile = getIsMobile();

  return isMobile ? (
    <Sheet {...props}>
      <Button color="primary" variant="solid" onClick={onClick}>
        {i.button}
      </Button>
    </Sheet>
  ) : (
    <Modal {...props}>
      <Button color="primary" variant="solid" onClick={onClick}>
        {i.button}
      </Button>
    </Modal>
  );
}
