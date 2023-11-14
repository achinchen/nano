import { useCartContext } from '~frontend/features/cart/context';
import StepProgress from '~frontend/components/StepProgress';
import { Step } from '~frontend/features/cart/constants';
import { PreviewOrdersContextProvider } from './context';
import Services from './components/Services';
import Info from './components/Info';
import i from './i.json';

const stepsLength = Object.keys(Step).filter((step) =>
  isNaN(Number(step))
).length;

function PreviewOrders({ className = '' }: { className?: string }) {
  const { currentStep, toPreviousStep } = useCartContext();

  return (
    <section className={className}>
      <header className="mb-6 mt-3 flex flex-col items-center">
        <StepProgress
          steps={stepsLength}
          currentStep={currentStep}
          value={10}
          onBack={toPreviousStep}
        />
        <h3 className="text-base">{i.title}</h3>
      </header>
      <Services />
      <Info />
    </section>
  );
}

function PreviewOrdersWithProvider({ className = '' }: { className?: string }) {
  return (
    <PreviewOrdersContextProvider>
      <PreviewOrders className={className} />
    </PreviewOrdersContextProvider>
  );
}

export default PreviewOrdersWithProvider;