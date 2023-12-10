import i from './i.json';

export default function Header({ smHidden }: { smHidden?: boolean }) {
  return (
    <header
      className={`content-header md:justify-center ${
        smHidden ? 'hidden md:flex' : 'flex'
      }`}
    >
      <h2 className="text-lg md:text-xl">{i.title}</h2>
    </header>
  );
}
