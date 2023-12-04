import Avatar from '~frontend/components/Avatar';
import Avocado from '~frontend/assets/avatar.png';
import { useRequestOrderContext } from '~frontend/features/studio/OrderRequestContent/context';

export default function ConsumerName() {
  const { contactInfo } = useRequestOrderContext();

  return (
    <header className="flex items-center gap-2 text-lg font-bold">
      <Avatar size="base" src={Avocado} />
      {contactInfo.name}
    </header>
  );
}
