import Button from '~frontend/components/Button';
import i from './i.json';

export function Footer({ disabled = false }: { disabled?: boolean }) {
  const onClick = () => {
    /* */
  };

  return (
    <footer className="footer">
      <Button
        color="primary"
        className="flex-1 md:flex-none"
        variant="outline"
        size="md"
        onClick={onClick}
        disabled={disabled}
      >
        {i.cart}
      </Button>
      <Button
        color="primary"
        className="flex-1 md:flex-none"
        variant="solid"
        size="md"
        onClick={onClick}
        disabled={disabled}
      >
        {i.book}
      </Button>
    </footer>
  );
}

export default Footer;
