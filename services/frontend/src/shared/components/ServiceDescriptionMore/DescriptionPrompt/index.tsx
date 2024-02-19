import type { Content } from '~frontend/shared/components/ServiceDescriptionMore/types';
import BottomSheet from '~frontend/components/BottomSheet';
import Dialog from '~frontend/components/Dialog';
import { getIsMobile } from '~frontend/utils/device';
import { useAppContext } from '~frontend/context';
import i from './i.json';

type Props = {
  onClose: () => void;
} & Content;

function Precraution() {
  const { studio } = useAppContext();
  const REGEX = new RegExp(i.key, 'g');
  const SNS_LINK = `<a href="https://www.instagram.com/${
    studio?.SNSId || 'nano_tw_03'
  }" target="_blank" rel="noopener noreferrer" class="underline">${i.key}</a>`;
  const content = i.precraution.replace(REGEX, SNS_LINK);
  return (
    <div className="mt-4" dangerouslySetInnerHTML={{ __html: content }}></div>
  );
}

export default function DescriptionPrompt({
  title,
  description,
  onClose,
}: Props) {
  const isMobile = getIsMobile();
  return isMobile ? (
    <BottomSheet title={title} onClose={onClose}>
      <div className="my-2 h-112 overflow-y-scroll whitespace-break-spaces px-4 font-normal">
        {description}
        <Precraution />
      </div>
    </BottomSheet>
  ) : (
    <Dialog title={title} onClose={onClose}>
      <div className="my-2 h-112 overflow-y-scroll whitespace-break-spaces px-4 font-normal">
        {description}
        <Precraution />
      </div>
    </Dialog>
  );
}
