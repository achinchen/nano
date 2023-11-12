import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { Step } from '~frontend/features/cart/types';

export type InitialState = {
  currentStep: Step;
  setCurrentStep: Dispatch<SetStateAction<Step>>;
};

export const CartContext = createContext<InitialState>({
  currentStep: Step.cart,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentStep: () => {},
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

  return (
    <CartContext.Provider
      value={{
        currentStep,
        setCurrentStep,
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
