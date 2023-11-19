import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import Icon from '~frontend/components/Icon';
import {
  PROVIDER_NAVIGATION,
  CONSUMER_NAVIGATION,
} from '~frontend/layout/Header/Menu/constants';

const isProvider = true;

type Props = {
  onClose: () => void;
};

export default function RightTop({ onClose }: Props) {
  const navigation = isProvider ? PROVIDER_NAVIGATION : CONSUMER_NAVIGATION;
  const onMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  return (
    <Fragment>
      <div className="fixed bottom-0 left-0 right-0 top-0" onClick={onClose} />
      <aside
        className="fixed right-4 top-11 w-80 rounded-4 bg-white px-4 shadow-dialog"
        onClickCapture={onMenuClick}
      >
        {navigation.map(({ title, items }) => (
          <ul className="mb-2" key={title}>
            <li className="h-11 flex items-center">{title}</li>
            <li>
              <ul>
                {items.map(({ icon, label, href }) => (
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
            </li>
          </ul>
        ))}
      </aside>
    </Fragment>
  );
}
