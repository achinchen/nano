'use client';

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

const provider = '阿狗狗的快樂小天地';

function Content() {
  const { currentStep } = useCartContext();

  return (
    <div>
      <h1 className="mx-6 my-2 hidden text-4xl color-white md:block">
        {provider}
      </h1>
      <Header />
      <main className="max-h-[calc(100vh-168px)] overflow-y-scroll bg-white pa-2 md:h-[calc(100vh-226px)]">
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
    </div>
  );
}

export default function Index() {
  return (
    <CartContextProvider>
      <Content />
    </CartContextProvider>
  );
}
