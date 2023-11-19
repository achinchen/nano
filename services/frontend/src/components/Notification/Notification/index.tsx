import type { Notification as NotificationType } from '~frontend/components/Notification/types';
import { useState, Fragment, useCallback } from 'react';
import IconButton from '~frontend/components/IconButton';
import Icon from '~frontend/components/Icon';
import { COLOR, ICON, CONTAINER_CLASSNAMES } from './constants';

type NotificationProps = Omit<NotificationType, 'id'>;

export default function Notification({
  title,
  children,
  severity,
  onClick,
  onClose: propsOnClose,
}: NotificationProps) {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = useCallback(() => {
    setIsOpen(false);
    propsOnClose?.();
  }, [propsOnClose]);

  if (!isOpen) return null;

  return (
    <Fragment>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className={`${CONTAINER_CLASSNAMES} ${COLOR[severity]}`}
        role="alert"
        onClick={onClick}
      >
        <Icon
          className="min-w-6 color-inherit"
          size="xl"
          icon={ICON[severity]}
        />
        <div className="mx-2">
          <header className="font-bold capitalize">{title}</header>
          <p className="m-0 text-zinc-700">{children}</p>
        </div>
        <IconButton
          icon="i-solar-close-circle-outline"
          color="dark"
          size="sm"
          variant="text"
          rounded
          className="ml-auto"
          onClick={onClose}
        />
      </div>
    </Fragment>
  );
}
