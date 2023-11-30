import { useState } from 'react';
import { Link } from 'react-router-dom';
import BottomSheet from '~frontend/components/BottomSheet';
import Icon from '~frontend/components/Icon';
import { NAVIGATION } from './constants';

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((isOpen) => !isOpen);

  return (
    <div className="block md:hidden">
      <button onClick={toggle} className="pa-0">
        <Icon icon="i-solar-hamburger-menu-linear" size="3xl" />
      </button>
      {isOpen && (
        <BottomSheet onClose={toggle} hasCloseButton={false}>
          <ul className="mx-4 mb-6 mt-2">
            {NAVIGATION.map(({ icon, label, href }) => (
              <li key={label}>
                <Link
                  to={href}
                  className="h-14 flex items-center gap-4 color-zinc-700"
                >
                  <Icon icon={icon} size="2xl" />
                  <span className="h-100% flex flex-1 items-center border-b-1 border-b-zinc-200 border-b-solid">
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </BottomSheet>
      )}
    </div>
  );
}
