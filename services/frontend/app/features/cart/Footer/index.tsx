import Button from '~frontend/components/Button';
import { useCartContext } from '~frontend/features/cart/context';
import i from './i.json';

export function Footer({ className = '' }: { className?: string }) {
  const { toNextStep } = useCartContext();

  return (
    <footer className="footer">
      <Button
        color="primary"
        className="flex-1 md:flex-none"
        variant="solid"
        size="md"
        onClick={toNextStep}
      >
        {i.book}
      </Button>
    </footer>
  );
}

export default Footer;
