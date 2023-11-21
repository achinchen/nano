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
      <header className="mb-6 mt-3 flex">
        <div className="mx-auto inline-flex flex-col">
          <StepProgress
            steps={stepsLength}
            currentStep={currentStep + 1}
            onBack={toPreviousStep}
          />
          <h3 className="translate-x-4px text-right text-base">{i.title}</h3>
        </div>
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
