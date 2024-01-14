import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '~frontend/layout';
import Booking from '~frontend/pages/booking/provider';
import BookingService from '~frontend/pages/booking/provider/service';
import Cart from '~frontend/pages/cart';
import StudioHome from '~frontend/pages/studio';
import StudioSetting from '~frontend/pages/studio/setting';
import StudioServiceLayout from '~frontend/pages/studio/services/layout';
import StudioServices from '~frontend/pages/studio/services/index';
import StudioServiceId from '~frontend/pages/studio/services/id';
import StudioServiceCreate from '~frontend/pages/studio/services-create';
import StudioServiceVersion from '~frontend/pages/studio/services-version';
import StudioOrders from '~frontend/pages/studio/orders';
import StudioOrderRequestedLayout from '~frontend/pages/studio/orders-requested/layout';
import StudioOrdersRequested from '~frontend/pages/studio/orders-requested';
import StudioOrdersRequestedId from '~frontend/pages/studio/orders-requested/id';
import StudioOrderId from '~frontend/pages/studio/orders/id';
import StudioOrderLayout from '~frontend/pages/studio/orders/layout';
import MyOrdersLayout from '~frontend/pages/my/orders/layout';
import MyOrders from '~frontend/pages/my/orders';
import MyOrderId from '~frontend/pages/my/orders/id';
import MySetting from '~frontend/pages/my/setting/index';
import Login from '~frontend/pages/login';
import Terms from '~frontend/pages/terms';
import Privacy from '~frontend/pages/privacy';
import ProviderProtectedRoute from '~frontend/shared/route-guard/provider';
import UserProtectedRoute from '~frontend/shared/route-guard/user';
import { AppContextProvider } from '~frontend/context';

export function App() {
  return (
    <BrowserRouter basename="/" future={{ v7_startTransition: true }}>
      <AppContextProvider>
        <Layout>
          <Routes>
            <Route path="/booking/:provider" element={<Booking />} />
            <Route
              path="/booking/:provider/s/:id"
              element={<BookingService />}
            />
            <Route path="/cart" element={<Cart />} />

            <Route
              path="/studio"
              element={
                <ProviderProtectedRoute>
                  <StudioHome />
                </ProviderProtectedRoute>
              }
            />

            <Route
              path="/studio/setting"
              element={
                <ProviderProtectedRoute>
                  <StudioSetting />
                </ProviderProtectedRoute>
              }
            />
            <Route
              path="/studio/services"
              element={
                <ProviderProtectedRoute>
                  <StudioServiceLayout />
                </ProviderProtectedRoute>
              }
            >
              <Route index element={<StudioServices />} />
              <Route path=":id" element={<StudioServiceId />} />
            </Route>

            <Route
              path="/studio/services/create"
              element={
                // <ProviderProtectedRoute>
                <StudioServiceCreate />
                // </ProviderProtectedRoute>
              }
            ></Route>

            <Route
              path="/studio/services/:id/:version"
              element={
                <ProviderProtectedRoute>
                  <StudioServiceVersion />
                </ProviderProtectedRoute>
              }
            />

            <Route
              path="/studio/orders"
              element={
                <ProviderProtectedRoute>
                  <StudioOrderLayout />
                </ProviderProtectedRoute>
              }
            >
              <Route index element={<StudioOrders />} />
              <Route path=":id" element={<StudioOrderId />} />
            </Route>

            <Route
              path="/studio/orders/requested"
              element={
                <ProviderProtectedRoute>
                  <StudioOrderRequestedLayout />
                </ProviderProtectedRoute>
              }
            >
              <Route index element={<StudioOrdersRequested />} />
              <Route path=":id" element={<StudioOrdersRequestedId />} />
            </Route>

            <Route
              path="/my/orders"
              element={
                <UserProtectedRoute>
                  <MyOrdersLayout />
                </UserProtectedRoute>
              }
            >
              <Route index element={<MyOrders />} />
              <Route path=":id" element={<MyOrderId />} />
            </Route>

            <Route
              path="/my/setting"
              element={
                <UserProtectedRoute>
                  <MySetting />
                </UserProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </Layout>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
