import Avatar from '~frontend/components/Avatar';
import getAvatarById from '~frontend/shared/utils/get-avatar-by-id';
import { useRequestOrderContext } from '~frontend/features/studio/order-requested/Detail/context';

export default function ConsumerName() {
  const { contactInfo } = useRequestOrderContext();
  if (!contactInfo) return null;

  return (
    <header className="flex items-center gap-2 text-lg font-bold">
      <Avatar
        size="base"
        className="flex-shrink-0 flex-grow-0"
        src={getAvatarById(contactInfo.userId)}
      />
      {contactInfo.name}
    </header>
  );
}
