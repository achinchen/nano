import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '~frontend/layout';
import Booking from '~frontend/pages/booking/provider';
import BookingService from '~frontend/pages/booking/provider/service';
import Cart from '~frontend/pages/cart';
import Studio from '~frontend/pages/studio';
import StudioServices from '~frontend/pages/studio/services/index';
import StudioServiceId from '~frontend/pages/studio/services/id';
import StudioServiceIdVersion from '~frontend/pages/studio/services/id/version';
import StudioOrders from '~frontend/pages/studio/orders';
import StudioOrdersRequest from '~frontend/pages/studio/orders/request';
import StudioOrderIdRequest from '~frontend/pages/studio/orders/id/request';
import StudioOrderId from '~frontend/pages/studio/orders/id';
import MyOrders from '~frontend/pages/my/orders';
import MyOrderId from '~frontend/pages/my/orders/id';
import MySetting from '~frontend/pages/my/setting';

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
          <Route
            path="/studio/orders/request/:id"
            element={<StudioOrderIdRequest />}
          />
          <Route path="/studio/orders/:id" element={<StudioOrderId />} />
          <Route path="/my/orders" element={<MyOrders />} />
          <Route path="/my/orders/:id" element={<MyOrderId />} />
          <Route path="/my/setting" element={<MySetting />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
