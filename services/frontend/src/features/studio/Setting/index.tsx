import { Fragment } from 'react';
import Header from './Header';
import Content from './Content';
import { StudioSettingContextProvider } from './context';

export default function Setting() {
  return (
    <StudioSettingContextProvider>
      <Fragment>
        <Header />
        <Content />
      </Fragment>
    </StudioSettingContextProvider>
  );
}
