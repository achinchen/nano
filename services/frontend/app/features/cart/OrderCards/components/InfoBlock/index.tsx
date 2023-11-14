import Icon from '~frontend/components/Icon';

type Props = {
  icon: string;
  title: string;
  content: string;
  className?: string;
};

export function InfoBlock({ icon, title, content }: Props) {
  return (
    <span className="ma-1 flex items-center gap-2 text-sm">
      <Icon size="2xl" icon={icon} className="color-primary-500" />
      <span className="w-24 font-bold">{title}</span>
      <span className="font-normal tracking-wider">{content}</span>
    </span>
  );
}

export default InfoBlock;
