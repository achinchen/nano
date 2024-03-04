import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import Icon from '~frontend/components/Icon';
import {
  LOGOUT_NAVIGATION,
  PROVIDER_NAVIGATION,
  CONSUMER_NAVIGATION,
} from '~frontend/layout/Header/Menu/constants';
import { useHeaderContext } from '~frontend/layout/Header/context/index';
import { useAppContext } from '~frontend/context';

type Props = {
  onClose: () => void;
};

export default function RightTop({ onClose }: Props) {
  const { isProvider } = useAppContext();
  const { setMenuOpen } = useHeaderContext();

  const navigation = isProvider ? PROVIDER_NAVIGATION : CONSUMER_NAVIGATION;

  const onClick = () => {
    setMenuOpen(false);
  };

  return (
    <Fragment>
      <div className="fixed bottom-0 left-0 right-0 top-0" onClick={onClose} />
      <aside className="fixed top-12 mx-0 w-80 translate-x--90% rounded-4 bg-white px-4 shadow-dialog">
        {navigation.map(({ title, items }) => (
          <ul className="color-zinc-700" key={title}>
            <li className="h-11 flex items-center">{title}</li>
            <li>
              <ul>
                {items.map(({ icon, label, href }) => (
                  <li key={label}>
                    {href ? (
                      <Link
                        to={href}
                        className="h-14 flex items-center gap-4"
                        onClick={onClick}
                      >
                        <Icon icon={icon} size="2xl" />
                        <span className="h-100% flex flex-1 items-center border-b-1 border-b-zinc-200 border-b-solid">
                          {label}
                        </span>
                      </Link>
                    ) : (
                      <span className="h-14 flex items-center gap-4">
                        <Icon icon={icon} size="2xl" />
                        <span className="h-100% flex flex-1 items-center border-b-1 border-b-zinc-200 border-b-solid">
                          {label}
                        </span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        ))}
        <li className="h-11 flex items-center" />
        <li>
          <button
            className="h-14 w-full flex items-center gap-4"
            onClick={LOGOUT_NAVIGATION.onClick}
          >
            <Icon icon={LOGOUT_NAVIGATION.icon} size="2xl" />
            <span className="h-100% flex flex-1 items-center border-b-1 border-b-zinc-200 border-b-solid text-base">
              {LOGOUT_NAVIGATION.label}
            </span>
          </button>
        </li>
      </aside>
    </Fragment>
  );
}
