import Button from '~frontend/components/Button';
import i from './i.json';

type Props = {
  disabled?: boolean;
  onNext: () => void;
  onPrevious: () => void;
};

export function Footer({ disabled, onNext, onPrevious }: Props) {
  return (
    <footer className="footer justify-between">
      <Button
        color="dark"
        className="flex-shrink-0 flex-grow-0 flex-basis-30"
        variant="text"
        size="md"
        onClick={onPrevious}
      >
        {i.previous}
      </Button>

      <Button
        color="primary"
        className="ml-auto flex-shrink-0 flex-grow-0 flex-basis-30"
        variant="solid"
        size="md"
        onClick={onNext}
        disabled={disabled}
      >
        {i.next}
      </Button>
    </footer>
  );
}

export default Footer;
