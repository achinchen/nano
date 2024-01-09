import { useState } from 'react';
import IconButton from '~frontend/components/IconButton';
import { TAG_CONFIG } from '~frontend/components/Tag/constants';

type Props = {
  title: string;
};

export function HintTag({ children }: React.PropsWithChildren) {
  return (
    <span
      className={`${TAG_CONFIG.base} inline-block mb-2 color-primary-500 bg-primary-200`}
    >
      {children}
    </span>
  );
}

export default function Hint({
  title,
  children,
}: React.PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false);
  const icon = open
    ? 'i-solar-alt-arrow-up-linear'
    : 'i-solar-alt-arrow-down-linear';
  const onOpen = () => setOpen((open) => !open);

  return (
    <section className="mt-4 whitespace-break-spaces rounded-4 bg-primary-100 pa-2 font-normal">
      <header className="flex items-center justify-between gap-2 color-primary-500">
        {title}
        <IconButton size="sm" variant="text" icon={icon} onClick={onOpen} />
      </header>
      <div className={`${open ? 'visible pt-4' : 'invisible h-0'}`}>
        {children}
      </div>
    </section>
  );
}
