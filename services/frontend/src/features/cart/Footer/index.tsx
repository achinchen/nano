import Button from '~frontend/components/Button';
import { useCartContext } from '~frontend/features/cart/context';
import { Step } from '~frontend/features/cart/constants';
import i from './i.json';

export function Footer() {
  const { currentStep, toNextStep, disabled } = useCartContext();
  const wording = currentStep === Step.preview ? i.submit : i.book;

  return (
    <footer className="footer">
      <Button
        color="primary"
        className="flex-1 md:flex-none"
        variant="solid"
        size="md"
        onClick={toNextStep}
        disabled={disabled}
      >
        {wording}
      </Button>
    </footer>
  );
}

export default Footer;
