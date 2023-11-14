import Icon from '~frontend/components/Icon';

type Props = React.PropsWithChildren<{
  icon: string;
}>;

export function Field({ icon, children }: Props) {
  return (
    <span className="w-30 flex items-center">
      <Icon icon={icon} size="2xl" className="mr-2 color-primary-500" />
      {children}
    </span>
  );
}

export default Field;
