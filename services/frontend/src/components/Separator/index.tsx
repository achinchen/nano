const SIZE = {
  sm: 'my-2',
  md: 'my-4',
};

export default function Separator({ size = 'md' }: { size?: 'sm' | 'md' }) {
  return (
    <hr
      className={`border-t-px border-t-zinc-200 border-none border-t-solid ${SIZE[size]}`}
    />
  );
}
