import Link from 'next/link';
import Icon from '~frontend/components/Icon';

type Props = {
  className?: string;
  icon: string;
  href: string;
};

export default function IconLink({ className = '', href, icon }: Props) {
  return (
    <Link href={href} className={`flex items-center ${className}`}>
      <Icon icon={icon} size="3xl" />
    </Link>
  );
}
