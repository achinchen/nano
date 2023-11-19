import { Link } from 'react-router-dom';
import Icon from '~frontend/components/Icon';

type Props = {
  className?: string;
  icon: string;
  href: string;
};

export default function IconLink({ className = '', href, icon }: Props) {
  return (
    <Link to={href} className={`flex items-center ${className}`}>
      <Icon icon={icon} size="3xl" />
    </Link>
  );
}
