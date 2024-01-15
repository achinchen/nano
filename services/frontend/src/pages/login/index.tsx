import { Fragment } from 'react';
import Auth from '~frontend/features/auth/Login';
import Header from '~frontend/features/auth/Header';
import useBg from '~frontend/shared/hooks/use-bg';
import { BG } from './constants';

export default function Login() {
  useBg(BG);

  return (
    <Fragment>
      <Header />
      <Auth />
    </Fragment>
  );
}
