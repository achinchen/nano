import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '~frontend/layout';
import Booking from '~frontend/pages/booking/provider';
import BookingService from '~frontend/pages/booking/provider/service';
import Cart from '~frontend/pages/cart';
import Studio from '~frontend/pages/studio';
import StudioServices from '~frontend/pages/studio/services';
import StudioServiceId from '~frontend/pages/studio/serviceId';
import StudioServiceIdVersion from '~frontend/pages/studio/serviceId/version';
import StudioOrders from '~frontend/pages/studio/orders';
import StudioOrdersRequest from '~frontend/pages/studio/orders/request';
import StudioOrderId from '~frontend/pages/studio/orderId';

export function App() {
  return (
    <BrowserRouter basename="/" future={{ v7_startTransition: true }}>
      <Layout>
        <Routes>
          <Route path="/booking/:provider" element={<Booking />} />
          <Route path="/booking/:provider/s/:id" element={<BookingService />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/studio/services" element={<StudioServices />} />
          <Route path="/studio/services/:id" element={<StudioServiceId />} />
          <Route
            path="/studio/services/:id/:version"
            element={<StudioServiceIdVersion />}
          />
          <Route path="/studio/orders" element={<StudioOrders />} />
          <Route
            path="/studio/orders/request"
            element={<StudioOrdersRequest />}
          />
          <Route path="/studio/orders/:id" element={<StudioOrderId />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
