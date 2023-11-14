import { createContext, useContext, useState } from 'react';
import { Step } from '~frontend/features/cart/constants';
import { eventEmitter } from '~frontend/utils/event';

export type InitialState = {
  currentStep: Step;
  toPreviousStep: () => void;
  toNextStep: () => void;
};

export const EVENT = {
  order: 'cart-order-finish',
  info: 'cart-info-finish',
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
  const [currentStep, setCurrentStep] = useState(Step.cart);
  const toPreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);
  const toNextStep = () => {
    if (currentStep === Step.cart) eventEmitter.emit(EVENT.order);
    if (currentStep === Step.info) eventEmitter.emit(EVENT.info);
    setCurrentStep((prevStep) => prevStep + 1);
  };

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
