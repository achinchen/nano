'use client';

import { useState } from 'react';
import Link from 'next/link';
import BottomSheet from '~frontend/components/BottomSheet';
import Icon from '~frontend/components/Icon';
import IconButton from '~frontend/components/IconButton';
import { NAVIGATION } from './constants';

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((isOpen) => !isOpen);

  return (
    <div className="block md:hidden">
      <IconButton
        variant="text"
        color="dark"
        onClick={toggle}
        icon="i-solar-hamburger-menu-linear"
        size="sm"
      />
      {isOpen && (
        <BottomSheet onClose={toggle} hasCloseButton={false}>
          <ul className="mx-4 mb-6 mt-2">
            {NAVIGATION.map(({ icon, label, href }) => (
              <li key={label}>
                <Link
                  href={href}
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
