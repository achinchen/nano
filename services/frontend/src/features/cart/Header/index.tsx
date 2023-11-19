import { useCartContext } from '~frontend/features/cart/context';
import IconButton from '~frontend/components/IconButton';
import i from './i.json';

const PLACEHOLDER_CLASS = 'inline-block w-9 h-9';

export function Header() {
  const { currentStep, toPreviousStep } = useCartContext();
  const isFirstStep = !currentStep;
  const wording = isFirstStep ? i.cart : i.form;
  const controllerClass = `${
    isFirstStep ? 'invisible' : ''
  } ${PLACEHOLDER_CLASS}`;

  return (
    <header className="flex border-b border-b-zinc-200 border-b-solid py-4 content-header">
      <IconButton
        size="sm"
        variant="text"
        color="dark"
        icon="i-solar-alt-arrow-left-linear"
        className={controllerClass}
        onClick={toPreviousStep}
      />

      <h2 className="mx-auto text-2xl">{wording}</h2>
      <span className={controllerClass} />
    </header>
  );
}

export default Header;
