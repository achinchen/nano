import Avatar from '~frontend/components/Avatar';
import { getIsMobile } from '~frontend/utils/device';
import { useHeaderContext } from '~frontend/layout/Header/context';
import Avocado from '~frontend/assets/avatar.png';
import FullScreen from './FullScreen';
import RightTop from './RightTop';

export function Menu() {
  const { isMenuOpen, setMenuOpen } = useHeaderContext();
  const toggle = () => setMenuOpen((open) => !open);

  return (
    <div className="relative z-2">
      <button onClick={toggle}>
        <Avatar src={Avocado} />
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
