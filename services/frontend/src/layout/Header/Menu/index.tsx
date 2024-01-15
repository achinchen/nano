import Avatar from '~frontend/components/Avatar';
import { getIsMobile } from '~frontend/utils/device';
import { useHeaderContext } from '~frontend/layout/Header/context/index';
import { useAppContext } from '~frontend/context';
import getAvatarById from '~frontend/shared/utils/get-avatar-by-id';
import FullScreen from './FullScreen';
import RightTop from './RightTop';

export function Menu() {
  const { id } = useAppContext();
  const { isMenuOpen, setMenuOpen } = useHeaderContext();
  const toggle = () => setMenuOpen((open) => !open);

  return (
    <div className="relative z-2">
      <button onClick={toggle} className="pa-0">
        <Avatar src={getAvatarById(id)} />
      </button>
      {isMenuOpen ? (
        getIsMobile() ? (
          <FullScreen />
        ) : (
          <RightTop onClose={toggle} />
        )
      ) : null}
    </div>
  );
}

export default Menu;
