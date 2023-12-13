import type { Content } from './types';
import { Fragment, useState } from 'react';
import TextButton from '~frontend/components/TextButton';
import DescriptionPrompt from './DescriptionPrompt';

type Props = { children: string; className?: string } & Content;

export default function ServiceDescriptionMore({
  children,
  title,
  description,
  className = '',
}: Props) {
  const [open, setOpen] = useState(false);
  const onClick = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <Fragment>
      <TextButton
        className={`font-medium text-base  ${className}`}
        onClick={onClick}
      >
        {children}
      </TextButton>
      {open && (
        <DescriptionPrompt
          title={title}
          description={description}
          onClose={onClose}
        />
      )}
    </Fragment>
  );
}
