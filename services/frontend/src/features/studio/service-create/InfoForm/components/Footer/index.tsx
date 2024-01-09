import Button from '~frontend/components/Button';
import { useServiceCreateContext } from '~frontend/features/studio/service-create/context';
import { InfoStep } from '~frontend/features/studio/service-create/InfoForm/constants';
import { useServiceCreateInfoFormContext } from '~frontend/features/studio/service-create/InfoForm/context';
import featureI from '~frontend/features/studio/service-create/i.json';
import i from './i.json';

export function Footer() {
  const { toNextStep, toggleExit } = useServiceCreateContext();
  const { step, onNext, onPrevious, disabled } =
    useServiceCreateInfoFormContext();

  const toPrevious = step !== InfoStep.Name ? onPrevious : toggleExit;
  const previousLabel = step !== InfoStep.Name ? i.previous : featureI.exit;

  const toNext = () => {
    step !== InfoStep.Queue ? onNext() : toNextStep();
  };

  return (
    <footer className="footer justify-between">
      <Button
        color="dark"
        className="flex-shrink-0 flex-grow-0 flex-basis-30"
        variant="text"
        size="md"
        onClick={toPrevious}
      >
        {previousLabel}
      </Button>
      <Button
        color="primary"
        className="ml-auto flex-shrink-0 flex-grow-0 flex-basis-30"
        variant="solid"
        size="md"
        onClick={toNext}
        disabled={disabled}
      >
        {i.next}
      </Button>
    </footer>
  );
}

export default Footer;
