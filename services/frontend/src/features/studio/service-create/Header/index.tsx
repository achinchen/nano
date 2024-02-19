import { useServiceCreateContext } from '~frontend/features/studio/service-create/context';
import IconButton from '~frontend/components/IconButton';
import featureI from '~frontend/features/studio/i.json';

export function Header() {
  const { toggleExit } = useServiceCreateContext();

  return (
    <header className="flex border-b border-b-zinc-200 border-b-solid py-4 content-header">
      <h2 className="text-2xl md:mx-auto">{featureI.create}</h2>
      <IconButton
        size="sm"
        variant="text"
        color="dark"
        icon="i-custom-close"
        onClick={toggleExit}
      />
    </header>
  );
}

export default Header;
