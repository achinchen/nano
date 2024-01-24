import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Step } from '~frontend/features/cart/constants';
import { eventEmitter } from '~frontend/utils/event';

export type InitialState = {
  currentStep: Step;
  toPreviousStep: () => void;
  toNextStep: () => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
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
  disabled: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDisabled: () => {},
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
  const [disabled, setDisabled] = useState(false);
  const navigator = useNavigate();

  const toPreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);
  const toNextStep = () => {
    if (currentStep === Step.cart) eventEmitter.emit(EVENT.order);
    if (currentStep === Step.info) eventEmitter.emit(EVENT.info);
    if (currentStep !== Step.preview)
      return setCurrentStep((prevStep) => prevStep + 1);
    navigator('/my/orders?prompt=request');
  };

  return (
    <CartContext.Provider
      value={{
        currentStep,
        toNextStep,
        toPreviousStep,
        disabled,
        setDisabled,
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
