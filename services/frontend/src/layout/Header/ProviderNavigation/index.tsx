import { Link } from 'react-router-dom';
import Icon from '~frontend/components/Icon';
import { NAVIGATION } from './constants';

export default function Navigation() {
  return (
    <nav className="mr-4 hidden gap-4 md:flex">
      {NAVIGATION.map(({ icon, label, href }) => (
        <Link
          key={href}
          to={href}
          className="w-28 flex items-center justify-center text-sm"
        >
          <Icon icon={icon} className="mr-1" size="xl" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
