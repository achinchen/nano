import i from './i.json';

export function Header({ className = '' }: { className?: string }) {
  return (
    <header
      className={`content-header text-2xl justify-center py-4 border-b-solid border-b border-b-zinc-200 ${className}`}
    >
      {i.cart}
    </header>
  );
}

export default Header;
