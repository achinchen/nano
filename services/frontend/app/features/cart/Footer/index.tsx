import Button from '~frontend/components/Button';
import i from './i.json';

export function Footer({ className = '' }: { className?: string }) {
  const onClick = () => {};

  return (
    <footer className="footer">
      <Button
        color="primary"
        className="flex-1 md:flex-none"
        variant="solid"
        size="md"
        onClick={onClick}
      >
        {i.book}
      </Button>
    </footer>
  );
}

export default Footer;
