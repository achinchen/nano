import ContactInfo from '~frontend/shared/components/ConsumerContactInfo';
import { useRequestOrderContext } from '~frontend/features/studio/order-requested/Detail/context';

export default function ConsumerContactInfo() {
  const { contactInfo } = useRequestOrderContext();
  if (!contactInfo) return null;

  return <ContactInfo {...contactInfo} />;
}
