import { Link } from 'react-router-dom';
import Icon from '~frontend/components/Icon';
import IconButton from '~frontend/components/IconButton';
import {
  PROVIDER_NAVIGATION,
  CONSUMER_NAVIGATION,
} from '~frontend/layout/Header/Menu/constants';

const isProvider = true;
const onClick = () => {
  /* */
};

export default function FullScreenMenu() {
  const navigation = isProvider ? PROVIDER_NAVIGATION : CONSUMER_NAVIGATION;

  return (
    <nav className="fixed left-0 right-0 top-11 h-100vh w-100vw bg-zinc-50 px-4">
      {navigation.map(({ title, items }) => (
        <ul key={title} className="mb-2">
          <li className="h-11 flex items-center text-lg">{title}</li>
          <li className="rounded-4 bg-white px-4">
            <ul>
              {items.map(({ icon, label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="h-14 flex items-center gap-4 color-zinc-700"
                  >
                    <Icon icon={icon} size="2xl" className="h-8 w-8" />
                    <span className="h-100% flex flex-1 items-center justify-between border-b-1 border-b-zinc-200 border-b-solid">
                      {label}
                      <IconButton
                        icon="i-solar-alt-arrow-right-linear"
                        size="sm"
                        onClick={onClick}
                        className={title ? '' : 'invisible'}
                        color="dark"
                        variant="text"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ))}
    </nav>
  );
}
