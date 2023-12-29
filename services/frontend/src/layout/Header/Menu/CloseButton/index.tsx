import IconButton from '~frontend/components/IconButton';
import { useHeaderContext } from '~frontend/layout/Header/context/index';

export default function CloseButton() {
  const { isMenuOpen, setMenuOpen } = useHeaderContext();
  const onClick = () => setMenuOpen(false);

  return (
    <IconButton
      variant="text"
      color="dark"
      onClick={onClick}
      icon="i-solar-alt-arrow-left-linear"
      className={isMenuOpen ? 'block md:hidden ml--2' : 'hidden'}
      size="sm"
    />
  );
}
