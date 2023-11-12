import { createContext, useContext, useState } from 'react';
import { Step } from '~frontend/features/cart/constants';

export type InitialState = {
  currentStep: Step;
  toPreviousStep: () => void;
  toNextStep: () => void;
};

export const CartContext = createContext<InitialState>({
  currentStep: Step.cart,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toPreviousStep: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toNextStep: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  CartContext.displayName = 'CartContext';
}

export const CartContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [currentStep, setCurrentStep] = useState(Step.info);
  const toPreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);
  const toNextStep = () => setCurrentStep((prevStep) => prevStep + 1);

  return (
    <CartContext.Provider
      value={{
        currentStep,
        toNextStep,
        toPreviousStep,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error(
      'The CartContext hook must be used within a CartContextProvider.Provider'
    );
  }
  return context;
}
