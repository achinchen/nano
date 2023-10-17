'use client';

import Header from '~frontend/features/cart/Header';
import Footer from '~frontend/features/cart/Footer';
import OrderCards from '~frontend/features/cart/OrderCards';

const provider = '阿狗狗的快樂小天地';

export default function Index() {
  return (
    <div>
      <h1 className="mx-6 my-2 hidden text-4xl color-white md:block">
        {provider}
      </h1>
      <Header />
      <main className="content-height-with-footer-sole content-height-with-footer-base-sole overflow-y-scroll bg-white pa-2">
        <OrderCards className="mx-4 my-2 max-w-4xl flex-1 md:mx-auto md:mb-4" />
      </main>
      <Footer />
    </div>
  );
}
