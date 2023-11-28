import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '~frontend/layout';
import Booking from '~frontend/pages/booking/provider';
import BookingService from '~frontend/pages/booking/provider/service';
import Cart from '~frontend/pages/cart';
import Studio from '~frontend/pages/studio';
import StudioServices from '~frontend/pages/studio/service';

export function App() {
  return (
    <BrowserRouter basename="/">
      <Layout>
        <Routes>
          <Route path="/booking/:provider" element={<Booking />} />
          <Route path="/booking/:provider/s/:id" element={<BookingService />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/studio/services" element={<StudioServices />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
