import type { Service } from '~frontend/features/studio/types';
import { Link } from 'react-router-dom';
import BottomSheet from '~frontend/components/BottomSheet';
import Button from '~frontend/components/Button';
import Dialog from '~frontend/components/Dialog';
import ServiceInfo from '~frontend/features/studio/components/ServiceInfo';
import { getIsMobile } from '~frontend/utils/device';
import i from './i.json';

type Props = {
  title: string;
  onClose: () => void;
} & Service;

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
      <ServiceInfo {...props} />
    </BottomSheet>
  ) : (
    <Dialog title={name} onClose={onClose} footer={<Footer id={id} />}>
      <ServiceInfo {...props} />
    </Dialog>
  );
}
