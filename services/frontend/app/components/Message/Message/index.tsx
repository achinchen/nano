import type { Message as MessageType } from '~frontend/components/Message/types';
import { useEffect, useState, Fragment, useCallback } from 'react';
import { IconButton } from '~frontend/components/IconButton';
import { Icon } from '~frontend/components/Icon';
import {
  AUTOMATICALLY_CLOSE_SEVERITIES,
  COLOR,
  ICON,
  CONTAINER_CLASSNAMES,
  REMAIN_TIME,
} from './constants';

type MessageProps = Omit<MessageType, 'id'>;

export const Message = ({
  title,
  children,
  severity,
  onClick,
  onClose: propsOnClose,
}: MessageProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = useCallback(() => {
    setIsOpen(false);
    propsOnClose?.();
  }, [propsOnClose]);

  useEffect(() => {
    if (!AUTOMATICALLY_CLOSE_SEVERITIES.includes(severity)) return;

    const timer = setTimeout(() => {
      onClose();
    }, REMAIN_TIME);
    return () => {
      clearTimeout(timer);
    };
  }, [severity, onClose]);

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
          className="min-w-5 color-inherit"
          size="xl"
          icon={ICON[severity]}
        />
        <div className="mx-2">
          <header className="font-bold capitalize">{title}</header>
          <p className="m-0 max-h-10 overflow-hidden text-ellipsis text-zinc-700">
            {children}
          </p>
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
};
