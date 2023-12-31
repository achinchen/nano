import { Fragment } from 'react';
import Auth from '~frontend/features/auth/Login';
import Header from '~frontend/features/auth/Header';

export default function Login() {
  return (
    <Fragment>
      <Header />
      <Auth />
    </Fragment>
  );
}
