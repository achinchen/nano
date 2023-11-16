'use client';
import Link from 'next/link';
import Image from 'next/image';
import Studio from '../../../public/example-studio.png';
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
    <header className="min-h-10 flex justify-between bg-zinc-50 px-4 py-1">
      <div className="flex">
        {isMenuOpen && <MenuBackButton />}
        {isProvider ? (
          !isMenuOpen && <ProviderNavigationDrawer />
        ) : (
          <Image alt="studio logo" src={Studio} width={36} height={36} />
        )}
        <Link href="/booking/QQ" className="flex items-center">
          <h1 className="ml-1 text-sm">Studio Name</h1>
        </Link>
        {isProvider && <ProviderNavigation />}
      </div>
      <div className="flex gap-1 md:gap-4">
        {isProvider ? (
          <IconLink {...SIDE_MENU.TAKE_LEAVE} />
        ) : (
          <IconLink {...SIDE_MENU.CART} />
        )}
        {isLogin ? (
          <Menu />
        ) : (
          <IconLink
            href="/login"
            icon="i-solar-user-circle-bold"
            className="color-blue"
          />
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
