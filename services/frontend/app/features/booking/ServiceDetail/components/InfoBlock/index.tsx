import Icon from '~frontend/components/Icon';

type InfoBlockProps = {
  icon: string;
  title: string;
  content: string;
  className?: string;
};

export function InfoBlock({
  icon,
  title,
  content,
  className = '',
}: InfoBlockProps) {
  return (
    <span className={`flex flex-col md:gap-1 ${className}`}>
      <span className="color-primary-500">
        <Icon size="2xl" icon={icon} />
        {title}
      </span>
      {content}
    </span>
  );
}

export default InfoBlock;
