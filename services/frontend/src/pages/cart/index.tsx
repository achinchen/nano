import Header from '~frontend/features/cart/Header';
import Footer from '~frontend/features/cart/Footer';
import OrderCards from '~frontend/features/cart/OrderCards';
import InfoForm from '~frontend/features/cart/InfoForm';
import PreviewOrders from '~frontend/features/cart/PreviewOrders';
import {
  CartContextProvider,
  useCartContext,
} from '~frontend/features/cart/context';
import { Step } from '~frontend/features/cart/constants';

function Content() {
  const { currentStep } = useCartContext();

  return (
    <>
      <Header />
      <main className="max-h-[calc(100dvh-188px)] overflow-y-scroll bg-white pa-2 md:h-[calc(100dvh-188px)]">
        {currentStep === Step.cart && (
          <OrderCards className="mx-4 my-2 max-w-4xl flex-1 md:mx-auto md:mb-4" />
        )}
        {currentStep === Step.info && (
          <InfoForm className="mx-4 my-2 max-w-4xl flex-1 md:mx-auto md:mb-4" />
        )}
        {currentStep === Step.preview && (
          <PreviewOrders className="mx-4 my-2 max-w-4xl flex-1 md:mx-auto md:mb-4" />
        )}
      </main>
      <Footer />
    </>
  );
}

export default function Index() {
  return (
    <CartContextProvider>
      <Content />
    </CartContextProvider>
  );
}
