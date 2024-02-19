import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '~frontend/context';
import { Step } from '~frontend/features/cart/constants';
import { eventEmitter } from '~frontend/utils/event';
import { setAuthPrevPath } from '~frontend/shared/utils/auth-local';

export const HINT = 'continue';

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
  const { isLogin } = useAppContext();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(Step.cart);
  const [disabled, setDisabled] = useState(false);
  const navigator = useNavigate();

  const toPreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);
  const onInfoNext = () => {
    eventEmitter.emit(EVENT.info);
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const onCartNext = () => {
    eventEmitter.emit(EVENT.order);
    if (isLogin) return setCurrentStep((prevStep) => prevStep + 1);
    setAuthPrevPath(`/cart?${HINT}`);
    navigator('/login');
  };

  const toNextStep = () => {
    if (currentStep === Step.cart) return onCartNext();
    if (currentStep === Step.info) return onInfoNext();
    navigator('/my/orders?prompt=request');
  };

  useEffect(() => {
    if (searchParams.get(HINT) !== undefined && isLogin) {
      setCurrentStep(Step.info);
      searchParams.delete(HINT);
    }
  }, [setCurrentStep, searchParams, isLogin]);

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
