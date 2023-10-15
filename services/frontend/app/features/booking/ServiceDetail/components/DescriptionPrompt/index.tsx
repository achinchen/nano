import BottomSheet from '~frontend/components/BottomSheet';
import Dialog from '~frontend/components/Dialog';
import { getIsMobile } from '~frontend/utils/device';

type Props = {
  title: string;
  description: string;
  onClose: () => void;
};

export function DescriptionPrompt({ title, description, onClose }: Props) {
  const isMobile = getIsMobile();
  return isMobile ? (
    <BottomSheet title={title} onClose={onClose}>
      <div className="mx-4 my-2 h-112 font-normal color-zinc-600">
        {description}
      </div>
    </BottomSheet>
  ) : (
    <Dialog title={title} onClose={onClose}>
      <div className="mx-4 my-2 h-112 font-normal color-zinc-600">
        {description}
      </div>
    </Dialog>
  );
}

export default DescriptionPrompt;
