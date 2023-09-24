export type BadgeProps = React.PropsWithChildren<{
  label?: string;
}>;

export function Badge({ children, label = '' }: BadgeProps) {
  return (
    <div role="presentation" className="relative inline-block">
      {children}
      <span
        className={`absolute flex justify-center right-0 top-0 translate-x-50% translate-y--50% inline-block bg-red-500 ${
          label ? 'min-w-4 h-4 px-1' : 'w-1.5 h-1.5'
        }  color-white rounded-25 text-xs`}
      >
        {label}
      </span>
    </div>
  );
}
