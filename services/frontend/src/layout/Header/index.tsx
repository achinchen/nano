import { Link } from 'react-router-dom';
import Icon from '~frontend/components/Icon';
import Studio from '~frontend/assets/example-studio.png';
import ProviderNavigationDrawer from './ProviderNavigation/Drawer';
import ProviderNavigation from './ProviderNavigation';
import IconLink from './components/IconLink';
import MenuBackButton from './Menu/CloseButton';
import Menu from './Menu';
import { SIDE_MENU } from './constants';
import { HeaderContextProvider, useHeaderContext } from './context';

export function Header() {
  const { isProvider, isLogin, isMenuOpen } = useHeaderContext();
  return (
    <header className="mx-auto max-w-7xl min-h-11 flex justify-between px-4 py-2 md:px-10 md:color-zinc-50">
      <div className="flex items-center gap-1 md:gap-4">
        {isMenuOpen ? (
          <MenuBackButton />
        ) : (
          isProvider && <ProviderNavigationDrawer />
        )}
        <img
          alt="studio logo"
          src={Studio}
          width={36}
          height={36}
          className={isProvider ? 'hidden md:block' : ''}
        />
        {isProvider && <ProviderNavigation />}
        <Link
          to="/booking/QQ"
          className={`flex items-center ${isProvider ? 'md:hidden' : ''}`}
        >
          <h1 className="ml-1 text-sm">Studio Name</h1>
        </Link>
      </div>
      <div className="flex items-baseline gap-1 md:gap-4">
        <IconLink {...SIDE_MENU.CART} />
        {isLogin ? (
          <Menu />
        ) : (
          <Link to="/login" className="flex items-center color-blue">
            <Icon icon="i-solar-user-circle-bold" size="4xl" />
          </Link>
        )}
      </div>
    </header>
  );
}

export default function HeaderWithContext() {
  return (
    <HeaderContextProvider>
      <Header />
    </HeaderContextProvider>
  );
}
