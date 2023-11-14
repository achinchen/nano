import { useCartContext } from '~frontend/features/cart/context';
import IconButton from '~frontend/components/IconButton';
import i from './i.json';

export function Header() {
  const { currentStep, toPreviousStep } = useCartContext();
  const isFirstStep = !currentStep;
  const wording = isFirstStep ? i.cart : i.form;

  return (
    <header className="flex border-b border-b-zinc-200 border-b-solid py-4 content-header">
      <IconButton
        size="sm"
        variant="text"
        color="dark"
        icon="i-solar-alt-arrow-left-linear"
        className={isFirstStep ? 'invisible' : ''}
        onClick={toPreviousStep}
      />

      <h2 className="mx-auto text-2xl">{wording}</h2>
      <span className={isFirstStep ? 'invisible' : 'inline-block w-9 h-9'} />
    </header>
  );
}

export default Header;
