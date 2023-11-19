import '~frontend/styles/index.css';
import 'virtual:uno.css';
import { Fragment } from 'react';
import Global from './Global';
import Header from './Header';

export const metadata = {
  title: 'Nano',
  description: 'the fantastic application',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <Header />
      <main className="mx-auto max-w-5xl">{children}</main>
      <Global />
    </Fragment>
  );
}
