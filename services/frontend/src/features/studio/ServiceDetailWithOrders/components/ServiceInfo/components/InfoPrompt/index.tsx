import type { Service } from '~frontend/features/studio/types';
import { Link } from 'react-router-dom';
import BottomSheet from '~frontend/components/BottomSheet';
import Button from '~frontend/components/Button';
import Dialog from '~frontend/components/Dialog';
import InfoBlocks from '~frontend/features/studio/components/InfoBlocks';
import OrderFields from '~frontend/features/studio/components/OrderFields';
import { getIsMobile } from '~frontend/utils/device';
import Separator from '~frontend/components/Separator';
import i from './i.json';

type Props = {
  title: string;
  onClose: () => void;
} & Service;

function Content({
  title,
  description,
  attendee,
  duration,
  location,
  supplier,
  queue,
}: Omit<Props, 'name' | 'onClose' | 'id'>) {
  return (
    <div className="my-2 h-112 overflow-y-scroll px-4 font-normal color-zinc-600">
      <h3 className="text-base">{title}</h3>
      <p className="mt-0">{description}</p>
      <Separator />
      <InfoBlocks
        duration={duration}
        attendee={attendee}
        location={location}
        supplier={supplier}
      />
      <OrderFields queue={queue} />
    </div>
  );
}

const onButtonClick = () => {
  /** */
};

function Footer({ id }: Pick<Props, 'id'>) {
  return (
    <Link to={`/studio/services/${id}`}>
      <Button color="primary" className="w-full" onClick={onButtonClick}>
        {i.cta}
      </Button>
    </Link>
  );
}

export default function FullInfoPrompt({ name, onClose, id, ...props }: Props) {
  const isMobile = getIsMobile();

  return isMobile ? (
    <BottomSheet title={name} onClose={onClose} footer={<Footer id={id} />}>
      <Content {...props} />
    </BottomSheet>
  ) : (
    <Dialog title={name} onClose={onClose} footer={<Footer id={id} />}>
      <Content {...props} />
    </Dialog>
  );
}
